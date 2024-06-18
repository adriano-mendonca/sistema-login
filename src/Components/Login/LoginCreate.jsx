import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Buttton";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../../Helper/Error";
import styles from "./LoginForm.module.css";

const LoginCreate = () => {
  const name = useForm();
  const email = useForm("email");
  const password = useForm();
  const [tipo, setTipo] = React.useState(null);
  const [radio, setRadio] = React.useState(null);

  const { loading, error, request } = useFetch();

  function handleRadio({ target }) {
    console.log(target.value);
    setRadio(target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    const { url, options } = USER_POST(
      {
        name: name.value,
        email: email.value,
        password: password.value,
        tipo: tipo,
        aprovador: radio,
      },
      token
    );
    const { response, json } = await request(url, options);
    if (response.ok) {
      name.setValue("");
      email.setValue("");
      password.setValue("");
      setTipo(0);
    }
  }

  return (
    <section className={styles.login + " animeLeft container"}>
      <h1 className="title">Cadastrar Usuário</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="text" name="password" {...password} />
        <label htmlFor="centro">Tipo de Usuário</label>
        <select
          name="centro"
          id="centro"
          aria-placeholder="Selecione um Tipo"
          className={styles.select}
          defaultValue={0}
          required
          onChange={({ currentTarget }) => setTipo(currentTarget.value)}
        >
          <option value="0" disabled className={styles.option}>
            Selecione o Tipo
          </option>
          <option value="1" className={styles.option}>
            Administrador
          </option>
          <option value="2" className={styles.option}>
            Comum
          </option>
        </select>
        <div className={styles.containerRadio}>
          <label htmlFor="aprovador">Aprovador ?</label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="aprovador"
              id="apv1"
              value={true}
              onChange={handleRadio}
            />
            Sim
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="aprovador"
              id="apv2"
              value={false}
              onChange={handleRadio}
            />
            Não
          </label>
        </div>
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
