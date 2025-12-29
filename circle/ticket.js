// -----------------------------
// 1. localStorage からサークル情報を取得
// -----------------------------
const circleName = localStorage.getItem("circleName");
const pn = localStorage.getItem("pn");
const space = localStorage.getItem("space");

// 画面に反映
document.getElementById("circleName").textContent = circleName || "不明";
document.getElementById("pn").textContent = pn || "不明";
document.getElementById("space").textContent = space || "不明";

// -----------------------------
// 2. もぎ取り状態の確認
// -----------------------------
const MOGITORI_KEY = `circle_mogitori_${space}`; // スペース番号ごとに管理
const isDone = localStorage.getItem(MOGITORI_KEY);

if (isDone === "done") {
  document.getElementById("ticketArea").classList.add("hidden");
  document.getElementById("doneArea").classList.remove("hidden");
}

// -----------------------------
// 3. もぎ取りボタン
// -----------------------------
document.getElementById("mogitoriBtn").addEventListener("click", () => {

  // もぎ取り処理
  localStorage.setItem(MOGITORI_KEY, "done");

  // UI 切り替え
  document.getElementById("ticketArea").classList.add("hidden");
  document.getElementById("doneArea").classList.remove("hidden");
});