/* ============================================
   WheelCarousel 原生实现 —— 经历转盘（拖动/滚轮 + 惯性 + snap）
   v3：无界旋转 + 最近环绕偏移（shortestOffset）
   —— 标签始终围绕视口滑动，环绕无缝且永不出现空白窗口
   ============================================ */
(function () {
  var wheel = document.getElementById('wcWheel');
  if (!wheel) return;
  var photo = document.querySelector('.wc-photo');
  var marker = document.querySelector('.wc-marker');
  var labels = Array.prototype.slice.call(document.querySelectorAll('.wc-label'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.wc-card'));
  var N = labels.length;
  if (!N) return;

  var SPACING = 24;     // 标签间角度（deg）
  var RADIUS = 231;     // 圆弧半径（px）· 放大 10%
  var DRAG_SPEED = 0.03;
  var SCROLL_SPEED = 0.016;   // 滚轮灵敏度：一格滚动约换 1.6 个标签（响应更跟手）

  var rotation = 0;     // 无界旋转
  var selected = 0;
  var velocity = 0;
  var dragging = false;
  var dragStartY = 0, dragStartRot = 0;
  var frame = null;

  function wrap(i) { return ((i % N) + N) % N; }

  /* 最近环绕偏移：rotation 无界增长，offset 始终落在 ±N/2 内，
     标签恒围绕选中项滑动，环绕时无缝回流，不会出现空白窗口 */
  function shortestOffset(index, rot) {
    var off = index - rot;
    while (off > N / 2) off -= N;
    while (off < -N / 2) off += N;
    return off;
  }

  function commit(next) {
    rotation = next;   /* 无界增长：环绕 = 标签无缝回流 */
    render();
  }

  function render() {
    var selIdx = wrap(Math.round(rotation));   /* 选中内容（0..N-1）*/
    var selEl = null;
    labels.forEach(function (el, i) {
      var off = shortestOffset(i, rotation);
      var angle = off * SPACING;
      var rad = (angle * Math.PI) / 180;
      var x = -RADIUS * (1 - Math.cos(rad));
      var y = RADIUS * Math.sin(rad);
      var dist = Math.min(Math.abs(off) / 3, 1);
      var opacity = Math.cos((dist * Math.PI) / 2);
      var scale = 1 - Math.min(Math.abs(off) * 0.05, 0.5);
      var isSel = Math.abs(off) < 0.5;
      el.style.transform =
        'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px)) ' +
        'rotate(' + angle + 'deg) scale(' + scale + ')';
      el.style.opacity = opacity;
      el.style.color = isSel ? '#141CDE' : '#9A9A9A';
      if (isSel) selEl = el;
    });
    if (selIdx !== selected) {
      selected = selIdx;
      cards.forEach(function (c, i) {
        c.classList.toggle('wc-active', i === selected);
      });
      /* 贴纸与投影随卡片同步分色 */
      if (photo && cards[selected]) {
        var st = cards[selected].getAttribute('data-sticker') || 'NOW';
        if (photo.getAttribute('data-sticker') !== st) {
          photo.setAttribute('data-sticker', st);
        }
      }
    }
    /* 圆点标记：跟随选中标签，移到时间文字左侧，不遮挡数字 */
    if (marker && selEl) {
      var w = selEl.offsetWidth || 160;
      marker.style.left = 'calc(50% - ' + Math.round(w / 2 + 20) + 'px)';
    }
  }

  function runAnim() {
    if (frame !== null) return;
    var tick = function () {
      var keep = false;
      if (!dragging && Math.abs(velocity) > 0.02) {
        commit(rotation + velocity);
        velocity *= 0.9;
        keep = true;
      } else if (!dragging) {
        velocity = 0;
        var target = Math.round(rotation);
        var delta = target - rotation;
        if (Math.abs(delta) > 0.002) {
          commit(rotation + delta * 0.2);
          keep = true;
        } else {
          commit(target);
        }
      }
      if (keep) frame = requestAnimationFrame(tick);
      else frame = null;
    };
    frame = requestAnimationFrame(tick);
  }

  /* 自动播放：每 2 秒平滑前进一个时间段（正序循环）*/
  var autoTimer = null;
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      if (document.hidden) return;
      velocity = 0.12;        /* 惯性滑行，累计约 +1 格后 snap 到位 */
      runAnim();
    }, 2000);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }
  wheel.addEventListener('pointerenter', stopAuto);   /* 鼠标进入转盘 → 暂停自动 */
  wheel.addEventListener('pointerleave', startAuto);  /* 鼠标离开 → 恢复自动 */
  wheel.addEventListener('pointerdown', stopAuto);    /* 手动拖拽 → 暂停自动 */

  /* 滚轮：实时判定鼠标是否停留在转盘区域内（扩大判定范围，更灵敏）*/
  function overWheel(e) {
    var r = wheel.getBoundingClientRect();
    return e.clientX >= r.left - 12 && e.clientX <= r.right + 12 &&
           e.clientY >= r.top - 12 && e.clientY <= r.bottom + 12;
  }
  wheel.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey) return;
    if (!overWheel(e)) return;   /* 不在转盘区域 → 不转动，页面正常滚动 */
    e.preventDefault();
    stopAuto();                  /* 手动滚轮 → 暂停自动播放，避免叠加错乱 */
    if (Math.abs(e.deltaY) < 20) return;   /* 忽略极小滚动，防误触抖动 */
    velocity = 0;
    var step = e.deltaY > 0 ? 1 : -1;      /* 一格 = 切换一个时间段，稳定前进/后退 */
    velocity = step * 0.12;                /* 惯性滑行，平滑过渡到目标格 */
    runAnim();
  }, { passive: false });

  /* 拖拽：向下拖 → 时间正序前进 */
  wheel.addEventListener('pointerdown', function (e) {
    if (!e.isPrimary || e.button !== 0) return;
    dragging = true;
    velocity = 0;
    wheel.classList.add('dragging');
    dragStartY = e.clientY;
    dragStartRot = rotation;
    try { wheel.setPointerCapture(e.pointerId); } catch (err) {}
  });
  wheel.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dy = e.clientY - dragStartY;
    var next = dragStartRot + dy * DRAG_SPEED;
    velocity = next - rotation;
    commit(next);
  });
  function end(e) {
    if (!dragging) return;
    dragging = false;
    wheel.classList.remove('dragging');
    try { wheel.releasePointerCapture(e.pointerId); } catch (err) {}
    runAnim();
  }
  wheel.addEventListener('pointerup', end);
  wheel.addEventListener('pointercancel', end);

  /* 键盘 */
  wheel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault(); velocity = 0; commit(rotation + 1); runAnim();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); velocity = 0; commit(rotation - 1); runAnim();
    }
  });

  /* NEXT 按钮：平滑切换到作品集界面 */
  var nextBtn = document.getElementById('wcNext');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      var proj = document.getElementById('projects');
      if (proj) proj.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  render();
  startAuto();
})();
