#!/usr/bin/env bash
# 蔵書ソースヘルパー（Kindle OCRテキストの機械的グルー・読み取り専用）
#   book-source.sh list                 … 全書籍の slug と amazon URL を一覧
#   book-source.sh resolve <slug|部分邦題> … slug に解決して出力
#   book-source.sh path <slug>          … 本文ファイルのパス（*-clean.md優先・なければ生.md）
#   book-source.sh meta <slug>          … amazon URL・cover パス・字数
#   book-source.sh clean <slug>         … 本文をstdoutへ（ページマーカー・Kindle行を除去）
#
# 本文（10〜25万字）は主コンテキストに読み込まないこと。選書は book-catalog.md を見る。
# 蔵書は別リポジトリにあるため BOOKS_ROOT は絶対パス。KINDLE_BOOKS_ROOT で上書き可。
set -euo pipefail

BOOKS_ROOT="${KINDLE_BOOKS_ROOT:-/Users/rate/rate/kindle_capture/books}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CATALOG="$SKILL_DIR/book-catalog.md"

usage() {
  cat <<'USAGE' >&2
使い方:
  book-source.sh list
  book-source.sh resolve <slug|部分邦題>
  book-source.sh path <slug>
  book-source.sh meta <slug>
  book-source.sh clean <slug>
USAGE
  exit 1
}

[[ -d "$BOOKS_ROOT" ]] || { echo "蔵書ディレクトリが見つかりません: $BOOKS_ROOT（KINDLE_BOOKS_ROOT で上書き可）" >&2; exit 1; }

# 書籍フォルダ（ディレクトリのみ）を列挙
list_slugs() {
  for d in "$BOOKS_ROOT"/*/; do
    [[ -d "$d" ]] || continue
    basename "$d"
  done
}

# 本文ファイルのパスを返す（*-clean.md優先・なければ生の.md）。folder≠filename があるため glob で探す
text_path() {
  local slug="$1" dir="$BOOKS_ROOT/$slug" f
  [[ -d "$dir" ]] || { echo "書籍フォルダがありません: $slug" >&2; return 1; }
  # 1) *-clean.md（1つ目）
  for f in "$dir"/*-clean.md; do
    [[ -e "$f" ]] && { echo "$f"; return 0; }
  done
  # 2) clean が無ければ、トップレベルの非clean .md（1つ目）
  for f in "$dir"/*.md; do
    [[ -e "$f" ]] || continue
    case "$f" in *-clean.md) continue;; esac
    echo "$f"; return 0
  done
  echo "本文ファイル(.md)が見つかりません: $slug" >&2
  return 1
}

amazon_url() {
  local slug="$1" a="$BOOKS_ROOT/$1/amazon.txt"
  [[ -f "$a" ]] && tr -d '[:space:]' < "$a" || echo "-"
}

cmd="${1:-}"
case "$cmd" in
  list)
    while IFS= read -r slug; do
      printf '%s\t%s\n' "$slug" "$(amazon_url "$slug")"
    done < <(list_slugs)
    ;;

  resolve)
    q="${2:-}"; [[ -n "$q" ]] || usage
    # 1) フォルダ完全一致
    if [[ -d "$BOOKS_ROOT/$q" ]]; then echo "$q"; exit 0; fi
    # 2) slug 部分一致
    if m=$(list_slugs | grep -i -m1 -F -- "$q"); then echo "$m"; exit 0; fi
    # 3) カタログの邦題列で照合（存在すれば）。行: | slug | 邦題 | ... → slug は2列目
    if [[ -f "$CATALOG" ]]; then
      if row=$(grep -F -m1 -- "$q" "$CATALOG"); then
        echo "$row" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/,"",$2); print $2}'
        exit 0
      fi
    fi
    echo "解決できませんでした: $q" >&2
    exit 1
    ;;

  path)
    slug="${2:-}"; [[ -n "$slug" ]] || usage
    text_path "$slug"
    ;;

  meta)
    slug="${2:-}"; [[ -n "$slug" ]] || usage
    p=$(text_path "$slug")
    chars=$(wc -m < "$p" | tr -d '[:space:]')
    cover="$BOOKS_ROOT/$slug/cover.png"
    [[ -f "$cover" ]] || cover="-"
    printf 'slug\t%s\n' "$slug"
    printf 'amazon\t%s\n' "$(amazon_url "$slug")"
    printf 'cover\t%s\n' "$cover"
    printf 'text\t%s\n' "$p"
    printf 'chars\t%s\n' "$chars"
    ;;

  clean)
    slug="${2:-}"; [[ -n "$slug" ]] || usage
    p=$(text_path "$slug")
    # ページマーカー <!-- png_page_NNNN --> と、単独の Kindle 行を除去
    grep -v -E -e '^<!-- png_page_[0-9]+ -->$' -e '^Kindle$' "$p"
    ;;

  *) usage ;;
esac
