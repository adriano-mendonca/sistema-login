import React from "react";
import { useFilters, useTable } from "react-table";
import StatusColumnFilter from "../ColumnFilter/StatusColumnFilter";
import { CONTA_GET, STATUS_POST } from "../../Api";
import UserContext from "../../UserContext";
import useFetch from "../../Hooks/useFetch";

const Table = ({ data }) => {
  const [tableData, setTableData] = React.useState(data);
  const [tempStatus, setTempStatus] = React.useState({});
  const { data: userData } = React.useContext(UserContext);
  const { request } = useFetch();
  const statusMap = {
    Aprovado: 1,
    Pendente: 2,
    Rejeitado: 3,
    Pago: 4,
  };

  const reverseStatusMap = {
    1: "Aprovado",
    2: "Pendente",
    3: "Rejeitado",
    4: "Pago",
  };

  const handleStatusChange = (rowIndex, newStatus) => {
    setTempStatus((prev) => ({
      ...prev,
      [rowIndex]: newStatus,
    }));
  };

  async function handleStatus(event, rowIndex, idConta) {
    event.preventDefault();
    const newStatus = tempStatus[rowIndex];
    const newData = [...tableData];
    const rowToUpdate = newData.find((row) => row.id_conta === idConta);

    const body = {
      status: Number(newStatus),
      id_conta: idConta,
    };

    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { url, options } = STATUS_POST(token, body);
        const { json } = await request(url, options);
        if (rowToUpdate) {
          rowToUpdate.status = reverseStatusMap[parseInt(newStatus, 10)];
          setTableData(newData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick({ target }) {
    target.innerText = "";
    target.classList.add("loader");
    setTimeout(() => {
      target.innerText = "Salvar";
      target.classList.remove("loader");
    }, 1500);
  }

  const columns = React.useMemo(
    () => [
      {
        accessor: "id_conta",
        Header: "ID",
        Filter: "",
      },
      {
        accessor: "centro_custo",
        Header: "Centro de Custo",
        Filter: "",
      },
      {
        accessor: "fornecedor",
        Header: "Fornecedor",
        Filter: "",
      },
      {
        accessor: "valor",
        Header: "Valor",
        Filter: "",
      },
      {
        accessor: "descricao",
        Header: "Descrição",
        Filter: "",
      },
      {
        accessor: "observacao",
        Header: "Observação",
        Filter: "",
      },
      {
        accessor: "usuario_aprovador",
        Header: "Aprovador",
        Filter: "",
      },
      {
        accessor: "usuario_solicitante",
        Header: "Solicitante",
        Filter: "",
      },
      {
        accessor: "path",
        Header: "Anexo",
        Filter: "",
        Cell: ({ row }) => (
          <a
            href={
              `https://apicontas.megalinkpiaui.com.br:8443/files/` +
              row.original.path
            }
            className="anexo"
            target="_blank"
          >
            Files
          </a>
        ),
      },
      {
        accessor: "status",
        Header: "Status",
        Filter: StatusColumnFilter,
        filter: (rows, id, filterValue) => {
          if (!filterValue) return rows;
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined && rowValue !== null
              ? rowValue.includes(filterValue)
              : true;
          });
        },
        Cell: ({ row }) => (
          <form
            onSubmit={(e) => handleStatus(e, row.index, row.original.id_conta)}
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {statusMap[row.original.status] !== 4 &&
            (userData.name === row.original.usuario_aprovador ||
              userData.permission === 3) ? (
              <select
                className="select"
                value={
                  tempStatus[row.index] ?? statusMap[row.original.status] ?? ""
                }
                onChange={(e) => handleStatusChange(row.index, e.target.value)}
              >
                <option value="1">Aprovado</option>
                <option value="2">Pendente</option>
                <option value="3">Rejeitado</option>
                {userData.permission === 3 &&
                statusMap[row.original.status] === 1 ? (
                  <option value="4">Pago</option>
                ) : null}
              </select>
            ) : (
              <select
                className="select"
                value={
                  tempStatus[row.index] ?? statusMap[row.original.status] ?? ""
                }
                onChange={(e) => handleStatusChange(row.index, e.target.value)}
                disabled
              >
                <option value="1">Aprovado</option>
                <option value="2">Pendente</option>
                <option value="3">Rejeitado </option>
                <option value="4">Pago</option>
              </select>
            )}

            {userData.name === row.original.usuario_aprovador ||
            userData.permission === 3 ? (
              <button className="button" type="submit" onClick={handleClick}>
                Salvar
              </button>
            ) : (
              <button className="button" type="submit" disabled>
                Salvar
              </button>
            )}
          </form>
        ),
      },
    ],
    [tempStatus]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  if (userData === null) return null;
  
  return (
    <div className="animeLeft">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
