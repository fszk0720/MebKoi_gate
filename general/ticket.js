document.addEventListener("DOMContentLoaded", () => {
  const opening = document.getElementById("opening");
  const ticket = document.getElementById("ticket");
  const message = document.getElementById("message");
  const result = document.getElementById("result");

  // 有効期間
  const start = new Date("2025-10-30T22:00:00+09:00");
  const end   = new Date("2026-01-02T21:59:00+09:00");
  const now   = new Date();

  if (now < start || now > end) {
    result.innerHTML = `<p>⏰ このチケットはまだ/もう有効ではありません。</p>`;
    return;
  }

  // ページロード後の流れ
  setTimeout(() => {
    opening.style.display = "none";
    ticket.style.display = "flex";

    setTimeout(() => {
      message.style.display = "block";
    }, 2000);
  }, 2000);

  // チケットクリック処理
  ticket.addEventListener("click", () => {
    ticket.classList.add("torn");

    setTimeout(() => {
      ticket.style.display = "none";
      message.style.display = "none";

      const tornBefore = localStorage.getItem("generalTicketTorn");

      if (!tornBefore) {
        // 初回 → 入場ページへ
        localStorage.setItem("generalTicketTorn", "true");
        window.location.href = "entry_general.html";
      } else {
        // 2回目以降 → 半券画像＋再入場リンクのみ
        result.innerHTML = `
          <h2>一般参加者 入場済み</h2>
          <img src="general_ticket.png" alt="もぎ取られたチケット画像"><br>
          <a href="entry_general.html">🚪 再入場はこちら</a>
        `;
        result.style.display = "block";
      }
    }, 1000); // アニメーション終了後
  });
});

// 🔄 テスト用リセット関数
function resetTicketFlag() {
  localStorage.removeItem("generalTicketTorn");
  alert("入場履歴をリセットしました。ページを再読み込みすると初回状態になります。");
}
