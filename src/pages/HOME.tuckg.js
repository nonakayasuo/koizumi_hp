// ============================================================
// Home.js - トップページ（ホーム）
// ============================================================
// 【設置場所】Wix エディタ → ホームページのコードパネル
//
// ========================
// 【ページ構成 & 必要な要素ID】
// ========================
//
// ■ セクション1: ヒーローセクション
//   - #heroSection: フルワイドのストリップ（背景画像: 公園の青空写真を使用）
//   - #heroOverlay: 半透明オーバーレイ用のボックス
//   - #heroTitle: テキスト「小泉しんぺい」（大きなフォント、白色）
//   - #heroSubtitle: テキスト「○○市議会議員候補」
//   - #heroCatchphrase: テキスト「あなたの声を、まちの力に。」
//   - #heroImage: 笑顔の写真（カジュアル服・黒背景の切り抜き写真を使用）
//   - #ctaButton: ボタン「詳しく見る →」
//
// ■ セクション2: こんにちは、小泉しんぺいです
//   - #introSection: ストリップ（白背景）
//   - #introImage: 考えるポーズの写真（スーツ・黒背景）
//   - #introTitle: テキスト「こんにちは、小泉しんぺいです」
//   - #introText: リッチテキスト（自己紹介文）
//
// ■ セクション3: 政策ビジョンハイライト
//   - #policySection: ストリップ（薄い緑背景）
//   - #policyTitle: テキスト「○○市の未来ビジョン」
//   - #policyCard1〜3: リピーターまたはボックス（政策カード）
//   - #policyMoreButton: ボタン「政策をもっと見る →」
//
// ■ セクション4: 活動の様子
//   - #activitySection: ストリップ
//   - #activityTitle: テキスト「活動の様子」
//   - #activityImage1: フルート演奏の写真
//   - #activityImage2: パン工場の写真
//   - #activityText1: テキスト（音楽活動の説明）
//   - #activityText2: テキスト（食品関連の説明）
//
// ■ セクション5: お知らせ・SNS
//   - #newsSection: ストリップ
//   - #newsTitle: テキスト「最新のお知らせ」
//   - #newsRepeater: リピーター（ニュース一覧）
//   - #socialLinks: SNSアイコンリンク
//
// ■ セクション6: CTA（お問い合わせ誘導）
//   - #ctaSection: ストリップ（テーマカラー背景）
//   - #ctaTitle: テキスト「一緒に○○市をもっと良くしませんか？」
//   - #ctaContactButton: ボタン「お問い合わせ」
//   - #ctaVolunteerButton: ボタン「ボランティアに参加」
//
// ============================================================

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import wixAnimations from 'wix-animations';

$w.onReady(function () {
    // ページ固有の初期化
    initHeroSection();
    initScrollAnimations();
    initPolicyCards();
    initActivitySection();
    initNewsSection();
    initCTASection();
});

// ─── ヒーローセクション ───────────────────────────────
function initHeroSection() {
    // ヒーローセクションのフェードインアニメーション
    const timeline = wixAnimations.timeline();

    if ($w('#heroTitle')) {
        timeline.add($w('#heroTitle'), {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutQuad'
        });
    }

    if ($w('#heroSubtitle')) {
        timeline.add($w('#heroSubtitle'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutQuad'
        }, { offset: 200 });
    }

    if ($w('#heroCatchphrase')) {
        timeline.add($w('#heroCatchphrase'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutQuad'
        }, { offset: 400 });
    }

    if ($w('#heroImage')) {
        timeline.add($w('#heroImage'), {
            opacity: 1,
            scale: 1,
            duration: 1000,
            easing: 'easeOutQuad'
        }, { offset: 300 });
    }

    timeline.play();

    // CTAボタンのクリックイベント
    if ($w('#ctaButton')) {
        $w('#ctaButton').onClick(() => {
            wixWindow.scrollTo(0, 800, { "scrollAnimation": true });
        });
    }
}

