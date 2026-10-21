/* =========================================================
   Hero 钥匙扣 — 自主摇晃 + 物理弹簧鼠标跟随（用户代码实现）
   钥匙扣持续自主正弦摇摆（±3°），鼠标移动时叠加 3D 倾斜
   （±12°/±8°），松手后阻尼回中；地面投影随总摆角同步晃动。
   ========================================================= */
(function () {
  const wrap = document.querySelector('.hero-keychain');
  if (!wrap) return;
  const shadow = document.querySelector('.keychain-shadow');

  // 物理参数（鼠标摇晃已加大：更灵敏 + 更大摆角）
  const spring = 0.09;   // 弹簧刚度
  const friction = 0.9;  // 阻尼，越大停下越慢

  // 自主摇晃参数
  const AUTO_AMP = 3;    // ±3° 自主摆动幅度
  const AUTO_SPEED = 1.15; // 摆动速度（约 5.5s 一个周期）

  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let autoT = 0;
  let lastT = performance.now();

  // 鼠标移动，计算倾斜角度
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // 限制最大摇摆角度 ±18deg（Y 轴左右）/ ±12deg（X 轴前后）
    targetRotateY = Math.max(-18, Math.min(18, dx / 28));
    targetRotateX = Math.max(-12, Math.min(12, dy / 45));
  });

  // 物理动画循环
  function animate() {
    const now = performance.now();
    autoT += (now - lastT) / 1000;
    lastT = now;

    // 自主摇晃（正弦）
    const auto = Math.sin(autoT * AUTO_SPEED) * AUTO_AMP;

    // 弹簧缓动（鼠标跟随）
    currentRotateX += (targetRotateX - currentRotateX) * spring;
    currentRotateY += (targetRotateY - currentRotateY) * spring;
    // 阻尼衰减
    targetRotateX *= friction;
    targetRotateY *= friction;

    wrap.style.transform =
      `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotate(${auto}deg)`;

    // 地面投影随总摆角同步：左右摆 → 投影反向移动 + 缩放/明暗微变
    if (shadow) {
      const total = currentRotateY + auto;
      const drift = total * 1.7;
      const sc = 1 + Math.abs(total) * 0.007;
      const op = 0.62 + Math.abs(total) * 0.02;
      shadow.style.transform = `translateX(calc(-50% + ${drift}px)) scaleX(${sc})`;
      shadow.style.opacity = String(op);
    }

    requestAnimationFrame(animate);
  }
  animate();
})();
