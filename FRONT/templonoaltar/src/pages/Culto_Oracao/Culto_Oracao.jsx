import React, { useState, useRef } from "react";
import style from "./Styles.module.css";
import api from "../../../../../API/services/api.js";
import { useNavigate } from "react-router-dom";
import $ from "jquery";


const Culto_Oracao = () => {
  const navigate = useNavigate();

  
  $(document).ready(function () {
    $("#menu").each(function (index) {
      $(this)
        .delay(200 * index)
        .animate({ top: "0", opacity: 1 }, 1000);
    });
  
  });


  const executor = () => {
    // Limpar os dados da tela Execucao
    sessionStorage.removeItem("programacaoEvento");

    // Agora navega para a tela Execucao
    navigate("/Execucao");
  };

  const [horas, setHoras] = useState({
    evento1: "",
    evento2: "",
    evento3: "",
    evento4: "",
  });

  const inputPrimeiro = useRef();
  const inputPrimeiroduracao = useRef();
  const inputSegundo = useRef();
  const inputSegundoduracao = useRef();
  const inputTerceiro = useRef();
  const inputTerceiroduracao = useRef();
  const inputQuarto = useRef();
  const inputQuartoduracao = useRef();

  const formatarHora = (valor) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');
  
    // Limita a entrada para no máximo 6 dígitos (HHMMSS)
    if (valor.length > 6) {
      valor = valor.slice(0, 6);
    }
  
    // Adiciona os ":" para formatar como HH:MM:SS
    if (valor.length > 4) {
      valor = valor.replace(/(\d{2})(\d{2})(\d{1,2})/, '$1:$2:$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d{1,2})/, '$1:$2');
    }
  
    return valor;
  };
  
  const handleChange = (e, campo) => {
    const valorFormatado = formatarHora(e.target.value);
  
    setHoras((prevHoras) => ({
      ...prevHoras,
      [campo]: valorFormatado,
    }));
  };
  

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // "erro" ou "sucesso"

  async function createUsers() {
    const Primeiro_Evento = inputPrimeiro.current.value.trim();
    const Primeiro_Duracao = inputPrimeiroduracao.current.value.trim();
    const Segundo_Evento = inputSegundo.current.value.trim();
    const Segundo_Duracao = inputSegundoduracao.current.value.trim();
    const Terceiro_Evento = inputTerceiro.current.value.trim();
    const Terceiro_Duracao = inputTerceiroduracao.current.value.trim();
    const Quarto_Evento = inputQuarto.current.value.trim();
    const Quarto_Duracao = inputQuartoduracao.current.value.trim();

    // Verificar se algum campo está vazio
    if (
      !Primeiro_Evento ||
      !Primeiro_Duracao ||
      !Segundo_Evento ||
      !Segundo_Duracao ||
      !Terceiro_Evento ||
      !Terceiro_Duracao ||
      !Quarto_Evento ||
      !Quarto_Duracao
    ) {
      exibirMensagem("Erro: Todos os campos devem ser preenchidos!", "erro");
      return;
    }

    try {
      // Enviar dados para o servidor
      await api.post("http://localhost:3000", {
        Primeiro_Evento,
        Primeiro_Duracao,
        Segundo_Evento,
        Segundo_Duracao,
        Terceiro_Evento,
        Terceiro_Duracao,
        Quarto_Evento,
        Quarto_Duracao,
      });

      // Salvar os dados na sessão para utilizar na tela Execucao
      sessionStorage.setItem("programacaoEvento", JSON.stringify({
        Primeiro_Evento,
        Primeiro_Duracao,
        Segundo_Evento,
        Segundo_Duracao,
        Terceiro_Evento,
        Terceiro_Duracao,
        Quarto_Evento,
        Quarto_Duracao,
      }));

      exibirMensagem("Dados enviados com sucesso!", "sucesso");

      // Limpar todos os campos após o envio
      setHoras({
        evento1: "",
        evento2: "",
        evento3: "",
        evento4: "",
      });

      inputPrimeiro.current.value = "";
      inputPrimeiroduracao.current.value = "";
      inputSegundo.current.value = "";
      inputSegundoduracao.current.value = "";
      inputTerceiro.current.value = "";
      inputTerceiroduracao.current.value = "";
      inputQuarto.current.value = "";
      inputQuartoduracao.current.value = "";

      // Redirecionar para a tela Execucao
      executor();
    } catch (error) {
      exibirMensagem("Erro ao enviar os dados. Tente novamente.", "erro");
    }
  }

  function exibirMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    // Esconder a mensagem após 3 segundos
    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  return (
    <div id="menu" className={style.menu}>
      <p className={style.titulo_oracao}>CADASTRE A PROGRAMAÇÃO DO EVENTO</p>

      <form>
        <label>Primeiro Evento</label>
        <input
          type="text"
          placeholder="Digite o nome do Evento"
          ref={inputPrimeiro}
          className={style.padrao}
          required
        />
        <input
          type="text"
          value={horas.evento1}
          onChange={(e) => handleChange(e, "evento1")}
          maxLength="8"
          placeholder="HH:MM:SS"
          ref={inputPrimeiroduracao}
          className={style.padrao}
        />

        <label>Segundo Evento</label>
        <input
          type="text"
          placeholder="Ex: Dízimos e ofertas..."
          ref={inputSegundo}
          className={style.padrao}
          required
        />
        <input
          type="text"
          value={horas.evento2}
          onChange={(e) => handleChange(e, "evento2")}
          maxLength="8"
          placeholder="HH:MM:SS"
          ref={inputSegundoduracao}
          className={style.padrao}
          required
        />

        <label>Terceiro Evento</label>
        <input
          type="text"
          placeholder="Ex: Palavra..."
          ref={inputTerceiro}
          className={style.padrao}
        />
        <input
          type="text"
          value={horas.evento3}
          onChange={(e) => handleChange(e, "evento3")}
          maxLength="8"
          placeholder="HH:MM:SS"
          ref={inputTerceiroduracao}
          className={style.padrao}
          required
        />

        <label>Quarto Evento</label>
        <input
          type="text"
          placeholder="Ex: Informações..."
          ref={inputQuarto}
          className={style.padrao}
          required
        />
        <input
          type="text"
          value={horas.evento4}
          onChange={(e) => handleChange(e, "evento4")}
          maxLength="8"
          placeholder="HH:MM:SS"
          ref={inputQuartoduracao}
          className={style.padrao}
          required
        />

        <input
          type="button"
          value="SALVAR"
          className={style.botao}
          onClick={createUsers}
        />
      </form>

      {mensagem && (
        <div
          className={`${style.mensagem} ${
            tipoMensagem === "sucesso" ? style.sucesso : style.erro
          }`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default Culto_Oracao;
