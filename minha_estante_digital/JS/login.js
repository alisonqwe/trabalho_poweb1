export function inicializarLogin() {

  const btnLogin = document.getElementById("btnLogin");

  if (!btnLogin) return;

  btnLogin.addEventListener("click", function () {

    const usuario = document.getElementById("usuario").value;

    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagemLogin");
    if (!usuario || !senha) {

      mensagem.textContent ="Preencha usuário e senha.";

      mensagem.style.color = "red";

      return;
    }
    if (usuario === "admin" && senha === "1234") {

      sessionStorage.setItem("logado", "true");

      localStorage.setItem("usuario", usuario);
      mensagem.textContent = "Login realizado com sucesso!";
      mensagem.style.color = "green";
      setTimeout(() => {
        location.reload();
      }, 500);


    } else {

      mensagem.textContent = "Usuário ou senha inválidos.";

      mensagem.style.color = "red";

    }

  });

}