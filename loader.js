const hasVisited = sessionStorage.getItem('visited');

if (!hasVisited) {
  sessionStorage.setItem('visited', 'true');

  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `<img src="assets/NameLogo.png" alt="RIMON" id="loader-logo">`;
  document.body.appendChild(loader);
  document.body.style.overflow = 'hidden';

  const ICONS = [
    'assets/icon1.png',
    'assets/icon2.png',
    'assets/icon3.png',
    'assets/icon4.png',
    'assets/icon5.png',
    'assets/icon6.png',
  ];

  const ICON_SIZE = 40;
  const GAP = 120;
  const iconEls = [];

  // グリッド状に配置（最初は中央に集まった状態）
  const cols = Math.ceil(window.innerWidth / GAP) + 1;
  const rows = Math.ceil(window.innerHeight / GAP) + 1;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  let iconIndex = 0;
  for (let row = 0; row < rows; row++) {
    const offset = row % 2 === 1 ? GAP / 2 : 0;
    for (let col = 0; col < cols; col++) {
      const el = document.createElement('img');
      el.src = ICONS[iconIndex % ICONS.length];
      iconIndex++;

      const targetX = col * GAP + offset;
      const targetY = row * GAP;
      const angle = Math.random() * 360;
      const opacity = 0.1 + Math.random() * 0.4;

      el.style.cssText = `
        position: fixed;
        width: ${ICON_SIZE}px;
        height: ${ICON_SIZE}px;
        object-fit: contain;
        left: ${centerX}px;
        top: ${centerY}px;
        opacity: 0;
        transform: rotate(${angle}deg);
        pointer-events: none;
        z-index: 9998;
        transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    top 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.8s ease;
      `;

      document.body.appendChild(el);
      iconEls.push({ el, targetX, targetY, opacity });
    }
  }

  window.addEventListener('load', () => {
    // アイコンを広げる
    setTimeout(() => {
      iconEls.forEach(({ el, targetX, targetY, opacity }) => {
        el.style.left = `${targetX}px`;
        el.style.top = `${targetY}px`;
        el.style.opacity = String(opacity);
      });
    }, 100);

    // 広がり終わったらローダーごと上にスライド
    setTimeout(() => {
      loader.classList.add('loader-out');

      // アイコンも一緒に上にスライド
      iconEls.forEach(({ el }) => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
        el.style.transform += ' translateY(-120vh)';
      });

      // スライド後にアイコンを削除
      setTimeout(() => {
        iconEls.forEach(({ el }) => el.remove());
        document.body.style.overflow = '';
      }, 600);

    }, 1200); // 広がるアニメーション(800ms) + 少し待つ
  });
}