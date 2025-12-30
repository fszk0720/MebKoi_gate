document.addEventListener("DOMContentLoaded", () => {
  const ticket = document.getElementById("ticket");
  const message = document.getElementById("message");
  const result = document.getElementById("result");
  const ticketText = document.getElementById("ticketText");

  // サークル情報取得（一般側では使わないが残しても問題なし）
  const circleName = localStorage.getItem("circleName");
  const pn = localStorage.getItem("pn");
  const space = localStorage.getItem("space");

  // ★★★ 初回のみ処理（localStorage 判定）を完全削除 ★★★

  // 最初から表示
  ticket.style.display = "flex";
  message.style.display = "block";

  // もぎり処理（毎回アニメーションを流す）
  ticket.addEventListener("click", () => {

    // クリックのたびにアニメーションを再実行するために
    // いったん torn を外して再付与する
    ticket.classList.remove("torn");
    void ticket.offsetWidth; // ★ 強制再描画（アニメ再実行のために必要）
    ticket.classList.add("torn");

    setTimeout(() => {
      ticket.style.display = "none";
      message.style.display = "none";
      ticketText.style.display = "none";

      // ★★★ localStorage の保存も削除（初回限定を無くすため） ★★★

      result.innerHTML = `
        <img src="./illustration_left.png" alt="半券画像">
        <p>
          <a href="https://event.toranoana.jp/world/310236"
             target="_blank"
             rel="noopener noreferrer">入場口</a>
        </p>
      `;
    }, 1000);
  });

  // ==============================
  // 桜エフェクト（変更なし）
  // ==============================
  const sakuraContainer = document.querySelector(".sakura-container");

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
      <svg viewBox="0 0 32 32">
        <path fill="${color}" d="${path}"/>
      </svg>
    `;
  }

  function createSakura() {
    const sakura = document.createElement("div");
    sakura.classList.add("sakura");

    const startY = Math.random() * -200 - 100;
    sakura.style.top = `${startY}px`;

    const screenWidth = window.innerWidth;
    const startX = Math.random() * (screenWidth + 400) - 100;
    sakura.style.left = `${startX}px`;

    const size = Math.random() * 14 + 8;
    sakura.style.width = `${size}px`;
    sakura.style.height = `${size}px`;

    const duration = Math.random() * 5 + 6;
    const delay    = Math.random() * 3;

    sakura.style.animationDuration = `${duration}s`;
    sakura.style.animationDelay    = `${delay}s`;

    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    const isFlower = Math.random() < 0.1;
    sakura.innerHTML = createSVG(
      isFlower ? sakuraFlowerPath : petalPaths[Math.floor(Math.random() * petalPaths.length)],
      color
    );

    sakuraContainer.appendChild(sakura);

    setTimeout(() => {
      sakura.remove();
    }, (duration + delay + 1) * 1000);
  }

  setInterval(createSakura, 180);
});
