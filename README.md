# 小泉しんぺい 公式サイト

あなたの声を、まちの力に。

## 🌐 サイトURL

<https://koizumi-shimpei.com>

## 📁 プロジェクト構成

```
koizumi_hp/
├── docs/               # 公開サイト本体（GitHub Pagesで公開）
│   ├── index.html     # ホーム
│   ├── profile.html   # プロフィール
│   ├── policy.html    # 政治姿勢
│   ├── contact.html   # お問い合わせ
│   ├── blog-*.html    # ブログ記事
│   ├── style.css      # スタイル
│   ├── main.js        # JavaScript
│   ├── images/        # 画像
│   └── movies/        # 動画
└── README.md
```

## 🚀 ローカル開発

```bash
cd docs
python3 -m http.server 8080
open http://localhost:8080
```

## 📦 デプロイ

```bash
git add .
git commit -m "Update site"
git push origin main
```

## 📄 ライセンス

© 2026 小泉しんぺい All Rights Reserved.
