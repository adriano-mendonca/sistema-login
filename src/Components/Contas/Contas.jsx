import React from "react";
import { CONTA_GET } from "../../Api";
import Table from "../Table/Table";

export const Contas = () => {
  const [contas, setContas] = React.useState(null);
  const dataContas = React.useMemo(() => contas, [contas]);

  React.useEffect(() => {
    async function getContas() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = CONTA_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setContas(json);
      }
    }
    getContas();
    
  }, []);

  if (contas === null) return null;
  return (
    <div className="tabela">
      <Table data={dataContas} />
    </div>
  );
};
