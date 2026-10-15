#!/usr/bin/env python3
"""
Playwright でサイトを表示確認する（PC・スマホ幅）。
- 読み込みに失敗したリクエスト（4xx/5xx）・表示されない画像・コンソールエラーを報告
- ページ全体のスクリーンショットを保存

使い方:
  python3 scripts/check_site.py                       # 本番 https://koizumi-shimpei.com
  python3 scripts/check_site.py http://localhost:8080 # ローカル（cd docs && python3 -m http.server 8080）
  python3 scripts/check_site.py URL --pages blog-20261014.html flyer.html --out /tmp/shots
"""
import argparse
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

DEFAULT_PAGES = [
    "index.html",
    "profile.html",
    "policy.html",
    "blog.html",
    "flyer.html",
    "contact.html",
]
VIEWPORTS = {"pc": (1280, 800), "sp": (390, 844)}


def check_page(page, url):
    problems = []
    page.on("response", lambda r: r.status >= 400 and problems.append(f"HTTP {r.status} {r.url}"))
    page.on("console", lambda m: m.type == "error" and problems.append(f"console: {m.text}"))
    page.goto(url, wait_until="load", timeout=60000)
    # lazy 画像も読み込ませるため最後までスクロール
    page.evaluate(
        """async () => {
            for (let y = 0; y < document.body.scrollHeight; y += 600) {
                window.scrollTo(0, y);
                await new Promise(r => setTimeout(r, 100));
            }
            window.scrollTo(0, 0);
        }"""
    )
    page.wait_for_timeout(1000)
    # lazy 画像の読み込み完了を待ってから、読み込み済みなのに幅0（=壊れている）ものだけ数える
    broken = page.evaluate(
        """async () => {
            const imgs = [...document.images];
            imgs.forEach(i => { i.loading = 'eager'; });
            await Promise.all(imgs.map(i => i.complete ? null :
                new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 10000); })));
            return imgs.filter(i => i.naturalWidth === 0).map(i => i.getAttribute('src'));
        }"""
    )
    problems += [f"broken image: {src}" for src in broken]
    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    if overflow > 1:
        problems.append(f"horizontal overflow: {overflow}px")
    return problems


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base", nargs="?", default="https://koizumi-shimpei.com")
    ap.add_argument("--pages", nargs="+", default=DEFAULT_PAGES)
    ap.add_argument("--out", default="site-check")
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    failed = False
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, (w, h) in VIEWPORTS.items():
            ctx = browser.new_context(viewport={"width": w, "height": h})
            for path in args.pages:
                page = ctx.new_page()
                url = f"{args.base.rstrip('/')}/{path}"
                problems = check_page(page, url)
                shot = out / f"{name}_{path.replace('/', '_')}.png"
                page.screenshot(path=str(shot), full_page=True)
                status = "NG" if problems else "OK"
                failed |= bool(problems)
                print(f"[{status}] {name} {path}")
                for pr in problems:
                    print(f"    - {pr}")
                page.close()
            ctx.close()
        browser.close()
    print(f"screenshots: {out.resolve()}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
