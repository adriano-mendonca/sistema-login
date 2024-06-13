import React from "react";

const StatusColumnFilter = ({ column: { filterValue, setFilter } }) => {
  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "Aprovado", label: "Aprovado" },
    { value: "Pendente", label: "Pendente" },
    { value: "Rejeitado", label: "Rejeitado" },
  ];

  return (
    <select
      className="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusColumnFilter;
