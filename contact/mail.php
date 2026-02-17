<?php
  // フォームからの値を受け取る
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // メール送信処理
  $to = "shiroma128@gmail.com";
  $subject = "お問い合わせがありました";
  $headers = "From: contact@shiodamari.com";
  $body = "名前: $name\nメール: $email\n内容:\n$message";

  if (mail($to, $subject, $body, $headers)) {
    // ★ 送信成功 → thanksページへリダイレクト！
    header("Location: https://shiodamari.com/portfolio_contact/thanks.html");
    exit();
  } else {
    echo "送信失敗しました。";
  }
?>