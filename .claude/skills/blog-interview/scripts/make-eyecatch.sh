#!/usr/bin/env bash
# アイキャッチ画像生成（1200×630）
#   make-eyecatch.sh <出力.png> "タイトル（**強調**マーカー可・——でサブタイトル分離）" [--cat カテゴリ名] [--dark]
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$SKILL_DIR/eyecatch-template.html"

usage() {
  echo '使い方: make-eyecatch.sh <出力.png> "タイトル" [--cat カテゴリ名] [--dark]' >&2
  exit 1
}

out="${1:-}"
title="${2:-}"
[[ -n "$out" && -n "$title" ]] || usage
shift 2

cat="ビジネス"
theme=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cat)  cat="$2"; shift 2 ;;
    --dark) theme="&theme=dark"; shift ;;
    *) usage ;;
  esac
done

enc() { jq -rn --arg s "$1" '$s|@uri'; }

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=12000 \
  --screenshot="$out" \
  "file://$TEMPLATE?title=$(enc "$title")&cat=$(enc "$cat")$theme" 2>/dev/null

echo "生成: $out"
