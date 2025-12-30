document.addEventListener("DOMContentLoaded", () => {

  const start = new Date(2025, 11, 30, 10, 12, 0);
  const end   = new Date(2026, 0, 2, 21, 59, 59);

  const now = new Date();

  if (now >= start && now <= end) {
    location.href = "./top/transition/transition.html";
    return;
  }

  document.getElementById("countdown-screen").classList.remove("hidden");
  startCountdown();
});


function startCountdown() {

  const eventStart = new Date(2025, 11, 30, 10, 12, 0);

  function update() {
    const now = new Date();
    const diff = eventStart - now;

    // ★ 0秒になった瞬間に障子演出へ
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
// ★ 障子だけの演出
// ===============================
function startShojiEffect() {
  const shoji = document.getElementById("shoji");
  const blackout = document.getElementById("blackout");

  // ★ まず障子を表示（display:none → flex）
  shoji.style.display = "flex";

  // 障子を閉じる
  shoji.classList.add("close");

setTimeout(() => {

  // ★ 閉じきった瞬間に黒フェード
  blackout.classList.remove("hidden");

  // ★ ここで 1 秒待つ（閉じたまま停止）
  setTimeout(() => {

    // ★ 1 秒後に開く
    shoji.classList.remove("close");
    shoji.classList.add("open");

    setTimeout(() => {
      location.href = "../top/transition/transition.html";
    }, 1000);

  }, 1000); // ← 追加した 1 秒待機

}, 1000); // ← 閉じるアニメーション時間

}
