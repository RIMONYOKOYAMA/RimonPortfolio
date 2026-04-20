const isWorksPage = document.body.classList.contains('works-page');

if (isWorksPage) {
  // works.html用 ページ読み込み時
  window.addEventListener('load', () => {
    const fadeCards = document.querySelectorAll('.works-grid-4 .work-card');
    if (fadeCards.length === 0) return;

    fadeCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
    });

    setTimeout(() => {
      fadeCards.forEach((card, index) => {
        const col = index % 4;
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, col * 80 + Math.floor(index / 4) * 40);
      });
    }, 200);
  });

} else {
  // index.html用 スクロール時
  const scrollTargets = document.querySelectorAll(
    '.works-panel, .profile-image, .profile-main, .profile-box, .contact-panel'
  );

  scrollTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  scrollTargets.forEach(el => observer.observe(el));
}