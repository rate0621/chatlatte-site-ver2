#!/usr/bin/env bash
# microCMSブログ投稿ヘルパー
#   categories                                  … カテゴリ一覧（id / name）を表示
#   post <html> --title T --description D --category ID … 記事を下書きとして投稿
set -euo pipefail

usage() {
  cat <<'USAGE' >&2
使い方:
  post-draft.sh categories
  post-draft.sh post <本文HTMLファイル> --title "タイトル" --description "説明文" --category "カテゴリID"
USAGE
  exit 1
}

# リポジトリルートの .env を読み込む
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || { cd "$(dirname "$0")/../../../.." && pwd; })"
if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

DOMAIN="${MICROCMS_SERVICE_DOMAIN:?MICROCMS_SERVICE_DOMAIN が .env にありません}"
# .env には「chatlatte.microcms.io」形式で入っているためサービスIDに正規化（src/lib/microcms.ts と同じ扱い）
DOMAIN="${DOMAIN%.microcms.io}"
# 書き込み用キーを優先し、無ければ既存キーで試す
API_KEY="${MICROCMS_WRITE_API_KEY:-${MICROCMS_API_KEY:?APIキーが .env にありません}}"
BASE="https://${DOMAIN}.microcms.io/api/v1"

cmd="${1:-}"
case "$cmd" in
  categories)
    curl -sf -H "X-MICROCMS-API-KEY: ${API_KEY}" "${BASE}/categories?limit=100" \
      | jq -r '.contents[] | "\(.id)\t\(.name)"'
    ;;

  post)
    shift
    html_file="${1:-}"; shift || usage
    [[ -f "$html_file" ]] || { echo "本文ファイルが見つかりません: $html_file" >&2; exit 1; }

    title="" description="" category=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --title)       title="$2"; shift 2 ;;
        --description) description="$2"; shift 2 ;;
        --category)    category="$2"; shift 2 ;;
        *) usage ;;
      esac
    done
    [[ -n "$title" && -n "$category" ]] || usage

    # 注意: 現在のmicroCMSスキーマは title / content / category のみ。
    # description はスキーマに追加された場合のみ --description で送る
    body=$(jq -n \
      --arg title "$title" \
      --arg description "$description" \
      --arg category "$category" \
      --rawfile content "$html_file" \
      '{title: $title, content: $content, category: $category}
       + (if $description != "" then {description: $description} else {} end)')

    response=$(curl -s -w "\n%{http_code}" -X POST \
      -H "X-MICROCMS-API-KEY: ${API_KEY}" \
      -H "Content-Type: application/json" \
      -d "$body" \
      "${BASE}/blogs?status=draft")

    http_code=$(tail -n1 <<<"$response")
    payload=$(sed '$d' <<<"$response")

    if [[ "$http_code" == "201" ]]; then
      content_id=$(jq -r '.id' <<<"$payload")
      echo "✅ 下書き投稿に成功しました"
      echo "コンテンツID: ${content_id}"
      echo "管理画面: https://${DOMAIN}.microcms.io/apis/blogs/${content_id}"
    else
      echo "❌ 投稿に失敗しました (HTTP ${http_code})" >&2
      echo "$payload" >&2
      if [[ "$http_code" == "401" || "$http_code" == "403" ]]; then
        echo "→ POST権限付きのAPIキーを .env の MICROCMS_WRITE_API_KEY に設定してください" >&2
      fi
      exit 1
    fi
    ;;

  *) usage ;;
esac
