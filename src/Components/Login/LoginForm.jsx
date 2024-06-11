import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Buttton";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const email = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className="container animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/reset">
        Esqueceu a senha ?
      </Link>
    </section>
  );
};

export default LoginForm;
