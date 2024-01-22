import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Assets/logo.svg?react";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link
          className={styles.logo}
          to="/home"
          aria-label="MegaHistory - Home"
        >
          <Logo className={styles.logop} />
        </Link>
        {data && (
          <div className="header-nav">
            <Link className={styles.login} to="/home">
              {data.username}
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
