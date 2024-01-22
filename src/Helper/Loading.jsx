import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.containerLoading}>
      <p {...styles.glitch}>
        <span aria-hidden="true">Carregando...</span>
        Carregando...
        <span aria-hidden="true">Carregando...</span>
      </p>
    </div>
  );
};

export default Loading
