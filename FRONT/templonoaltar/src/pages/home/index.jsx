import "./style.css";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import quartaImg from "../../assets/Quarta.png";
import jovemImg from "../../assets/JOVEM.png";
import manhaImg from "../../assets/MANHA.png";
import noiteImg from "../../assets/NOITE.png";
import api from "../../../../../API/services/api.js";
import $ from "jquery";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Redireciona para as páginas
  const handleCultoOracaoClick = () => {
    navigate("/Culto_Oracao");
  };

  const handleJovernslick = () => {
    navigate("/Culto_Oracao");
  };

  const handleManhalick = () => {
    navigate("/Culto_Oracao");
  };
  const handleNoitelick = () => {
    navigate("/Culto_Oracao");
  };

  $(document).ready(function () {
    $(".quadrado").each(function (index) {
      $(this)
        .delay(200 * index)
        .animate({ top: "0", opacity: 1 }, 2000);
    });
    $(".lembretes").each(function (index) {
      $(this)
        .delay(200 * index)
        .animate({ top: "0", opacity: 1 }, 2000);
    });

    $("h1").each(function (index) {
      $(this)
        .delay(200 * index)
        .animate({ top: "0", opacity: 1 }, 800);
    });
  });

  // Função para buscar os usuários da API
  async function getUsers() {
    try {
      const response = await api.get("http://localhost:3000");
      const dados = response.data;

      // Verificar se existem dados antes de atualizar o estado
      if (dados && dados.length > 0) {
        const ultimoDado = dados[dados.length - 1]; // Pega apenas o último dado
        setUsers([ultimoDado]); // Atualiza o estado com apenas o último dado
      } else {
        setUsers([]); // Caso não haja dados, define users como um array vazio
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  // Função para excluir usuários e atualizar a lista
  async function deleteUsers(id) {
    try {
      await api.delete(`http://localhost:3000/${id}`);
      // Atualiza a lista após exclusão
      getUsers();
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  }

  // Carrega os dados ao abrir a página
  useEffect(() => {
    getUsers();
  }, []); // Carrega os dados uma vez quando o componente for montado

  return (
    <div>
      <div className="altais">
        <div className="titulo2">
          <h1>Paz no Senhor! Como quer começar?</h1>
        </div>

        <div className="quadrado" id="#bloco1">
          <button
            className="contato"
            id="oracao"
            onClick={handleCultoOracaoClick}
          >
            CULTO DE ORAÇÃO
            <img src={quartaImg} className="BTF" alt="Culto de Oração" />
          </button>

          <button className="CULTO" onClick={handleJovernslick}>
            CULTO DE JOVENS
            <img src={jovemImg} className="jv" alt="Culto de Jovens" />
          </button>

          <button className="CULTO_ORACAO" onClick={handleManhalick}>
            CULTO DOMINGO MANHÃ
            <img src={manhaImg} className="MANHA" alt="Culto Domingo Manhã" />
          </button>

          <button className="CULTO" onClick={handleNoitelick}>
            CULTO DOMINGO NOITE
            <img src={noiteImg} className="NOITE" alt="Culto Domingo Noite" />
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <p></p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="lembretes">
            <div className="marcacao-recentes">
              <div className="marcacao">
                Marcações Recentes
                <button
                  onClick={() => deleteUsers(user.id)}
                  className="cadastrar"
                >
                  EXCLUIR
                </button>
              </div>

              <div className="discricao">
                <table className="tabela">
                  <tbody>
                    <tr>
                      <th>
                        <p className="ev">Primeiro Evento:</p>
                      </th>
                      <td>
                        <span>{user.Primeiro_Evento}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <p className="ev">Segundo Evento:</p>
                      </th>
                      <td>
                        <span>{user.Segundo_Evento}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <p className="ev">Terceiro Evento:</p>
                      </th>
                      <td>
                        <span>{user.Terceiro_Evento}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <p className="ev">Quarto Evento:</p>
                      </th>
                      <td>
                        <span>{user.Quarto_Evento}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="calendario">
              <div className="marcacao2">
                Duração de Eventos
                <button className="cadastrar1">VERIFICAR</button>
              </div>
              <table className="tabela2">
                <tbody>
                  <tr>
                    <th>
                      <p className="ev">1.º Evento Duração:</p>
                    </th>
                    <td>
                      <span>{user.Primeiro_Duracao}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <p className="ev">2.º Evento Duração:</p>
                    </th>
                    <td>
                      <span>{user.Segundo_Duracao}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <p className="ev">3.º Evento Duração:</p>
                    </th>
                    <td>
                      <span>{user.Terceiro_Duracao}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <p className="ev">4.º Evento Duração:</p>
                    </th>
                    <td>
                      <span>{user.Quarto_Duracao}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="proximos-eventos">
              <div className="marcacao3">
                Próximos Eventos
                <button className="cadastrar">VERIFICAR</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
