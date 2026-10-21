/* =========================================================
   main.js — 导航 / 滚动 / 视差 / 钥匙扣交互 / 时间线拖拽
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 顶部导航：滚动后毛玻璃 ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 移动端汉堡菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  /* ---------- 锚点平滑滚动 ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- IntersectionObserver 入场动效（移动端兼容：进入即触发 + 滚动兜底） ---------- */
  const animEls = document.querySelectorAll('.js-anim');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 18% 0px' });
    animEls.forEach(el => obs.observe(el));
    /* 兜底：滚动停止后，仍在视口内却未触发动画的元素强制显示（防快速滑动漏检） */
    let scrollTimer = null;
    const revealOnScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        animEls.forEach(el => {
          if (!el.classList.contains('in-view')) {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) {
              el.classList.add('in-view');
            }
          }
        });
      }, 100);
    };
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
  } else {
    animEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Hero 视差（装饰 0.7x） ---------- */
  const hero = document.getElementById('hero');
  if (hero) {
    const orbs = hero.querySelectorAll('.hero-orb');
    const sparks = hero.querySelectorAll('.hero-sparkles .sparkle');
    let ticking = false;

    const onParallax = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        orbs.forEach((o, i) => {
          o.style.transform = `translateY(${y * 0.5 * (1 + i * 0.25)}px)`;
        });
        sparks.forEach((s, i) => {
          s.style.transform = `translateY(${y * 0.7 * (0.6 + (i % 3) * 0.3)}px)`;
        });
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onParallax);
        ticking = true;
      }
    }, { passive: true });
    onParallax();
  }

  /* ---------- 钥匙扣鼠标微晃动（已迁移至 js/keychain.js 物理弹簧版本） ---------- */

  /* Experience 已重构为 WheelCarousel 转盘（js/wheel.js 管理），旧横向拖拽逻辑移除 */
})();
