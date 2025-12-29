// ==============================
// 入場ボタン遷移
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const generalBtn = document.getElementById("generalBtn");
  const circleBtn  = document.getElementById("circleBtn");

  if (generalBtn) {
    generalBtn.addEventListener("click", () => {
      location.href = "../general/index_general.html";
    });
  }

  if (circleBtn) {
    circleBtn.addEventListener("click", () => {
      location.href = "../circle/login.html";
    });
  }

  // ==============================
  // 桜エフェクト（花びら5種＋桜の花1種）
  // ==============================

  const sakuraContainer = document.querySelector(".sakura-container");
  if (!sakuraContainer) {
    return;
  }

  const petalPaths = [
    "M16 2 C 12 6, 8 11, 9 17 C 10 22, 13 26, 16 30 C 19 26, 22 22, 23 17 C 24 11, 20 6, 16 2 Z",
    "M16 3 C 11 8, 10 14, 12 20 C 14 25, 18 27, 20 22 C 22 17, 21 10, 16 3 Z",
    "M16 2 C 13 8, 14 16, 16 28 C 18 16, 19 8, 16 2 Z",
    "M16 2 C 10 8, 12 14, 14 20 C 16 26, 20 24, 22 18 C 24 12, 20 6, 16 2 Z",
    "M16 4 C 10 10, 10 18, 16 28 C 22 18, 22 10, 16 4 Z"
  ];

  const sakuraFlowerPath = `
    M16 6
    C 12 2, 6 4, 8 10
    C 2 12, 4 18, 10 16
    C 12 22, 18 22, 16 16
    C 22 18, 30 12, 24 10
    C 26 4, 20 2, 16 6 Z
  `;

  const petalColors = [
    "#ffd8e6",
    "#ffe4ef",
    "#ff90b9ff",
    "#9c1635ff",
    "#ff678aff"
  ];

  function createSVG(path, color) {
    return `
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" d="${path}"/>
      </svg>
    `;
  }

  function createSakura() {
    const sakura = document.createElement("div");
    sakura.classList.add("sakura");

    // 発生位置（画面外の上部～右寄りを含む範囲）
    const startY = Math.random() * -200 - 100;
    sakura.style.top = `${startY}px`;

    const screenWidth = window.innerWidth;
    const startX = Math.random() * (screenWidth + 400) - 100; // 左少し外〜右少し外
    sakura.style.left = `${startX}px`;

    // サイズ（小さめ）
    const size = Math.random() * 14 + 8;
    sakura.style.width = `${size}px`;
    sakura.style.height = `${size}px`;

    // 落下時間・遅延時間：CSS アニメに渡す
    const duration = Math.random() * 5 + 6;       // 6〜11秒
    const delay    = Math.random() * 3;           // 0〜3秒

    sakura.style.animationDuration = `${duration}s`;
    sakura.style.animationDelay    = `${delay}s`;

    // 色
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    // 花びら or 桜の花
    const isFlower = Math.random() < 0.1;
    sakura.innerHTML = createSVG(
      isFlower ? sakuraFlowerPath : petalPaths[Math.floor(Math.random() * petalPaths.length)],
      color
    );

    sakuraContainer.appendChild(sakura);

    // 一定時間後に削除（アニメ完了＋余裕）
    setTimeout(() => {
      sakura.remove();
    }, (duration + delay + 1) * 1000);
  }

  // 一定間隔で生成（右上→左下に散る配置をばら撒く）
  setInterval(createSakura, 180);
});
