#!/usr/bin/env python3
"""
チラシPDFの1ページ目に、公式サイトURLをわかりやすい位置に追加する。
元ファイルは上書きせず、_with_url.pdf を出力する。
"""
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF が必要です: pip install pymupdf")
    sys.exit(1)

SITE_URL = "https://koizumi-shimpei.com"
LABEL = "公式サイト"


def find_japanese_font():
    """利用可能な日本語フォントパスを返す（なければ None）"""
    candidates = [
        "/System/Library/Fonts/ヒラギノ角ゴシック W4.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
        "C:/Windows/Fonts/msgothic.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    ]
    for p in candidates:
        if Path(p).exists():
            return p
    return None


def add_url_to_first_page(pdf_path: str, output_path: str = None) -> None:
    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF が見つかりません: {pdf_path}")
    if output_path is None:
        output_path = pdf_path.parent / f"{pdf_path.stem}_with_url.pdf"
    output_path = Path(output_path)

    doc = fitz.open(pdf_path)
    page = doc[0]
    r = page.rect

    # A3想定: 右下あたりに表示（1ページ目のみ）
    # ポイント: 右端・下端から少し内側
    x = r.width - 320
    y = r.height - 40
    fontsize = 11

    # 日本語フォントがあれば「公式サイト」も表示（fontfile を insert_text に直接指定）
    jfont_path = find_japanese_font()
    text = f"{LABEL} {SITE_URL}" if jfont_path else f"Official site: {SITE_URL}"
    try:
        if jfont_path:
            page.insert_text((x, y), text, fontsize=fontsize, fontfile=str(jfont_path))
        else:
            page.insert_text((x, y), text, fontsize=fontsize)
    except Exception:
        page.insert_text((x, y), f"Official site: {SITE_URL}", fontsize=fontsize)

    doc.save(output_path)
    doc.close()
    print(f"保存しました: {output_path}")


def main():
    base = Path(__file__).resolve().parent.parent
    pdfs = [
        base / "【入稿用】表と裏A3バージョン.pdf",
        base / "【入稿用】チラシ1号の中面の案、1.6 (116).pdf",
    ]
    for p in pdfs:
        if p.exists():
            add_url_to_first_page(str(p))
        else:
            print(f"スキップ（ファイルなし）: {p}")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        add_url_to_first_page(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
    else:
        main()
