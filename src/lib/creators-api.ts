// Amazon Creators API（PA-API 5.0 の後継。OAuth2 client_credentials 認証）クライアント。
// 書籍カード用に GetItems から書名・著者・書影・発売日・売上ランキング・アフィリンクを取得する。
// 認証情報は v3.x（Login with Amazon）形式を想定。サーバー側でのみ使用（秘密情報を含む）。

// v3.3（FE/JP）の既定トークンエンドポイント。必要なら env で上書き可
const TOKEN_ENDPOINT =
  process.env.AMAZON_PAAPI_TOKEN_ENDPOINT ?? "https://api.amazon.co.jp/auth/o2/token";
const API_BASE = process.env.AMAZON_PAAPI_HOST ?? "https://creatorsapi.amazon";
const MARKETPLACE = process.env.AMAZON_PAAPI_MARKETPLACE ?? "www.amazon.co.jp";
const SCOPE = process.env.AMAZON_PAAPI_SCOPE ?? "creatorsapi::default";

const CLIENT_ID = process.env.AMAZON_PAAPI_ACCESS_KEY ?? "";
const CLIENT_SECRET = process.env.AMAZON_PAAPI_SECRET_KEY ?? "";
const PARTNER_TAG = process.env.AMAZON_PAAPI_PARTNER_TAG ?? "";

// 正規化した書籍情報（カードに渡す形）
export type BookInfo = {
  readonly asin: string;
  readonly title: string;
  readonly author?: string;
  readonly publisher?: string;
  readonly imageUrl?: string;
  readonly publicationDate?: string;
  readonly salesRank?: number;
  readonly url: string; // partnerTag入りの詳細ページURL
};

// トークンをモジュール内でキャッシュ（有効期限まで再利用）
let cachedToken: { value: string; expiresAt: number } | null = null;

async function fetchAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }
  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: SCOPE,
      }),
    });
    if (!res.ok) {
      console.error("Creators API トークン取得失敗:", res.status, await res.text());
      return null;
    }
    const json = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!json.access_token) return null;
    cachedToken = {
      value: json.access_token,
      expiresAt: now + (json.expires_in ?? 3600) * 1000,
    };
    return cachedToken.value;
  } catch (err) {
    console.error("Creators API トークン取得エラー:", err);
    return null;
  }
}

// レスポンスから著者名を組み立てる（byLineInfo.contributors のうち著者系のロールを優先）
function pickAuthor(byLineInfo: unknown): string | undefined {
  const info = byLineInfo as
    | { contributors?: { name?: string; role?: string }[]; brand?: { displayValue?: string } }
    | undefined;
  const contributors = info?.contributors ?? [];
  const authorRoles = ["著者", "Author", "作", "編集", "監修", "翻訳", "Editor"];
  const authors = contributors
    .filter((c) => c?.name && (!c.role || authorRoles.some((r) => c.role!.includes(r))))
    .map((c) => c!.name!);
  const names = authors.length > 0 ? authors : contributors.map((c) => c?.name).filter(Boolean);
  if (names.length > 0) return names.slice(0, 3).join("、");
  return info?.brand?.displayValue;
}

// GetItems を叩いて 1冊分の正規化データを返す。失敗時は null（呼び出し側でフォールバック）
export async function getBookByAsin(asin: string): Promise<BookInfo | null> {
  const token = await fetchAccessToken();
  if (!token || !PARTNER_TAG) {
    return null;
  }
  try {
    const res = await fetch(`${API_BASE}/catalog/v1/getItems`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": MARKETPLACE,
      },
      body: JSON.stringify({
        itemIds: [asin],
        itemIdType: "ASIN",
        marketplace: MARKETPLACE,
        partnerTag: PARTNER_TAG,
        languagesOfPreference: ["ja_JP"],
        resources: [
          "images.primary.large",
          "itemInfo.title",
          "itemInfo.byLineInfo",
          "itemInfo.contentInfo",
          "browseNodeInfo.websiteSalesRank",
        ],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      // アカウントが未審査（AssociateNotEligible）は想定内。カードは自前データで描画されるため warn 止まり
      if (text.includes("AssociateNotEligible")) {
        console.warn("Creators API 未審査（自前データで描画）:", asin);
      } else {
        console.error("Creators API getItems 失敗:", res.status, text);
      }
      return null;
    }
    const json = await res.json();
    // ドキュメント間で itemsResult / itemResults の表記ゆれがあるため両対応
    const container = json.itemsResult ?? json.itemResults;
    const items: unknown[] = container?.items ?? [];
    const item = (items.find((it) => (it as { asin?: string }).asin === asin) ??
      items[0]) as
      | {
          asin?: string;
          detailPageURL?: string;
          images?: { primary?: { large?: { url?: string }; medium?: { url?: string }; small?: { url?: string } } };
          itemInfo?: {
            title?: { displayValue?: string };
            byLineInfo?: unknown;
            contentInfo?: { publicationDate?: { displayValue?: string } };
          };
          browseNodeInfo?: { websiteSalesRank?: { salesRank?: number } };
        }
      | undefined;
    if (!item) return null;

    const primary = item.images?.primary;
    const title = item.itemInfo?.title?.displayValue;
    if (!title) return null;

    return {
      asin: item.asin ?? asin,
      title,
      author: pickAuthor(item.itemInfo?.byLineInfo),
      imageUrl: primary?.large?.url ?? primary?.medium?.url ?? primary?.small?.url,
      publicationDate: item.itemInfo?.contentInfo?.publicationDate?.displayValue,
      salesRank: item.browseNodeInfo?.websiteSalesRank?.salesRank,
      url:
        item.detailPageURL ??
        `https://${MARKETPLACE}/dp/${asin}?tag=${PARTNER_TAG}`,
    };
  } catch (err) {
    console.error("Creators API getItems エラー:", err);
    return null;
  }
}

// 最低限のフォールバック（API未設定・失敗時）。ASINからアフィリンクだけ組む
export function fallbackBook(asin: string): BookInfo {
  return {
    asin,
    title: "",
    url: PARTNER_TAG
      ? `https://${MARKETPLACE}/dp/${asin}?tag=${PARTNER_TAG}`
      : `https://${MARKETPLACE}/dp/${asin}`,
  };
}

// 自前フォールバック（静的データ）と Creators API 結果を統合する。
// API が使える項目（発売日・ランキング等）は API を優先し、無ければ静的データで埋める。
export function mergeBook(
  asin: string,
  fallback: {
    title?: string;
    author?: string;
    publisher?: string;
    imageUrl?: string;
    url?: string;
  } | undefined,
  api: BookInfo | null
): BookInfo {
  const base = fallbackBook(asin);
  return {
    asin,
    title: api?.title || fallback?.title || "",
    author: api?.author ?? fallback?.author,
    publisher: api?.publisher ?? fallback?.publisher,
    imageUrl: api?.imageUrl || fallback?.imageUrl,
    publicationDate: api?.publicationDate,
    salesRank: api?.salesRank,
    url: api?.url || fallback?.url || base.url,
  };
}
