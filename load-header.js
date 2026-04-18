document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;
  try {
    const depth = location.pathname.split('/').length - 2;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
    const response = await fetch(prefix + 'header.html');
    const html = await response.text();
    headerTarget.innerHTML = html;
  } catch (error) {
    console.error("ヘッダーの読み込みに失敗しました", error);
  }
});