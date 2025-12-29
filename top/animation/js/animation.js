document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  // 文字を1文字ずつ span に分解
  function splitChars() {
    document.querySelectorAll(".char-by-char").forEach(el => {
      const text = el.textContent.trim();
      el.textContent = "";
      [...text].forEach((ch, i) => {
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.transitionDelay = `${i * 0.1}s`; // 1文字ごとの遅延
        el.appendChild(span);
      });
    });
  }

  splitChars();

  function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  // シーン表示共通処理
  async function showScene(id, duration = 3000) {
    console.log("showScene", id);
    const scene = document.getElementById(id);
    if (!scene) return;

    // シーン自体をフェードイン
    scene.style.opacity = 1;

    const text = scene.querySelector(".vertical-text");
    if (text) {
      text.style.opacity = 1;
    }

    // 一文字ずつ表示
    const chars = scene.querySelectorAll("span");
    chars.forEach(ch => {
      ch.style.opacity = 1;
    });

    // 表示している時間
    await wait(duration);

    // 文字を溶けるように消す
    if (text) text.classList.add("melt");
    chars.forEach(ch => ch.classList.add("melt"));

    await wait(1200);

    // シーン全体を消す
    scene.style.opacity = 0;
    await wait(300);
  }

  async function startAnimation() {
    console.log("startAnimation start");

    // ① ゆく年くる年　宵越しに
    await showScene("scene1", 3000);

    // ② 十人十色の好きがあふれる + 画像フェードイン
    const imgs = document.querySelectorAll(".circle-img");
    imgs.forEach((img, i) => {
      img.style.transitionDelay = `${i * 0.5}s`;
      img.style.opacity = 1;
    });
    await showScene("scene2", 3500);

    // ③ 昭和一〇〇年　最後の父水Webイベント（画像は残したまま）
    await showScene("scene3", 3000);

    // 画像を溶かすように消す
    await wait(1000);
    imgs.forEach(img => img.classList.add("melt"));
    await wait(1000);

    // ④ ロゴ
    const logo = document.getElementById("logo");
    const scene4 = document.getElementById("scene4");
    scene4.style.opacity = 1;
    logo.style.opacity = 1;

    await wait(2000);

    // ロゴを溶かす
    logo.classList.add("melt");
    await wait(1200);
    scene4.style.opacity = 0;

    // ⑤ 二〇二五年一二月三一日　二一時〇〇分　開幕
    await showScene("scene5", 3000);

    // ⑥ 白背景をフェードアウト
    document.getElementById("white-bg").style.opacity = 0;

    // ★ 1秒後に top.html へ遷移
    setTimeout(() => {
      window.location.href = "../top/index.html";
    }, 1000);

    console.log("startAnimation end");
  }

  startAnimation().catch(e => {
    console.error("animation error", e);
  });
});