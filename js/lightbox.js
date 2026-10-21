/* =========================================================
   Lightbox — 图片灯箱（黑色蒙版 + 大图 + 左右切换 + 计数）
   ========================================================= */

(function () {
  'use strict';

  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg = document.getElementById('lbImg');
  const closeBtn = document.getElementById('lbClose');
  const prevBtn = document.getElementById('lbPrev');
  const nextBtn = document.getElementById('lbNext');
  const countEl = document.getElementById('lbCount');

  let images = [];
  let currentIdx = 0;

  function renderCount() {
    if (countEl && images.length > 1) {
      countEl.textContent = (currentIdx + 1) + ' / ' + images.length;
      countEl.style.display = 'block';
    } else if (countEl) {
      countEl.style.display = 'none';
    }
  }

  function open(list, idx) {
    if (!list || !list.length) return;
    images = list;
    currentIdx = Math.min(Math.max(idx || 0, 0), images.length - 1);
    lbImg.src = images[currentIdx];
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCount();
  }
  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }
  function next() { if (images.length) open(images, (currentIdx + 1) % images.length); }
  function prev() { if (images.length) open(images, (currentIdx - 1 + images.length) % images.length); }

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  window.Lightbox = { open, close, next, prev };
})();
