import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Assets/logo.svg?react";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data, userLogout, login } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Megalink - Home">
          <Logo className={styles.logop} />
        </Link>
        <div className="header-nav">
          {login ? (
            <Link to="/" className={styles.menu}>
              Home
            </Link>
          ) : null}
          {login ? (
            <Link to="/cadastro" className={styles.menu}>
              Cadastro
            </Link>
          ) : null}
        </div>
        {data && (
          <div className="header-nav">
            <Link className={styles.login} to="/">
              {data.name}
            </Link>
            <button className="exit" onClick={userLogout}>
              Sair
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