// ─── スクロールアニメーション ──────────────────────────
function initScrollAnimations() {
    // 各セクションがビューに入ったときのアニメーション
    // Wix Veloではビューポート検知が限られるため、
    // 各要素の初期状態を透明にし、onViewportEnterで表示する

    const animatedElements = [
        '#introSection',
        '#policySection',
        '#activitySection',
        '#newsSection',
        '#ctaSection'
    ];

    animatedElements.forEach(selector => {
        if ($w(selector)) {
            $w(selector).onViewportEnter(() => {
                const tl = wixAnimations.timeline();
                tl.add($w(selector), {
                    opacity: 1,
                    y: 0,
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                tl.play();
            });
        }
    });
}

// ─── 政策カード ─────────────────────────────────────
function initPolicyCards() {
    // 政策カードのデータ（Wixエディタでリピーターを使用する場合）
    const policyData = [
        {
            icon: '🏥',
            title: '福祉・医療の充実',
            description: '誰もが安心して暮らせるまちへ。医療体制の強化と福祉サービスの拡充を目指します。'
        },
        {
            icon: '🌳',
            title: '環境・まちづくり',
            description: '緑豊かで持続可能なまちづくり。次の世代に誇れる環境を守ります。'
        },
        {
            icon: '👶',
            title: '子育て・教育',
            description: '子どもたちの未来を応援。子育て支援の充実と教育環境の向上に取り組みます。'
        },
        {
            icon: '💼',
            title: '地域経済の活性化',
            description: '地元の産業と商店街を元気に。働きやすい環境づくりを推進します。'
        }
    ];

    // リピーターが存在する場合、データをバインド
    if ($w('#policyRepeater')) {
        $w('#policyRepeater').data = policyData.map((item, index) => ({
            _id: String(index + 1),
            ...item
        }));

        $w('#policyRepeater').onItemReady(($item, itemData) => {
            $item('#policyIcon').text = itemData.icon;
            $item('#policyCardTitle').text = itemData.title;
            $item('#policyCardDesc').text = itemData.description;
        });
    }

    // 「政策をもっと見る」ボタン
    if ($w('#policyMoreButton')) {
        $w('#policyMoreButton').onClick(() => {
            wixLocation.to('/policy');
        });
    }
}

// ─── 活動セクション ──────────────────────────────────
function initActivitySection() {
    // 活動写真のホバーエフェクト
    const activityImages = ['#activityImage1', '#activityImage2'];

    activityImages.forEach(imgId => {
        if ($w(imgId)) {
            $w(imgId).onMouseIn(() => {
                const tl = wixAnimations.timeline();
                tl.add($w(imgId), {
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                tl.play();
            });

            $w(imgId).onMouseOut(() => {
                const tl = wixAnimations.timeline();
                tl.add($w(imgId), {
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                tl.play();
            });
        }
    });
}

// ─── ニュースセクション ──────────────────────────────
function initNewsSection() {
    // お知らせデータ（手動データ、またはWixのCMSコレクションから取得可能）
    const newsData = [
        {
            date: '2026.02.10',
            title: 'ホームページを開設しました',
            category: 'お知らせ'
        },
        {
            date: '2026.02.01',
            title: '出馬表明のご報告',
            category: '活動報告'
        },
        {
            date: '2026.01.20',
            title: '地域の皆様との意見交換会を開催しました',
            category: '活動報告'
        }
    ];

    if ($w('#newsRepeater')) {
        $w('#newsRepeater').data = newsData.map((item, index) => ({
            _id: String(index + 1),
            ...item
        }));

        $w('#newsRepeater').onItemReady(($item, itemData) => {
            $item('#newsDate').text = itemData.date;
            $item('#newsItemTitle').text = itemData.title;
            $item('#newsCategory').text = itemData.category;
        });
    }
}

// ─── CTAセクション ──────────────────────────────────
function initCTASection() {
    if ($w('#ctaContactButton')) {
        $w('#ctaContactButton').onClick(() => {
            wixLocation.to('/contact');
        });
    }

    if ($w('#ctaVolunteerButton')) {
        $w('#ctaVolunteerButton').onClick(() => {
            wixLocation.to('/contact');
        });
    }
}
