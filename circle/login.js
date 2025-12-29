// 共通パスワード
const COMMON_PASSWORD = "MebKoi";

document.getElementById("loginBtn").addEventListener("click", () => {
  const inputNumber = document.getElementById("space").value.trim();
  const inputPass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  // パスワードチェック
  if (inputPass !== COMMON_PASSWORD) {
    error.textContent = "パスワードが違います";
    return;
  }

  // CSV 読み込み
  fetch("../top-app/circle.csv")  // ← CSV は top-app にあるため相対パスで参照
    .then(res => res.text())
    .then(text => {
      const rows = text.trim().split("\n").map(r => r.split(","));
      rows.shift(); // ヘッダー削除

      const row = rows.find(r => r[2] === inputNumber);

      if (!row) {
        error.textContent = "スペース番号が存在しません";
        return;
      }

      // 認証成功 → 情報保存
      localStorage.setItem("circleName", row[0]);
      localStorage.setItem("pn", row[1]);
      localStorage.setItem("space", row[2]);

      // サークル用チケット画面へ遷移
      location.href = "index.html";
    })
    .catch(() => {
      error.textContent = "CSV の読み込みに失敗しました";
    });
});