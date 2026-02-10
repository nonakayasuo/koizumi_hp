// ============================================================
// Contact.js - お問い合わせページ
// ============================================================
// 【設置場所】Wix エディタ → お問い合わせページのコードパネル
//
// ========================
// 【ページ構成 & 必要な要素ID】
// ========================
//
// ■ セクション1: ページヘッダー
//   - #contactHeroStrip: ストリップ（テーマカラー背景）
//   - #contactPageTitle: テキスト「お問い合わせ」
//   - #contactPageSubtitle: テキスト「お気軽にご連絡ください」
//
// ■ セクション2: お問い合わせフォーム
//   - #contactFormSection: ストリップ（白背景）
//   - #contactImage: 画像（笑顔の写真 - カジュアル服）
//   - #contactFormTitle: テキスト「メッセージを送る」
//   - #inputName: テキスト入力（お名前）
//   - #inputEmail: テキスト入力（メールアドレス）
//   - #inputCategory: ドロップダウン（お問い合わせ種別）
//   - #inputMessage: テキストボックス（メッセージ本文）
//   - #submitButton: ボタン「送信する」
//   - #successMessage: テキスト（送信成功メッセージ - 初期非表示）
//   - #errorMessage: テキスト（エラーメッセージ - 初期非表示）
//
//   ※ Wixフォームアプリを使用する場合は、上記の代わりに
//     Wixフォームウィジェットを配置してください。
//
// ■ セクション3: その他の連絡先
//   - #otherContactSection: ストリップ（薄いグレー背景）
//   - #otherContactTitle: テキスト「その他のお問い合わせ方法」
//   - #emailInfo: テキスト（メールアドレス）
//   - #socialLinksContact: SNSアイコンリンク
//   - #officeInfo: テキスト（事務所情報 - 選挙事務所が決まったら追加）
//
// ■ セクション4: SNSフォローのお願い
//   - #followSection: ストリップ（テーマカラー背景）
//   - #followTitle: テキスト「SNSで最新情報をチェック」
//   - #twitterLink: アイコンボタン（X / Twitter）
//   - #instagramLink: アイコンボタン（Instagram）
//   - #facebookLink: アイコンボタン（Facebook）
//   - #noteLink: アイコンボタン（note）
//
// ============================================================

import wixAnimations from 'wix-animations';
import wixData from 'wix-data';

$w.onReady(function () {
    // ページ固有の初期化
    initContactPage();
    initContactForm();
    initSocialLinks();
});

// ─── ページ初期化 ─────────────────────────────────
function initContactPage() {
    // ヘッダーアニメーション
    if ($w('#contactPageTitle')) {
        const tl = wixAnimations.timeline();
        tl.add($w('#contactPageTitle'), {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutQuad'
        });
        tl.play();
    }

    // 成功・エラーメッセージを初期非表示
    if ($w('#successMessage')) $w('#successMessage').hide();
    if ($w('#errorMessage')) $w('#errorMessage').hide();

    // セクションのスクロールアニメーション
    const sections = ['#contactFormSection', '#otherContactSection', '#followSection'];
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

// ─── お問い合わせフォーム ──────────────────────────────
function initContactForm() {
    // カテゴリドロップダウンの選択肢を設定
    if ($w('#inputCategory')) {
        $w('#inputCategory').options = [
            { label: '応援メッセージ', value: 'support' },
            { label: 'ボランティア参加希望', value: 'volunteer' },
            { label: 'カンパについて', value: 'donation' },
            { label: '政策についてのご意見', value: 'policy' },
            { label: '取材・メディア関連', value: 'media' },
            { label: 'その他', value: 'other' }
        ];
    }

    // 送信ボタンのクリックイベント
    if ($w('#submitButton')) {
        $w('#submitButton').onClick(async () => {
            // バリデーション
            if (!validateForm()) {
                return;
            }

            // ボタンを無効化して処理中表示
            $w('#submitButton').disable();
            $w('#submitButton').label = '送信中...';

            try {
                // Wix Data コレクションに保存
                // 事前に「ContactSubmissions」というコレクションを作成してください
                const formData = {
                    name: $w('#inputName').value,
                    email: $w('#inputEmail').value,
                    category: $w('#inputCategory').value,
                    message: $w('#inputMessage').value,
                    submittedAt: new Date()
                };

                await wixData.insert('ContactSubmissions', formData);

                // 成功メッセージを表示
                if ($w('#successMessage')) {
                    $w('#successMessage').text = 'お問い合わせありがとうございます。メッセージを受け付けました。';
                    $w('#successMessage').show('fade');
                }

                // フォームをリセット
                resetForm();
            } catch (error) {
                console.error('送信エラー:', error);
                if ($w('#errorMessage')) {
                    $w('#errorMessage').text = '送信に失敗しました。しばらくしてから再度お試しください。';
                    $w('#errorMessage').show('fade');
                }
            } finally {
                // ボタンを再有効化
                $w('#submitButton').enable();
                $w('#submitButton').label = '送信する';
            }
        });
    }
}

// ─── フォームバリデーション ────────────────────────────
function validateForm() {
    let isValid = true;

    // 名前チェック
    if ($w('#inputName') && !$w('#inputName').value.trim()) {
        $w('#inputName').style.borderColor = '#e53935';
        isValid = false;
    }

    // メールチェック
    if ($w('#inputEmail')) {
        const email = $w('#inputEmail').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            $w('#inputEmail').style.borderColor = '#e53935';
            isValid = false;
        }
    }

    // メッセージチェック
    if ($w('#inputMessage') && !$w('#inputMessage').value.trim()) {
        $w('#inputMessage').style.borderColor = '#e53935';
        isValid = false;
    }

    if (!isValid) {
        if ($w('#errorMessage')) {
            $w('#errorMessage').text = '入力内容をご確認ください。';
            $w('#errorMessage').show('fade');
        }
    }

    return isValid;
}

// ─── フォームリセット ────────────────────────────────
function resetForm() {
    if ($w('#inputName')) $w('#inputName').value = '';
    if ($w('#inputEmail')) $w('#inputEmail').value = '';
    if ($w('#inputCategory')) $w('#inputCategory').value = '';
    if ($w('#inputMessage')) $w('#inputMessage').value = '';
}

// ─── SNSリンク ───────────────────────────────────
function initSocialLinks() {
    // SNSリンクのURL設定（実際のURLに変更してください）
    const socialLinks = {
        '#twitterLink': 'https://twitter.com/koizumi_shinpei',
        '#instagramLink': 'https://instagram.com/koizumi_shinpei',
        '#facebookLink': 'https://facebook.com/koizumi.shinpei',
        '#noteLink': 'https://note.com/koizumi_shinpei'
    };

    Object.entries(socialLinks).forEach(([id, url]) => {
        if ($w(id)) {
            $w(id).onClick(() => {
                // 新しいタブで開く
                // Wix Veloでは wixLocation.to() で外部リンクを開けます
                import('wix-location').then(wixLocation => {
                    wixLocation.to(url);
                });
            });
        }
    });
}
