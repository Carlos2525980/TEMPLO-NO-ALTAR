import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo2.png";
import usuario from "../../assets/usuario.png";

const HeaderComponent = () => {
  return (
    <header>
      <div className={styles.container}>
        <img src={logo} className={styles.logo}></img>
        <h1 className={styles.h1}>Templo no Altar</h1>
        <img src={usuario} className={styles.usuario}></img>
        <h2 className={styles.h2}>Usuário</h2>
      </div>
    </header>
  );
};

export default HeaderComponent;
