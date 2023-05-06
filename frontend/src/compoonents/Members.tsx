import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";


const Members = ({MemberData}: any) => {
  
  const memberInfo = MemberData?.members?.member || []
  type CommiteeData = {
    party: string;
    name: string;
    state: string;
    district: string;
    townname: string;
    priorCongress: string;
    phone: string;
    officeLocation: string;
    electedDate: string;
    swornDate: string;
  };
  
  var data: CommiteeData[] = [];
  const [currentPage, setCurrentPage] = useState(1);

  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  
  
  // Push all member data into memberInfo structure
  function pushData(members:any){
    for(let i=0; i<members.length; i++){

      data.push({party: members[i]?.['member-info']?.["party"], 
        name: members[i]?.['member-info']?.["official-name"] , 
        state: members[i]?.['member-info']?.['state']?.['state-fullname'],
        district: members[i]?.['member-info']?.['district'],
        townname: members[i]?.['member-info']?.['townname'] ,
        priorCongress: members[i]?.['member-info']?.['prior-congress'],
        phone: members[i]?.['member-info']?.['phone'],
        officeLocation: 
        "Building: " + members[i]?.['member-info']?.['office-building'] + '\n' +
        "Building Room: " + members[i]?.['member-info']?.['office-room'] + "\n" +
        "Zip Code: " + members[i]?.['member-info']?.['office-zip'] + "\n",
        electedDate: members[i]?.['member-info']?.['elected-date']?.['#text'],
        swornDate: members[i]?.['member-info']?.['sworn-date']?.['#text']

      })
    }
        
  }
  
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
  
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };


const dialogFuncMap = {
  'displayBasic': setDisplayBasic,
}

const onClick = ( event:any) => {
  dialogFuncMap["displayBasic"](true);
  console.log(event.data.name)
  if (position) {
      setPosition(position);
  }
 
}

//To-do ( add drop down for members)
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

const inputText = (
  <div>
    <InputText value={filter} placeholder={`Search Name...`} type="text" onChange={handleFilter} />
  </div>
);
//Return Members Table
  return (
    
    <div >
      <div>
    
      <DataTable  responsiveLayout="scroll" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " value={filteredData} selectionMode="single"  header = {inputText} onRowSelect={onClick} showGridlines paginator stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100rem' }}>
      
        <Column field="name" sortable  header="Name"></Column>
        <Column field="electedDate" sortable header="Elected Date"></Column>
        <Column field="swornDate" sortable header="Sworn Date"></Column>
        <Column field="party" sortable header="Party"></Column>
        <Column field="state" sortable header="State"></Column>
        <Column field="district" sortable header="District"></Column>
        <Column field="townname" sortable header="Town Name"></Column>
        <Column field="priorCongress" sortable header="Prior Congress"></Column>
        <Column field="phone" sortable header="Phone Number"></Column>
        <Column field="officeLocation" sortable header="Location"></Column>
        
      </DataTable>
      </div>
    </div>
  );
};

export default Members;