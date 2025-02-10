import React from "react";
import styles from "./Content.module.css";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/inicio.png";
import logo4 from "../../assets/evento.png";
import logo5 from "../../assets/config.png";
import { useNavigate } from "react-router-dom";

const ContentComponent = () => {


  const navigate = useNavigate(); // Inicializando o hook useNavigate

  // Função para navegar para a página inicial
  const handleHomeClick = () => {
    navigate("/"); // Redireciona para a página inicial (ou index)
  };
  return (
    <content className={styles.content}>
      <div className={styles.caixa1}>
        <img src={logo2} className={styles.logo2}></img>
        <p className={styles.titulo}>Templo no Altar</p>
      </div>
      <button className={styles.caixa2} onClick={handleHomeClick}>
        <img src={logo3} className={styles.logo3}></img>
        <p className={styles.inicio}>Início</p>
      </button>
      <button className={styles.caixa3}>
        <img src={logo4} className={styles.logo4}></img>
        <p className={styles.inicio2}>Eventos</p>
      </button>

      <button className={styles.caixa4}>
        <img src={logo5} className={styles.logo5}></img>
        <p className={styles.inicio3}>Config</p>
      </button>
    </content>
  );
};

export default ContentComponent;
