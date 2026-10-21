/* =========================================================
   Hero Particles - Multi-color floating dots
   ========================================================= */

(function() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const colors = ['#FFE500', '#FF4D94', '#FF5A00', '#FFFFFF'];
  const count = 36;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = 8 + Math.random() * 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      bottom:-20px;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color}66;
    `;
    container.appendChild(p);
  }
})();
