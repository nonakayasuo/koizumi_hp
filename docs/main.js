// ============================================================
// main.js - グローバルJavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ─── ハンバーガーメニュー ───────────────────────
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const headerRight = nav ? nav.parentElement : null;

    if (hamburger && headerRight) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            headerRight.classList.toggle('open');
        });
        // メニューリンククリックで閉じる
        if (nav) {
            nav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    headerRight.classList.remove('open');
                });
            });
        }
    }

    // ─── スクロールトップボタン ─────────────────────
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            scrollTop.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── ヘッダー背景の切り替え ─────────────────────
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.background = window.scrollY > 50
                ? 'rgba(255,255,255,.97)'
                : 'rgba(255,255,255,.95)';
        });
    }

    // ─── スクロールアニメーション（Intersection Observer）──
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // ─── アクティブナビリンクの更新 ─────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
});
