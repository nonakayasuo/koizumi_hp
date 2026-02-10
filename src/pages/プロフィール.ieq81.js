// ============================================================
// Profile.js - プロフィールページ
// ============================================================
// 【設置場所】Wix エディタ → プロフィールページのコードパネル
//
// ========================
// 【ページ構成 & 必要な要素ID】
// ========================
//
// ■ セクション1: プロフィールヘッダー
//   - #profileHeroStrip: ストリップ（テーマカラー背景）
//   - #profilePageTitle: テキスト「プロフィール」
//
// ■ セクション2: 基本プロフィール
//   - #profileMainSection: ストリップ（白背景）
//   - #profilePhoto: 画像（スーツ姿・考えるポーズの写真）
//   - #profileName: テキスト「小泉 しんぺい（こいずみ しんぺい）」
//   - #profileBirthInfo: テキスト（生年月日・出身地など）
//   - #profileBio: リッチテキスト（詳細な自己紹介文）
//
// ■ セクション3: 経歴・略歴
//   - #historySection: ストリップ（薄いグレー背景）
//   - #historyTitle: テキスト「略歴」
//   - #historyTimeline: リピーター（年表形式の経歴）
//
// ■ セクション4: 私の原点
//   - #originSection: ストリップ（白背景）
//   - #originTitle: テキスト「私の原点」
//   - #originImage1: フルート演奏の写真
//   - #originText1: リッチテキスト（音楽との関わり）
//   - #originImage2: パン工場の写真
//   - #originText2: リッチテキスト（食への関心・働く現場の経験）
//
// ■ セクション5: 趣味・関心
//   - #hobbySection: ストリップ
//   - #hobbyTitle: テキスト「趣味・関心」
//   - #hobbyRepeater: リピーター（趣味カード）
//
// ============================================================

import wixAnimations from 'wix-animations';

$w.onReady(function () {
    // ページ固有の初期化
    initProfileAnimations();
    initTimeline();
    initHobbySection();
});

// ─── プロフィールアニメーション ────────────────────────
function initProfileAnimations() {
    // プロフィール写真のフェードイン
    if ($w('#profilePhoto')) {
        const tl = wixAnimations.timeline();
        tl.add($w('#profilePhoto'), {
            opacity: 1,
            x: 0,
            duration: 800,
            easing: 'easeOutQuad'
        });
        tl.play();
    }

    // プロフィール情報のフェードイン
    if ($w('#profileName')) {
        const tl = wixAnimations.timeline();
        tl.add($w('#profileName'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutQuad'
        });
        tl.play();
    }

    // セクションのスクロールアニメーション
    const sections = ['#historySection', '#originSection', '#hobbySection'];
    sections.forEach(sectionId => {
        if ($w(sectionId)) {
            $w(sectionId).onViewportEnter(() => {
                const tl = wixAnimations.timeline();
                tl.add($w(sectionId), {
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

// ─── 略歴タイムライン ────────────────────────────────
function initTimeline() {
    // 経歴データ（実際の情報に合わせて変更してください）
    const historyData = [
        { year: '19XX年', event: '○○県○○市に生まれる' },
        { year: '20XX年', event: '○○高等学校 卒業' },
        { year: '20XX年', event: '○○大学○○学部 入学' },
        { year: '20XX年', event: '○○大学○○学部 卒業' },
        { year: '20XX年', event: '○○株式会社（食品製造業）に勤務' },
        { year: '20XX年', event: '地域活動に本格的に参加' },
        { year: '2026年', event: '○○市議会議員選挙に出馬を決意' }
    ];

    if ($w('#historyRepeater')) {
        $w('#historyRepeater').data = historyData.map((item, index) => ({
            _id: String(index + 1),
            ...item
        }));

        $w('#historyRepeater').onItemReady(($item, itemData) => {
            $item('#historyYear').text = itemData.year;
            $item('#historyEvent').text = itemData.event;
        });
    }
}

// ─── 趣味セクション ──────────────────────────────────
function initHobbySection() {
    const hobbyData = [
        {
            icon: '🎵',
            title: 'フルート演奏',
            description: '音楽を通じて地域の皆様と交流しています。学校や福祉施設での演奏ボランティアも行っています。'
        },
        {
            icon: '🍞',
            title: '食・ものづくり',
            description: '食品製造の現場で培った経験から、食の安全と地産地消の大切さを実感しています。'
        },
        {
            icon: '🌿',
            title: '自然・環境',
            description: '緑豊かな自然環境を守り、次世代に引き継ぐことが私の使命です。'
        }
    ];

    if ($w('#hobbyRepeater')) {
        $w('#hobbyRepeater').data = hobbyData.map((item, index) => ({
            _id: String(index + 1),
            ...item
        }));

        $w('#hobbyRepeater').onItemReady(($item, itemData) => {
            $item('#hobbyIcon').text = itemData.icon;
            $item('#hobbyTitle').text = itemData.title;
            $item('#hobbyDesc').text = itemData.description;
        });
    }
}
