document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;
  try {
    const response = await fetch("/RimonPortfolio/header.html");
    const html = await response.text();
    headerTarget.innerHTML = html;
  } catch (error) {
    console.error("ヘッダーの読み込みに失敗しました", error);
  }
});