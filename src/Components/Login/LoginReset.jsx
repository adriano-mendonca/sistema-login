import React from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Buttton";
import Error from "../../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import styles from "./LoginForm.module.css";
import { PASSWORD_RESET } from "../../Api";
import UserContext from "../../UserContext";

const LoginReset = () => {
  const password = useForm();
  const { loading, error, request } = useFetch();
  const { data } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && password.validate()) {
      const body = {
        email: data.email,
        password: password.value,
      };
      const { url, options } = PASSWORD_RESET(body, token);
      const { response, json } = await request(url, options);
    }
  }

  return (
    <section className={styles.login + " animeLeft container"}>
      <h1 className="title">Resetar Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha:"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Salvando...</Button>
        ) : (
          <Button>Salvar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginReset;
