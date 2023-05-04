import React, { useState } from "react";
import { useTable } from "react-table";
import '../App.css';
import 'reset-css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


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
      return a.state > b.state ? 1 : -1;
    } else if (sortDirection === "desc") {
      return a.state < b.state ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    const params = [item.name, item.state];
    var filtered: TableData[] = [
   
    ];
    for(let i=0; i<params.length; i++){
      filtered.push()
      params[i].toLowerCase().includes(filter.toLowerCase());
    }
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
    
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <input  
      style={{border:'1px solid #ff0000'}} placeholder={`Search...`} type="text" onChange={handleFilter} value={filter} 
      />
      <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" sortable header="name"></Column>
        <Column field="state" sortable header="state"></Column>
        <Column field="id" sortable header="id"></Column>
        </DataTable>



      
      <select name="Search" onChange={console.log} value={"h"}>
    <optgroup label="Search Options" >
      <option value="name">Name</option>
      <option value="Age">Age</option>
    </optgroup>
      </select>
      <style></style>
      <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
      <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
      <table  border={1} style={{border: '1px solid'}}>
        <thead >
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("state")}>State</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
               <td>{item.name}  </td>
              <td>{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(Array(pageCount), (x, index) => (
          <button color="red" style={{borderRadius: 4,border: '1px solid'}} key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default Table;