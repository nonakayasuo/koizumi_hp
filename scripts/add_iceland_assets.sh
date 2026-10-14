#!/bin/bash
# アイスランド視察ブログ写真とニュース第5号PDFをサイトに取り込む。
# 使い方: scripts/add_iceland_assets.sh <添付ファイルを置いたフォルダ>
set -euo pipefail
SRC="$1"
DOCS="$(cd "$(dirname "$0")/../docs" && pwd)"
img() { # EXIFの向きを画素に反映し、長辺1600px・JPEG品質80に縮小（EXIF/位置情報は削除）
  python3 -I -c "
import sys
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(sys.argv[1])).convert('RGB')
im.thumbnail((1600, 1600))
im.save(sys.argv[2], 'JPEG', quality=80, optimize=True)
" "$SRC/$1" "$DOCS/images/$2"
  echo "images/$2"
}
img "荒野.jpg"             iceland_wilderness_20261014.jpg
img "教会.jpg"             iceland_hallgrimskirkja_20261014.jpg
img "タラの料理.jpg"       iceland_cod_20261014.jpg
img "グトルフォスの滝.jpg" iceland_gullfoss_20261014.jpg
img "間欠泉.jpg"           iceland_geysir_20261014.jpg
img "国会議事堂.jpg"       iceland_parliament_20261014.jpg
img "オーロラ.jpg"         iceland_aurora_20261014.jpg
img "朝食.jpg"             iceland_breakfast_20261014.jpg
img "ブルーラグーン.jpg"   iceland_blue_lagoon_20261014.jpg
img "環状交差点.jpg"       iceland_roundabout_20261014.jpg
cp "$SRC/【完成】ニュース第５号.pdf"         "$DOCS/flyer5-news5-omote.pdf"
cp "$SRC/【完成】ニュース第５号うらめん.pdf" "$DOCS/flyer5-news5-ura.pdf"
for s in omote ura; do
  python3 -c "import fitz,sys;d=fitz.open(sys.argv[1]);p=d[0];z=800/p.rect.width;p.get_pixmap(matrix=fitz.Matrix(z,z),alpha=False).save(sys.argv[2])" \
    "$DOCS/flyer5-news5-$s.pdf" "$DOCS/flyer5-news5-$s-preview.png"
  echo "flyer5-news5-$s-preview.png"
done
