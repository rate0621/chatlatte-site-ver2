#!/usr/bin/env bash
# アイキャッチ画像生成（1200×630）
#   make-eyecatch.sh <出力.png> "タイトル（**強調**マーカー可・——でサブタイトル分離）" [--tag タグ名 ...] [--dark]
# --tag は post-draft.sh post 実行時に付けたタグ名をそのまま渡す（複数可・右上に横並び表示）
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$SKILL_DIR/eyecatch-template.html"

usage() {
  echo '使い方: make-eyecatch.sh <出力.png> "タイトル" [--tag "タグ名" ...] [--dark]' >&2
  exit 1
}

out="${1:-}"
title="${2:-}"
[[ -n "$out" && -n "$title" ]] || usage
shift 2

tags=()
theme=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag)  tags+=("$2"); shift 2 ;;
    --cat)  tags+=("$2"); shift 2 ;;  # 旧オプション名（後方互換）
    --dark) theme="&theme=dark"; shift ;;
    *) usage ;;
  esac
done

cat_param=""
if [[ ${#tags[@]} -gt 0 ]]; then
  cat_param=$(printf '%s,' "${tags[@]}")
  cat_param="${cat_param%,}"
fi

enc() { jq -rn --arg s "$1" '$s|@uri'; }

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=12000 \
  --screenshot="$out" \
  "file://$TEMPLATE?title=$(enc "$title")&cat=$(enc "$cat_param")$theme" 2>/dev/null

echo "生成: $out"
