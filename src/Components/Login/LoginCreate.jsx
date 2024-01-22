import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Buttton";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../../Helper/Error";

const LoginCreate = () => {
  const username = useForm("email");
  const password = useForm("password");

  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
    });
    const { response } = await request(url, options);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="text" name="username" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
