import React, { useState } from "react";
import { useTable } from "react-table";




const Table = ({memberInfo}: any) => {

  type TableData = {
    id: number;
    name: string;
    state: string;
  };

  const getMemberName = (member: any): string => {
    return member?.['member-info']?.namelist || '';
  };

  const getMemberState = (member: any): string => {
    return member?.['member-info']?.['state']?.['state-fullname'];
  };
  
  var data: TableData[] = [
   
  ];
  
  function pushData(members:any){
    for(let i=0; i<members.length; i++){

      //console.log(memberInfo.map((s) => getMemberState(s))); //use i instead of 0
      data.push({id: i, 
        name: members[i]?.['member-info']?.namelist , 
        state: members[i]?.['member-info']?.['state']?.['state-fullname'] })
      
  }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");

  //console.log(memberInfo)
  let list = memberInfo.map((member: any) => getMemberName(member))
  
  console.log(memberInfo)

  let test = new Set(list)
  //console.log(Array.from(test) + "Testinggggg")
  pushData(memberInfo)

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
    <div >
      <input type="text" onChange={handleFilter} value={filter} />
      <style>
      </style>
      <table  style={{border: '1px solid'}}>
        
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("state")}>State</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.state}</td>
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