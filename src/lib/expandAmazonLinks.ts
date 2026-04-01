// AmazonリンクをカードUIに展開する

interface AmazonMeta {
  readonly url: string;
  readonly title: string;
  readonly image: string | null;
}

// amzn.to の短縮URLからメタ情報を取得
async function fetchAmazonMeta(shortUrl: string): Promise<AmazonMeta | null> {
  try {
    const res = await fetch(shortUrl, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
    });
    const html = await res.text();

    // タイトル取得
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const rawTitle = titleMatch?.[1] ?? "";
    // "Amazon.co.jp: タイトル eBook : 著者: 本" → "タイトル" を抽出
    const cleanTitle = rawTitle
      .replace(/^Amazon\.co\.jp:\s*/, "")
      .replace(/\s*eBook\s*:\s*.*$/, "")
      .replace(/\s*:\s*本$/, "")
      .trim();

    if (!cleanTitle) return null;

    // OGP画像取得（property→content, content→property の両方のパターンに対応）
    const ogImageMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) ??
      html.match(/<meta[^>]*content=["']([^"']*media-amazon[^"']*)["'][^>]*property=["']og:image["']/i);
    let image = ogImageMatch?.[1] ?? null;

    // OG画像がある場合、高解像度の商品画像部分だけ抽出
    if (image) {
      // OG画像は合成画像の場合があるので、元の商品画像IDを抽出して高解像版を取得
      const imageIdMatch = image.match(/\/images\/I\/([^.]+)/);
      if (imageIdMatch) {
        image = `https://m.media-amazon.com/images/I/${imageIdMatch[1]}._SL500_.jpg`;
      }
    }

    return { url: shortUrl, title: cleanTitle, image };
  } catch {
    return null;
  }
}

// AmazonリンクのHTMLカードを生成
function buildCardHtml(meta: AmazonMeta): string {
  const imageHtml = meta.image
    ? `<span class="amazon-card-image"><img src="${meta.image}" alt="" /></span>`
    : "";

  return `<a href="${meta.url}" target="_blank" rel="noopener noreferrer" class="amazon-card">${imageHtml}<span class="amazon-card-info"><span class="amazon-card-title">${meta.title}</span><span class="amazon-card-source">amzn.to</span><span class="amazon-card-btn">Amazon.co.jpで購入する</span></span></a>`;
}

// ブログHTML内のAmazonリンクをカードに置換
export async function expandAmazonLinks(html: string): Promise<string> {
  const amazonLinkRegex =
    /<a\s+href=["'](https?:\/\/(?:amzn\.to|www\.amazon\.co\.jp|amazon\.co\.jp)[^"']*)["'][^>]*>\s*https?:\/\/(?:amzn\.to|www\.amazon\.co\.jp|amazon\.co\.jp)[^\s<]*\s*<\/a>/gi;

  const matches = [...html.matchAll(amazonLinkRegex)];
  if (matches.length === 0) return html;

  // 並行してメタ情報を取得
  const metaResults = await Promise.all(
    matches.map((match) => fetchAmazonMeta(match[1]))
  );

  let result = html;
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const meta = metaResults[i];
    if (!meta || match.index === undefined) continue;

    const card = buildCardHtml(meta);
    result =
      result.slice(0, match.index) +
      card +
      result.slice(match.index + match[0].length);
  }

  return result;
}
