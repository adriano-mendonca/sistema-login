import React from "react";
import Input from "../Forms/Input";
import { Head } from "../Head";
import Button from "../Forms/Buttton";
import UserContext from "../../UserContext";
import useForm from "../../Hooks/useForm";
import {
  APROVADOR_GET,
  CENTRO_GET,
  CONTA_POST,
  FORNECEDOR_GET,
} from "../../Api";
import styles from "./Cadastro.module.css";
import useFetch from "../../Hooks/useFetch";
import Error from "../../Helper/Error";

const Cadastro = () => {
  const [fornecedores, setFornecedores] = React.useState(null);
  const [aprovadores, setAprovadores] = React.useState(null);
  const [fornecedor, setFornecedor] = React.useState(null);
  const [aprovador, setAprovador] = React.useState(null);
  const [centros, setCentros] = React.useState(null);
  const [centroCusto, setCentroCusto] = React.useState(null);
  const valor = useForm();
  const descricao = useForm();
  const observacao = useForm();
  const solicitante = useForm();
  const [file, setFile] = React.useState();
  const { data } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleFile(event) {
    setFile(event.target.files[0]);
  }

  async function PostProduto(
    centro,
    fornecedor,
    valor,
    descricao,
    observacao,
    aprovador,
    solicitante
  ) {
    const body = {
      centro,
      fornecedor,
      valor,
      descricao,
      observacao,
      aprovador,
      solicitante,
    };
    try {
      const token = window.localStorage.getItem("token");
      const { url, options } = CONTA_POST(token, body, file);
      const { response, json } = await request(url, options);
      // if(response.ok) { colocar um retorno visual}
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      valor.validate() &&
      descricao.validate() &&
      observacao.validate() &&
      file !== undefined
    ) {
      PostProduto(
        centroCusto,
        fornecedor,
        valor.value,
        descricao.value,
        observacao.value,
        Number(aprovador),
        data.id
      );

      valor.setValue("");
      descricao.setValue("");
      observacao.setValue("");
      solicitante.setValue("");
    }
  }

  async function getFornecedores() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { url, options } = FORNECEDOR_GET(token);
      const { json } = await request(url, options);
      setFornecedores(json);
    }
  }

  async function getAprovadores() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { url, options } = APROVADOR_GET(token);
      const { json } = await request(url, options);
      setAprovadores(json);
    }
  }

  async function getCentro() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { options, url } = CENTRO_GET(token);
      const { json } = await request(url, options);
      setCentros(json);
    }
  }

  React.useEffect(() => {
    if (data) {
      solicitante.setValue(data.name);
    }
    getFornecedores();
    getAprovadores();
    getCentro();
  }, [data]);

  if (data === null) return null;

  return (
    <section className="animeLeft wrapper">
      <div className="content">
        <div className="container container-cadastro">
          <Head title={data.name} />
          <h1 className="title">Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="centro">Centro de Custos</label>
            <select
              name="centro"
              id="centro"
              aria-placeholder="Selecione um Centro de Custos"
              className={styles.select}
              defaultValue={1}
              required
              onChange={({ currentTarget }) =>
                setCentroCusto(currentTarget.value)
              }
            >
              <option value="1" disabled className={styles.option}>
                Selecione o Centro de Custo
              </option>
              {centros
                ? centros.map((centro) => (
                    <option
                      value={centro.descricao}
                      required
                      className={styles.option}
                      key={centro.id_centro_custo}
                    >
                      {centro.descricao}
                    </option>
                  ))
                : null}
            </select>
            <label htmlFor="fornecedores">Fornecedor</label>
            <select
              name="fornecedores"
              id="fornecedores"
              aria-placeholder="Selecione um Fornecedor"
              className={styles.select}
              defaultValue={1}
              required
              onChange={({ currentTarget }) =>
                setFornecedor(currentTarget.value)
              }
            >
              <option value="1" disabled className={styles.option}>
                Selecione o Fornecedor
              </option>
              {centros
                ? centros.map((centro) => (
                    <option
                      value={centro.descricao}
                      required
                      className={styles.option}
                      key={centro.id_centro_custo}
                    >
                      {centro.descricao}
                    </option>
                  ))
                : null}

              {fornecedores
                ? fornecedores.map((fornecedor) => (
                    <option
                      value={fornecedor.nome_razaosocial}
                      required
                      className={styles.option}
                      key={fornecedor.id_fornecedor}
                    >
                      {fornecedor.nome_razaosocial}
                    </option>
                  ))
                : null}
            </select>

            <Input
              className="input"
              label="Valor (apenas números)"
              type="number"
              name="valor"
              {...valor}
            />

            <Input
              className="input"
              label="Descrição"
              type="text"
              name="descricao"
              {...descricao}
            />
            <Input
              className="input"
              label="Observação"
              type="text"
              name="observacao"
              {...observacao}
            />
            <label htmlFor="aprovador">Aprovador</label>
            <select
              name="aprovador"
              id="aprovador"
              aria-placeholder="Selecione um Aprovador"
              className={styles.select}
              required
              defaultValue={1}
              onChange={({ currentTarget }) =>
                setAprovador(currentTarget.value)
              }
            >
              <option value="1" disabled className={styles.option}>
                Selecione um Aprovador
              </option>
              {aprovadores
                ? aprovadores.map((aprovador) => (
                    <option
                      value={aprovador.id}
                      required
                      className={styles.option}
                      key={aprovador.id}
                    >
                      {aprovador.nome}
                    </option>
                  ))
                : null}
            </select>

            <Input
              className="input"
              label="Solicitante"
              type="text"
              name="solicitante"
              disabled={true}
              {...solicitante}
            />

            <Input
              label="Anexo"
              type="file"
              name="file"
              onChange={handleFile}
            />

            {loading ? (
              <div className={styles.containerButton}>
                <Button disabled>Cadastrando...</Button>
              </div>
            ) : (
              <Button>Cadastrar</Button>
            )}
            <Error error={error} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cadastro;
