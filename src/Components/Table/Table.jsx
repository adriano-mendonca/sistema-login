import React from "react";
import { useFilters, useTable } from "react-table";
import StatusColumnFilter from "../ColumnFilter/StatusColumnFilter";
import { CONTA_GET, STATUS_POST } from "../../Api";
import UserContext from "../../UserContext";

const Table = ({ data }) => {
  const [tableData, setTableData] = React.useState(data);
  const [tempStatus, setTempStatus] = React.useState({});
  const { data: userData } = React.useContext(UserContext);

  const statusMap = {
    Aprovado: 1,
    Pendente: 2,
    Rejeitado: 3,
  };

  const reverseStatusMap = {
    1: "Aprovado",
    2: "Pendente",
    3: "Rejeitado",
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
    if (token) {
      const { url, options } = STATUS_POST(token, body);
      const response = await fetch(url, options);
      const json = await response.json();
    }

    if (rowToUpdate) {
      rowToUpdate.status = reverseStatusMap[parseInt(newStatus, 10)];
      setTableData(newData);
    }
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
              `https://apicontas.megalinkpiaui.com.br/files/` +
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
            return rowValue !== undefined
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
            <select
              className="select"
              value={
                tempStatus[row.index] ?? statusMap[row.original.status] ?? ""
              }
              onChange={(e) => handleStatusChange(row.index, e.target.value)}
            >
              <option value="1">Aprovado</option>
              <option value="2">Pendente</option>
              <option value="3">Rejeitado </option>
            </select>
            {userData.name === row.original.usuario_aprovador ? (
              <button className="button" type="submit">
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
