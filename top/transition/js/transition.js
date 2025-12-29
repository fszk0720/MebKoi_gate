document.addEventListener("DOMContentLoaded", () => {
  const sakuraLayer = document.getElementById("sakura-layer");
  const rippleLayer = document.getElementById("ripple-layer");
  const loadingWrapper = document.getElementById("loading-wrapper");
  const loadingBar = document.getElementById("loading-bar");
  const loadingText = document.getElementById("loading-text");

  // ★ 別ブランチで作るアニメーション画面
  const NEXT_URL = "../animation/animation.html";

  // 花びら1枚生成
  function createSakura() {
    const sakura = document.createElement("div");
    sakura.classList.add("sakura");

    sakura.innerHTML = `
      <svg viewBox="0 0 32 32" fill="white">
        <path d="M16 2 C 12 6, 8 11, 9 17 C 10 22, 13 26, 16 30 C 19 26, 22 22, 23 17 C 24 11, 20 6, 16 2 Z"/>
      </svg>
    `;

    sakuraLayer.appendChild(sakura);

    // 落下完了後（6s）に波紋
    setTimeout(() => {
      createRipple();

      // 波紋が出てからローディング開始（1s後）
      setTimeout(() => {
        startLoading();
      }, 1000);

    }, 6000);
  }

  // 水紋生成
  function createRipple() {
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    rippleLayer.appendChild(ripple);
  }

  // ローディング開始
  function startLoading() {
    loadingWrapper.classList.remove("hidden");

    let percent = 0;
    const loadingInterval = setInterval(() => {
      percent++;
      loadingBar.style.width = percent + "%";
      loadingText.textContent = percent + "%";

      if (percent >= 100) {
        clearInterval(loadingInterval);

        // ★ ローディング完了 → 障子演出へ
        startShojiEffect();
      }
    }, 30);
  }

  // ===============================
  // ★ 障子だけの演出
  // ===============================
  function startShojiEffect() {
    const shoji = document.getElementById("shoji");

    // 障子を表示して閉じる
    shoji.classList.remove("hidden");
    shoji.classList.add("close");

    setTimeout(() => {

      // ★ 背景を白に切り替え
      document.body.style.background = "#fff";

      // 障子を開く
      shoji.classList.remove("close");
      shoji.classList.add("open");

      setTimeout(() => {

        // ★ 別ブランチのアニメーション画面へ遷移
        location.href = NEXT_URL;

      }, 1000);

    }, 2000);
  }

  createSakura();
});
