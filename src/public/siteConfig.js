// ============================================================
// siteConfig.js - サイト全体の設定ファイル
// ============================================================
// 【設置場所】Wix エディタ → Public フォルダ → siteConfig.js
//
// サイト全体で共有する設定値をここに定義します。
// 各ページのコードから import して使用できます。
// ============================================================

// ─── 候補者情報 ─────────────────────────────────
export const CANDIDATE = {
    name: '小泉 しんぺい',
    nameKana: 'こいずみ しんぺい',
    nameEnglish: 'Shinpei Koizumi',
    position: '○○市議会議員候補',  // 実際の市名に変更
    catchphrase: 'あなたの声を、まちの力に。',
    party: '',  // 政党名（無所属の場合は空文字）
    city: '○○市',  // 実際の市名に変更
};

// ─── SNSリンク ────────────────────────────────────
export const SOCIAL_LINKS = {
    twitter: 'https://twitter.com/koizumi_shinpei',      // 実際のURLに変更
    instagram: 'https://instagram.com/koizumi_shinpei',   // 実際のURLに変更
    facebook: 'https://facebook.com/koizumi.shinpei',     // 実際のURLに変更
    note: 'https://note.com/koizumi_shinpei',             // 実際のURLに変更
    youtube: '',  // YouTubeチャンネルがある場合
    line: '',     // LINE公式アカウントがある場合
};

// ─── テーマカラー ──────────────────────────────────
export const THEME_COLORS = {
    primary: '#2E7D32',
    primaryLight: '#4CAF50',
    primaryDark: '#1B5E20',
    accent: '#F9A825',
    textDark: '#212121',
    textMedium: '#616161',
    white: '#FFFFFF',
    bgLight: '#F5F5F5',
    bgGreenLight: '#E8F5E9',
};

// ─── お知らせカテゴリ ─────────────────────────────────
export const NEWS_CATEGORIES = {
    announcement: { label: 'お知らせ', color: '#2E7D32' },
    activity: { label: '活動報告', color: '#1565C0' },
    media: { label: 'メディア掲載', color: '#F57F17' },
    event: { label: 'イベント', color: '#6A1B9A' },
};

// ─── ページパス ──────────────────────────────────
export const PAGES = {
    home: '/',
    profile: '/profile',
    policy: '/policy',
    support: '/support',
    contact: '/contact',
};