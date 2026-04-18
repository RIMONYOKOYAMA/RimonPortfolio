const ICONS = [
  '/assets/icon1.png',
  '/assets/icon2.png',
  '/assets/icon3.png',
  '/assets/icon4.png',
  '/assets/icon5.png',
  '/assets/icon6.png',
];

const BASE_SIZE = 80;
const COUNT = 40;

function createIcon() {
  const el = document.createElement('img');
  el.src = ICONS[Math.floor(Math.random() * ICONS.length)];

  const scale = 0.5 + Math.random();
  const size = BASE_SIZE * scale;
  const duration = 12000 + Math.random() * 16000;
  const rotateDeg = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);

  const side = Math.floor(Math.random() * 4);
  let startX, startY;
  if (side === 0) { startX = Math.random() * window.innerWidth;  startY = -size; }
  if (side === 1) { startX = window.innerWidth + size;           startY = Math.random() * window.innerHeight; }
  if (side === 2) { startX = Math.random() * window.innerWidth;  startY = window.innerHeight + size; }
  if (side === 3) { startX = -size;                              startY = Math.random() * window.innerHeight; }

  el.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    object-fit: contain;
    left: ${startX}px;
    top: ${startY}px;
    pointer-events: none;
    z-index: -1;
    opacity: ${0.05 + Math.random() * 0.95};
  `;

  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  const endX = startX + Math.cos(angle) * distance;
  const endY = startY + Math.sin(angle) * distance;

  el.animate([
    { transform: `translate(0, 0) rotate(0deg)` },
    { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotateDeg}deg)` }
  ], {
    duration,
    easing: 'linear',
    fill: 'forwards'
  }).onfinish = () => {
    el.remove();
    createIcon();
  };
}

for (let i = 0; i < COUNT; i++) {
  setTimeout(() => createIcon(), Math.random() * 2000);
}