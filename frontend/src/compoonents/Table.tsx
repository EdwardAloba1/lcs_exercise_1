import React, { useState } from "react";

type TableData = {
  id: number;
  name: string;
  age: number;
};

const data: TableData[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 20 },
  { id: 4, name: "David", age: 35 },
  { id: 5, name: "Emily", age: 28 },
];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [filter, setFilter] = useState("");

  const sortedData = data.slice().sort((a, b) => {
    if (sortDirection === "asc") {
      return a.name > b.name ? 1 : -1;
    } else if (sortDirection === "desc") {
      return a.name < b.name ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  });

  const pageCount = Math.ceil(filteredData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <input type="text" onChange={handleFilter} value={filter} />
      <table>
        <thead>
          <tr>
            
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(Array(pageCount), (x, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;