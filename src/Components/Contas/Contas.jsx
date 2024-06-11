import React from "react";
import styles from "./Contas.module.css";
import UserContext from "../../UserContext";
import { CONTA_GET } from "../../Api";

export const Contas = () => {
  const { data } = React.useContext(UserContext);
  const [contas, setContas] = React.useState(null);
  const dataContas = React.useMemo(() => contas, [])
  const columns = React.useMemo(() => [])


  React.useEffect(() => {
    async function getContas() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = CONTA_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)
        setContas(json);
      }
    }
    getContas();
  }, []);

  return <div>teste 123</div>;
};
