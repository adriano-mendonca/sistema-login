import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserContext from "../../UserContext";
import styles from "./Login.module.css";
import LoginCreate from "./LoginCreate";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/home" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
