/* =========================================================
   folder.js — 文件夹项目卡 → 单卡飞出详情（STAR + 图库）
   ========================================================= */

(function () {
  'use strict';

  function buildModalHTML(p) {
    const blocksHtml = (p.blocks || []).map(b => `
      <div class="detail-block">
        <div class="detail-block-title">${b.no} · ${b.title}</div>
        <div class="detail-row"><span class="lbl lbl-s">S 情境</span><span class="dval">${b.situation}</span></div>
        <div class="detail-row"><span class="lbl lbl-t">T 任务</span><span class="dval">${b.task}</span></div>
        <div class="detail-row"><span class="lbl lbl-a">A 行动</span><span class="dval"><ul>${(b.action || []).map(a => `<li>${a}</li>`).join('')}</ul></span></div>
        <div class="detail-row"><span class="lbl lbl-r">R 结果</span><span class="dval">${b.result}</span></div>
      </div>
    `).join('');

    const subTagHtml = p.subTag ? `
      <div class="sub-tag-block">
        <div class="sub-tag-label">${p.subTag.label}</div>
        <div class="sub-tag-list">
          ${(p.subTag.tags || []).map(t => `<span class="tag tag-yellow">${t}</span>`).join('')}
        </div>
        ${p.subTag.note ? `<div class="sub-tag-note">✧ ${p.subTag.note}</div>` : ''}
      </div>
    ` : '';

    const renderFigure = (g, i) => {
      const src = typeof g === 'string' ? g : g.src;
      const cap = (typeof g === 'string' ? '' : (g.cap || ''));
      return `<figure class="gallery-item">
        <img src="${src}" alt="${p.title} 图 ${i + 1}" loading="lazy">
        ${cap ? `<figcaption>${cap}</figcaption>` : ''}
      </figure>`;
    };
    const renderGroup = (sec, val) => {
      if (Array.isArray(val)) {
        return `<div class="modal-gallery">
          <div class="modal-gallery-title">${sec} · ${val.length} 张</div>
          <div class="gallery-grid">${val.map(renderFigure).join('')}</div>
        </div>`;
      }
      return Object.entries(val).map(([sub, imgs]) => `
        <div class="modal-gallery">
          <div class="modal-gallery-title">${sec} · ${sub} · ${imgs.length} 张</div>
          <div class="gallery-grid">${imgs.map(renderFigure).join('')}</div>
        </div>`).join('');
    };
    const galleryHtml = (p.gallery && (Array.isArray(p.gallery) ? p.gallery.length : Object.keys(p.gallery).length)) ? (Array.isArray(p.gallery) ? renderGroup('Gallery', p.gallery) : Object.entries(p.gallery).map(([sec, val]) => renderGroup(sec, val)).join('')) : '';

    return `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="关闭">×</button>
        <div class="modal-cover" style="background-image:url('${p.cover}'); background-position: ${p.coverPos || 'center'}" data-sticker="${p.sticker || 'PROJECT'}"></div>
        <div class="modal-header">
          <h2>${p.title}</h2>
          <div class="modal-sub">${p.subtitle}${p.date ? ` · ${p.date}` : ''}</div>
        </div>
        <div class="modal-body">
          ${blocksHtml}
          ${subTagHtml}
          ${galleryHtml}
        </div>
      </div>
    `;
  }

  function openProject(id) {
    /* PROJECTS 是 data.js 顶层的 const 词法绑定，不挂在 window 上 */
    const p = (typeof PROJECTS !== 'undefined') ? PROJECTS[id] : null;
    if (!p) return;

    let modal = document.getElementById('projectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'projectModal';
      modal.className = 'project-modal';
      document.body.appendChild(modal);
    }
    modal.innerHTML = buildModalHTML(p);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const close = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') galleryNext();
      if (e.key === 'ArrowLeft') galleryPrev();
    };

    modal.querySelector('.modal-backdrop').addEventListener('click', close);
    modal.querySelector('.modal-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);

    /* 图库 → 灯箱 */
    const imgs = modal.querySelectorAll('.gallery-grid img');
    if (imgs.length && window.Lightbox) {
      const flat = (Array.isArray(p.gallery) ? p.gallery : Object.values(p.gallery).flat());
      const sources = [p.cover].concat(flat.map(g => typeof g === 'string' ? g : g.src));
      imgs.forEach((img, i) => {
        img.addEventListener('click', () => {
          window.Lightbox.open(sources, i);
        });
      });
    }
    /* 封面点击也进灯箱 */
    const cover = modal.querySelector('.modal-cover');
    if (cover && window.Lightbox) {
      cover.style.cursor = 'zoom-in';
      cover.addEventListener('click', () => {
        const flat = (Array.isArray(p.gallery) ? p.gallery : Object.values(p.gallery).flat());
        window.Lightbox.open([p.cover].concat(flat.map(g => typeof g === 'string' ? g : g.src)), 0);
      });
    }

    /* 简单的前后翻图（键盘已支持） */
    function galleryNext() { /* 图库走灯箱，不做额外逻辑 */ }
    function galleryPrev() {}
  }

  /* 点击项目卡 → 飞出详情 */
  document.querySelectorAll('.folder-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.getAttribute('data-project');
      if (id) openProject(id);
    });
  });

  /* =========================================================
     悬停：当前文件夹卡片从文件夹口向上扇形展开（参考图），
     另外两个文件夹缩小（is-muted）；前片遮罩由 CSS 负责。
     ========================================================= */
  const folderEls = [...document.querySelectorAll('.folder')];
  let activeFolder = null;
  let mx = 0, my = 0;
  let leaveTimer = null;

  function expandFan(folder) {
    const cards = [...folder.querySelectorAll('.folder-card')];
    const n = cards.length;
    const vw = window.innerWidth, vh = window.innerHeight;
    const isMobile = vw <= 768;
    const R = 280;                  /* 桌面扇形半径 */
    const spread = 32;              /* 桌面每张卡夹角（度） */
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let tgtX, tgtY, rot;
      if (isMobile) {
        /* 移动端：Orbit Card Stack 展开效果 —— 水平扇形 + 弧线微降 + 中卡抬起 */
        const orbit = i - (n - 1) / 2;                      /* -1 / 0 / +1 */
        const sp = 168;                                     /* Orbit spread */
        tgtX = cx + orbit * sp;
        tgtY = cy + Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10;
        if (i === Math.round((n - 1) / 2)) tgtY -= 34;      /* 中卡 lift 34 */
        rot = orbit * 8.5;
      } else {
        /* 桌面端：横向平行一字排开，卡片无遮挡，定位在作品集页面正中央 */
        const sec = document.getElementById('projects');
        const sr = sec ? sec.getBoundingClientRect() : { left: 0, top: 0, width: vw, height: vh };
        const scx = sr.left + sr.width / 2;   /* 作品集 Section 中心（屏幕坐标）*/
        const scy = sr.top + sr.height / 2;
        const step = 400;   /* 卡宽 + 间距（实测卡宽约 380）*/
        tgtX = scx + (i - (n - 1) / 2) * step;
        tgtY = scy;
        rot = 0;
      }
      c.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s';
      c.style.transform = 'translate(' + (tgtX - cx) + 'px, ' + (tgtY - cy) + 'px) rotate(' + rot + 'deg)';
      c.style.zIndex = '10';
      c.dataset.fan = c.style.transform;   /* 记录展开态，供单卡 hover 抬起 */
    });
  }

  /* 单卡 hover：立即置顶抬起，抬起保持不回缩；切换卡片时切换，离开区域由 deactivate 统一收起 */
  document.querySelectorAll('.folder-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.dataset.fan) return;
      document.querySelectorAll('.folder-card').forEach(o => {
        if (o !== card && o.dataset.fan) {
          o.style.zIndex = '10';
          o.style.transform = o.dataset.fan;
        }
      });
      card.style.zIndex = '80';
      card.style.transform = card.dataset.fan + ' translateY(-34px)';
    });
    /* mouseleave 不恢复 —— 抬起保持，避免回缩抖动 */
  });

  function resetCards(folder) {
    folder.querySelectorAll('.folder-card').forEach(c => {
      c.style.transition = '';
      c.style.transform = '';
      c.style.zIndex = '';
      delete c.dataset.fan;
    });
  }

  function activate(folder) {
    if (activeFolder === folder) return;
    deactivate();
    activeFolder = folder;
    const isMobile = window.innerWidth <= 768;
    folderEls.forEach(f => {
      f.classList.toggle('is-hovered', f === folder);
      /* 移动端：其余文件夹无需隐藏；桌面端：缩小淡出 */
      if (!isMobile) f.classList.toggle('is-muted', f !== folder);
      else f.classList.remove('is-muted');
    });
    expandFan(folder);
  }

  function deactivate() {
    if (!activeFolder) return;
    const f = activeFolder;
    activeFolder = null;
    f.classList.remove('is-hovered');
    resetCards(f);
    folderEls.forEach(x => {
      x.classList.remove('is-muted');
      if (x !== f) resetCards(x);
    });
  }

  folderEls.forEach(folder => {
    folder.addEventListener('mouseenter', () => activate(folder));
    folder.addEventListener('mouseleave', () => {
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        const el = document.elementFromPoint(mx, my);
        if (el && (el.closest('.folder') || el.closest('.folder-card'))) return;
        deactivate();
      }, 180);
    });
  });

  let moveTimer = null;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!activeFolder) return;
    clearTimeout(moveTimer);
    /* 防抖：鼠标短暂脱出（如卡片抬起间隙）不立即收起，避免回缩 */
    moveTimer = setTimeout(() => {
      const el = document.elementFromPoint(mx, my);
      if (!el) { deactivate(); return; }
      const card = el.closest('.folder-card');
      const fld = el.closest('.folder');
      if (fld === activeFolder) return;                                /* 仍在文件夹上 */
      if (card && card.closest('.folder') === activeFolder) return;    /* 在展开卡片上 */
      if (fld) { activate(fld); return; }                              /* 移到另一个文件夹 */
      deactivate();
    }, 120);
  });

  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (!activeFolder) return;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => deactivate(), 150);   /* 防抖：持续滚动才收起 */
  }, { passive: true });
  window.addEventListener('resize',  () => { if (activeFolder) deactivate(); });

  window.ProjectFolder = { open: openProject };
})();
