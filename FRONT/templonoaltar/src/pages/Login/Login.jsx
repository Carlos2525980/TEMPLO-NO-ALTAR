import React, { useEffect } from "react";
import style from "./Login.module.css";
import img from "../../assets/perfil.png";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Correção: Seletor com "#" e "click" corrigido
    $("#loginEntrar").click(function (e) {
      e.preventDefault(); // Evita o recarregamento da página

      const usuario = $("#usuario").val();
      const senha = $("#senha").val();

      if (usuario === "admin" && senha === "123456") {
        $("#message")
          .text("Login bem-sucedido!")
          .removeClass("error")
          .addClass("success");

        setTimeout(() => {
          //manda para pagina home
          navigate("/home");
        }, 1000);
      } else {
        $("#message")
          .text("Usuário ou senha incorretos.")
          .removeClass("success")
          .addClass("error");
      }
    });

    // Permitir Enter para fazer login
    $("#usuario, #senha").keypress(function (e) {
      if (e.which === 13) {
        // Código da tecla Enter
        $("#loginEntrar").click();
      }
    });
  }, []);

  return (
    <div className={style.caixa}>
      <img src={img} className={style.perfil} alt="Perfil" />

      <form>
        <input
          type="text"
          id="usuario"
          placeholder="Digite seu usuário"
          className={style.usuario}
          required
        />
        <input
          type="password"
          id="senha"
          placeholder="Digite sua senha"
          className={style.senha}
          required
        />
        <button id="loginEntrar" className={style.BOTAO}>
          ENTRAR
        </button>
        <div id="message" className={style.message}></div>
      </form>
    </div>
  );
};

export default Login;
