#!/usr/bin/env python3
"""
チラシPDFの1ページ目をPNG画像として出力する（スマホ用プレビュー用）。
出力先: docs/flyer-a3-preview.png, docs/flyer-inside-preview.png
"""
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF が必要です: pip install pymupdf")
    sys.exit(1)

# 解像度（幅のピクセル目安）。大きいほどきれいだがファイルサイズ増
PREVIEW_WIDTH = 800


def pdf_first_page_to_png(pdf_path: Path, output_path: Path) -> None:
    doc = fitz.open(pdf_path)
    page = doc[0]
    # 幅 PREVIEW_WIDTH になるよう倍率を計算
    zoom = PREVIEW_WIDTH / page.rect.width
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    pix.save(str(output_path))
    doc.close()
    print(f"保存: {output_path}")


def main():
    base = Path(__file__).resolve().parent.parent
    docs = base / "docs"
    pairs = [
        (docs / "flyer-a3.pdf", docs / "flyer-a3-preview.png"),
        (docs / "flyer-inside.pdf", docs / "flyer-inside-preview.png"),
    ]
    for pdf_path, out_path in pairs:
        if pdf_path.exists():
            pdf_first_page_to_png(pdf_path, out_path)
        else:
            print(f"スキップ（PDFなし）: {pdf_path}")


if __name__ == "__main__":
    main()
