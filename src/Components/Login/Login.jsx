import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserContext from "../../UserContext";
import styles from "./Login.module.css";
import LoginCreate from "./LoginCreate";
import { Head } from "../Head";
import NotFound from "../NotFound";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/" />;
  return (
    <section className={styles.login}>
      <Head />
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
