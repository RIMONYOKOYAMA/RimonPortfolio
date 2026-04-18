const hasVisited = sessionStorage.getItem('visited');

if (!hasVisited) {
  sessionStorage.setItem('visited', 'true');

  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `<img src="/assets/NameLogo.png" alt="RIMON">`;
  document.body.appendChild(loader);

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loader-out');
      document.body.style.overflow = '';
    }, 800);
  });
}