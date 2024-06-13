import React from "react";
import Input from "../Forms/Input";
import { Head } from "../Head";
import Button from "../Forms/Buttton";
import UserContext from "../../UserContext";
import useForm from "../../Hooks/useForm";
import { APROVADOR_GET, CONTA_POST, FORNECEDOR_GET } from "../../Api";
import styles from "./Cadastro.module.css";

const Cadastro = () => {
  const [fornecedores, setFornecedores] = React.useState(null);
  const [aprovadores, setAprovadores] = React.useState(null);
  const [fornecedor, setFornecedor] = React.useState(null);
  const [aprovador, setAprovador] = React.useState(null);
  const centroCusto = useForm();
  const valor = useForm();
  const nf = useForm();
  const descricao = useForm();
  const observacao = useForm();
  const solicitante = useForm();
  const { loading, data } = React.useContext(UserContext);

  async function PostProduto(
    centro,
    fornecedor,
    valor,
    nf,
    descricao,
    observacao,
    aprovador,
    solicitante
  ) {
    const body = {
      centro,
      fornecedor,
      valor,
      nf,
      descricao,
      observacao,
      aprovador,
      solicitante,
    };
    const token = window.localStorage.getItem("token");
    const { url, options } = CONTA_POST(token, body);
    const response = await fetch(url, options);
    const json = await response.json();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      centroCusto.validate() &&
      valor.validate() &&
      nf.validate() &&
      descricao.validate() &&
      observacao.validate()
    ) {
      PostProduto(
        centroCusto.value,
        fornecedor,
        valor.value,
        nf.value,
        descricao.value,
        observacao.value,
        Number(aprovador),
        data.id
      );
    }
  }

  React.useEffect(() => {
    async function getFornecedores() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = FORNECEDOR_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setFornecedores(json);
      }
    }

    async function getAprovadores() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = APROVADOR_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setAprovadores(json);
      }
    }
    if (data) {
      solicitante.setValue(data.name);
    }
    getAprovadores();
    getFornecedores();
  }, [data]);

  if (data === null) return null;

  return (
    <section className="animeLeft wrapper">
      <div className="content">
        <div className="container container-cadastro">
          <Head title={data.name} />
          <h1 className='title'>Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <Input
              className="input"
              label="Centro de Custos"
              type="text"
              name="centro"
              {...centroCusto}
            />
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
              label="Valor"
              type="number"
              name="valor"
              {...valor}
            />
            <Input className="input" label="NF" type="text" name="nf" {...nf} />
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

            {loading ? (
              <Button disabled>Cadastrar</Button>
            ) : (
              <Button>Cadastrar</Button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cadastro;
