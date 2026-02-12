# 小泉しんぺい 公式サイト

あなたの声を、まちの力に。

## 🌐 サイトURL

- **GitHub Pages**: <https://nonakayasuo.github.io/koizumi_hp/>
- **独自ドメイン設定後**: <https://koizumi-shinpei.com> （例）

## 📁 プロジェクト構成

```
koizumi_hp/
├── docs/               # 公開サイト本体（GitHub Pagesで公開）
│   ├── index.html     # ホーム
│   ├── profile.html   # プロフィール
│   ├── policy.html    # 政治姿勢＆News
│   ├── contact.html   # お問い合わせ
│   ├── style.css      # 共通スタイル
│   ├── main.js        # 共通JavaScript
│   └── images/        # 画像フォルダ
└── README.md          # このファイル
```

## 🚀 ローカル開発

```bash
# ローカルサーバー起動
cd docs
python3 -m http.server 8080

# ブラウザで開く
open http://localhost:8080
```

## 📦 デプロイ（GitHub Pages）

1. GitHubにプッシュ

```bash
git add .
git commit -m "Update site"
git push origin main
```

1. GitHubリポジトリ → **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / フォルダ: `/docs`
4. **Save** → 数分後に公開完了

## 🌍 独自ドメイン設定

### 1. ドメイン取得（お名前.com / ムームードメインなど）

- 例: `koizumi-shinpei.com`

### 2. DNS設定（ドメイン管理画面）

**Aレコード**を追加:

```
ホスト名: @
値: 185.199.108.153
値: 185.199.109.153
値: 185.199.110.153
値: 185.199.111.153
```

**CNAMEレコード**を追加:

```
ホスト名: www
値: nonakayasuo.github.io
```

### 3. GitHub Pages設定

1. リポジトリ → **Settings** → **Pages**
2. **Custom domain** に `koizumi-shinpei.com` を入力
3. **Enforce HTTPS** にチェック
4. 数時間〜24時間で反映

### 4. `docs/CNAME` ファイルを作成

```bash
echo "koizumi-shinpei.com" > docs/CNAME
git add docs/CNAME
git commit -m "Add custom domain"
git push
```

## 📧 お問い合わせフォーム設定

現在、`contact.html` のフォームは **Formspree** を使用する設定になっています。

1. [Formspree](https://formspree.io/) にアクセス
2. 無料アカウント作成
3. フォームを作成して **Form ID** を取得
4. `docs/contact.html` の以下を書き換え:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

↓

```html
<form id="contactForm" action="https://formspree.io/f/実際のフォームID" method="POST">
```

## 📝 コンテンツ更新

- **お知らせ追加**: `index.html`, `policy.html` の `.news-list` セクションを編集
- **政策内容変更**: `policy.html` の `.policy-card` セクションを編集
- **プロフィール更新**: `profile.html` を編集
- **SNSリンク変更**: 各HTMLファイルの `.footer-social` セクションを編集

## 🎨 デザインカスタマイズ

`docs/style.css` の以下を変更:

```css
:root {
    --primary: #2E7D32;        /* メインカラー */
    --primary-light: #4CAF50;  /* ライトカラー */
    --accent: #F9A825;         /* アクセントカラー */
}
```

## 📄 ライセンス

© 2026 小泉しんぺい All Rights Reserved.
