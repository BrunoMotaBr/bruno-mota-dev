<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
  $nome = htmlspecialchars($_POST["nome"]);
  $email = htmlspecialchars($_POST["email"]);
  $mensagem = htmlspecialchars($_POST["mensagem"]);

  $to = "seuemail@dominio.com";
  $subject = "Contato do Portfólio - $nome";
  $body = "Nome: $nome\nEmail: $email\nMensagem:\n$mensagem";
  $headers = "From: $email";

  mail($to, $subject, $body, $headers);

  header("Location: index.html");
}
?>
