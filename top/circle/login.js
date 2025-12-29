// 共通パスワード
const COMMON_PASSWORD = "MebKoi";

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const error = document.getElementById("error");

  loginBtn.addEventListener("click", () => {

    const inputNumber = document.getElementById("space").value.trim();
    const inputPass = document.getElementById("password").value.trim();

    error.textContent = "";

    if (!inputNumber) {
      error.textContent = "スペース番号を入力してください";
      return;
    }

    if (inputPass !== COMMON_PASSWORD) {
      error.textContent = "パスワードが違います";
      return;
    }

    console.log("CSV 読み込み開始");

    fetch("./circle.csv")
      .then(res => res.text())
      .then(text => {

        const rows = text.trim().split("\n").map(r => r.split(","));
        rows.shift(); // ヘッダー削除

        const row = rows.find(r => r[2].trim() === inputNumber);

        if (!row) {
          error.textContent = "スペース番号が存在しません";
          return;
        }

        // 認証成功 → 情報保存
        localStorage.setItem("circleName", row[0]);
        localStorage.setItem("pn", row[1]);
        localStorage.setItem("space", row[2]);

        // サークル用チケット画面へ遷移
        location.href = "./index.html";
      })
      .catch(err => {
        console.error(err);
        error.textContent = "CSV の読み込みに失敗しました";
      });

  });

});
