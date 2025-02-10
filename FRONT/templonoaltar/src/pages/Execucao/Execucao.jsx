import React, { useEffect, useState } from "react";
import style from "./Execucao.module.css";
import api from "../../../../../API/services/api.js";
import $ from "jquery";


const Execucao = () => {

  $(document).ready(function () {
    $("#contagem").each(function (index) {
      $(this)
        .delay(200 * index)
        .animate({ top: "0", opacity: 1 }, 2000);
    });
  
  });
  const [users, setUsers] = useState([]);
  const [timers, setTimers] = useState({});
  const [loading, setLoading] = useState(true);

  // Função para buscar os usuários da API
  async function getUsers() {
    try {
      const timestamp = new Date().getTime(); // Evitar cache
      const usersFromApi = await api.get(`http://localhost:3000?_=${timestamp}`);
      
      // Pega apenas o último usuário
      const lastUser = usersFromApi.data[usersFromApi.data.length - 1];
      setUsers([lastUser]);  // Atualiza o estado com o último usuário
      
      // Inicializa os timers apenas se ainda não existirem
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        updatedTimers[lastUser.id] = {
          Primeiro_Duracao: { time: converterParaSegundos(lastUser.Primeiro_Duracao), finished: false },
          Segundo_Duracao: { time: converterParaSegundos(lastUser.Segundo_Duracao), finished: false },
          Terceiro_Duracao: { time: converterParaSegundos(lastUser.Terceiro_Duracao), finished: false },
          Quarto_Duracao: { time: converterParaSegundos(lastUser.Quarto_Duracao), finished: false },
        };
        return updatedTimers;
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  // 1º useEffect: Carrega os dados ao abrir a página
  useEffect(() => {
    getUsers();
  }, []);

  // Função para verificar se todos os eventos foram finalizados
  const todosEventosFinalizados = (timers) => {
    return Object.values(timers).every(userTimers =>
      Object.values(userTimers).every(event => event.finished)
    );
  };

  // Função para converter "HH:MM:SS" em segundos
  const converterParaSegundos = (tempo) => {
    if (!tempo) return 0;
    const [horas, minutos, segundos] = tempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  };

  // Função para formatar segundos em "HH:MM:SS"
  const formatarTempo = (segundosTotais) => {
    const horas = String(Math.floor(segundosTotais / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((segundosTotais % 3600) / 60)).padStart(2, "0");
    const segundos = String(segundosTotais % 60).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  // Função para iniciar a contagem regressiva
  const iniciarContagem = (userId, eventoKey) => {
    if (timers[userId][eventoKey].time > 0 && !timers[userId][eventoKey].finished) {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const novoTempo = prevTimers[userId][eventoKey].time - 1;

          if (novoTempo <= 0) {
            clearInterval(interval);
            alert(`O tempo do ${eventoKey.replace("_Duracao", "")} acabou!`);
            return {
              ...prevTimers,
              [userId]: {
                ...prevTimers[userId],
                [eventoKey]: { time: 0, finished: true },
              },
            };
          }

          return {
            ...prevTimers,
            [userId]: {
              ...prevTimers[userId],
              [eventoKey]: { ...prevTimers[userId][eventoKey], time: novoTempo },
            },
          };
        });
      }, 1000);
    }
  };

  // 2º useEffect: Atualiza o estado de loading somente após todos os eventos terminarem
  useEffect(() => {
    if (todosEventosFinalizados(timers)) {
      setLoading(false); // Finaliza o carregamento se todos os eventos forem finalizados
    }
  }, [timers]);  // Dependência de timers

  return (
    <div id="contagem" className={style.contagem}>
      <h1 className={style.titulo}>Execução de Eventos</h1>

      {loading ? (
        <p>Carregando eventos...</p>
      ) : (
        <div className={style.contagem2}>
          {users.map((user) => (
            <div key={user.id} className={style.label}>
              <p className={timers[user.id]?.Primeiro_Duracao.finished ? style.finalizado : ""}>
                {user.Primeiro_Evento}
              </p>
              <p className={timers[user.id]?.Segundo_Duracao.finished ? style.finalizado : ""}>
                {user.Segundo_Evento}
              </p>
              <p className={timers[user.id]?.Terceiro_Duracao.finished ? style.finalizado : ""}>
                {user.Terceiro_Evento}
              </p>
              <p className={timers[user.id]?.Quarto_Duracao.finished ? style.finalizado : ""}>
                {user.Quarto_Evento}
              </p>
            </div>
          ))}

          {users.map((user) => (
            <div key={user.id} className={style.informacao}>
              <p className={timers[user.id]?.Primeiro_Duracao.finished ? style.finalizado : ""}>
                {formatarTempo(timers[user.id]?.Primeiro_Duracao.time || 0)}
              </p>
              <p className={timers[user.id]?.Segundo_Duracao.finished ? style.finalizado : ""}>
                {formatarTempo(timers[user.id]?.Segundo_Duracao.time || 0)}
              </p>
              <p className={timers[user.id]?.Terceiro_Duracao.finished ? style.finalizado : ""}>
                {formatarTempo(timers[user.id]?.Terceiro_Duracao.time || 0)}
              </p>
              <p className={timers[user.id]?.Quarto_Duracao.finished ? style.finalizado : ""}>
                {formatarTempo(timers[user.id]?.Quarto_Duracao.time || 0)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className={style.botoes}>
        {users.map((user) => (
          <div key={user.id}>
            <button
              className={`${style.iniciar} ${timers[user.id]?.Primeiro_Duracao.finished ? style.finalizado : ""}`}
              onClick={() => iniciarContagem(user.id, "Primeiro_Duracao")}
              disabled={timers[user.id]?.Primeiro_Duracao.finished}
            >
              INICIAR {user.Primeiro_Evento}
            </button>
            <button
              className={`${style.iniciar} ${timers[user.id]?.Segundo_Duracao.finished ? style.finalizado : ""}`}
              onClick={() => iniciarContagem(user.id, "Segundo_Duracao")}
              disabled={timers[user.id]?.Segundo_Duracao.finished}
            >
              INICIAR {user.Segundo_Evento}
            </button>
            <button
              className={`${style.iniciar} ${timers[user.id]?.Terceiro_Duracao.finished ? style.finalizado : ""}`}
              onClick={() => iniciarContagem(user.id, "Terceiro_Duracao")}
              disabled={timers[user.id]?.Terceiro_Duracao.finished}
            >
              INICIAR {user.Terceiro_Evento}
            </button>
            <button
              className={`${style.iniciar} ${timers[user.id]?.Quarto_Duracao.finished ? style.finalizado : ""}`}
              onClick={() => iniciarContagem(user.id, "Quarto_Duracao")}
              disabled={timers[user.id]?.Quarto_Duracao.finished}
            >
              INICIAR {user.Quarto_Evento}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Execucao;
