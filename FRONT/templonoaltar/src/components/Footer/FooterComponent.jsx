import React from 'react';
import styles from "./footer.module.css";

const FooterComponent = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <p className={styles.footercoment}>© Templo no Altar. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
