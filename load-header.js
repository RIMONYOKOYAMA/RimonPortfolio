document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;
  try {
    const isInSubfolder = location.pathname.includes('/works/');
    const prefix = isInSubfolder ? '../' : '';
    const response = await fetch(prefix + 'header.html');
    const html = await response.text();
    headerTarget.innerHTML = html;

    if (isInSubfolder) {
      // リンクのhrefを修正
      headerTarget.querySelectorAll('a[href]').forEach(el => {
        const href = el.getAttribute('href');
        if (!href.startsWith('http') && !href.startsWith('../')) {
          el.setAttribute('href', '../' + href);
        }
      });

      // 画像のsrcを修正
      headerTarget.querySelectorAll('img[src]').forEach(el => {
        const src = el.getAttribute('src');
        if (!src.startsWith('http') && !src.startsWith('../')) {
          el.setAttribute('src', '../' + src);
        }
      });
    }

  } catch (error) {
    console.error("ヘッダーの読み込みに失敗しました", error);
  }
});