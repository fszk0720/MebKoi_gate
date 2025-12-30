document.addEventListener("DOMContentLoaded", () => {

  const start = new Date(2025, 11, 30, 10, 35, 0);
  const end   = new Date(2026, 0, 2, 21, 59, 59);

  // ★ GitHub Pages で即リダイレクトされる原因を削除
  // const now = new Date();
  // if (now >= start && now <= end) {
  //   location.href = "./top/transition/transition.html";
  //   return;
  // }

  // ★ カウントダウン画面を表示
  document.getElementById("countdown-screen").classList.remove("hidden");
  startCountdown(start, end);
});


function startCountdown(start, end) {

  function update() {
    const now = new Date();
    const diff = start - now;

    // ★ 0秒になった瞬間に障子演出へ（ここで判定する）
    if (diff <= 0 && !window.effectStarted) {
      window.effectStarted = true;
      startShojiEffect();
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    const hh = String(hours).padStart(2, "0");
    const mm = String(mins).padStart(2, "0");
    const ss = String(secs).padStart(2, "0");

    document.getElementById("countdown-text").innerHTML =
      `開催まであと<br>${days}日と　${hh}:${mm}:${ss}`;
  }

  update();
  setInterval(update, 1000);
}


// ===============================
// ★ 障子だけの演出（変更なし）
// ===============================
function startShojiEffect() {
  const shoji = document.getElementById("shoji");
  const blackout = document.getElementById("blackout");

  shoji.style.display = "flex";
  shoji.classList.add("close");

  setTimeout(() => {

    blackout.classList.remove("hidden");

    setTimeout(() => {

      shoji.classList.remove("close");
      shoji.classList.add("open");

      setTimeout(() => {
        location.href = "./top/transition/transition.html";
      }, 1000);

    }, 1000);

  }, 1000);
}
