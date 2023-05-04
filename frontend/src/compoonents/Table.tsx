import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown } from 'primereact/dropdown';
import { ListBox } from 'primereact/listbox';


import './DataTable.css';



const Table = ({memberInfo}: any) => {

  type TableData = {
    party: string;
    name: string;
    state: string;
    district: string;
    townname: string
  };

  const getMemberName = (member: any): string => {
    return member?.['member-info']?.["official-name"] || '';
  };

  const getMemberState = (member: any): string => {
    return member?.['member-info']?.['state']?.['state-fullname'];
  };
  
  var data: TableData[] = [
   
  ];
  
  function pushData(members:any){
    for(let i=0; i<members.length; i++){

      //console.log(memberInfo.map((s) => getMemberState(s))); //use i instead of 0
      data.push({party: members[i]?.['member-info']?.["party"], 
        name: members[i]?.['member-info']?.["official-name"] , 
        state: members[i]?.['member-info']?.['state']?.['state-fullname'],
        district: members[i]?.['member-info']?.['district'],
        townname: members[i]?.['member-info']?.['townname'] })
      
  }
  }


  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const [globalFilterValue, setGlobalFilterValue] = useState('');

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

  const columns = [
    {field: 'name', header: 'Name'},
    {field: 'party', header: 'Party'}
    
];

const [selectedColumns, setSelectedColumns] = useState(data);

const onColumnToggle = (event: any) => {
  console.log("column ckech")

    let selectedColumns = event.value;
    let orderedSelectedColumns = filteredData.filter(col => selectedColumns.some((sCol: any) => sCol.field === col?.["name"]));
    setSelectedColumns(orderedSelectedColumns);
}

const onRowSelect = (event: any) => {
  console.log(event)
  alert(
    `Name: ${event.data.name} `+'\n'+
    `State: ${event.data.state}`+'\n'+
    `Party: ${event.data.party}`+'\n'+
    `District: ${event.data.district}`+'\n'+
    `Town Name: ${event.data.townname}` 
  )
}
  
  return (
    
    <div >
      
      <div>
      <Dropdown value={filteredData} options={columns} optionLabel="header" onChange={onColumnToggle} style={{width:'40em'}}/>
      </div>
      <InputText  
      style={{border:'1px solid #ff0000'}} value={filter} placeholder={`Search...`} type="text" onChange={handleFilter} 
      />
      
      <div>
      <DataTable value={filteredData} selectionMode="single"  onRowSelect={onRowSelect} showGridlines paginator stripedRows rows={25} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '75rem' }}>
        <Column field="name" sortable header="Name"></Column>
        <Column field="state" sortable header="State"></Column>
        <Column field="party" sortable header="Party"></Column>
        <Column field="district" sortable header="District"></Column>
        <Column field="townname" sortable header="Town Name"></Column>

      </DataTable>
      </div>
    </div>
  );
};

export default Table;