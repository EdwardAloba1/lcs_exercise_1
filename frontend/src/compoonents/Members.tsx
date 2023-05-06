//@ts-nocheck
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
    commitee?: commmitee[];
    subcomitee?: subcommittee[];
  };

  type commmitee = {
    name: string;
    leadership?: string;
    rank: string;
  }

  type subcommittee = {
    name: string;
    leadership: string;
    rank: string;

  }


  var data: CommiteeData[] = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  let committeeMap = new Map<string, string>();
  let subCommitteeMap = new Map<string, string>();


  //This function created a map for all of the committee/subcommitee abreviations and the corresponding name
  const createCommitteMap = () => {
    for(let i=0; i<MemberData?.committees?.committee.length; i++){
      const committee = MemberData?.committees?.committee

      if(committee[i].hasOwnProperty("subcommittee")){
        for(let j=0;j<committee[i]?.['subcommittee'].length;j++){
        const subcomiteeName = committee[i]?.['subcommittee'][j]?.['subcommittee-fullname']
        subCommitteeMap.set(committee[i]?.['subcommittee'][j]?.['@subcomcode'], subcomiteeName)
        console.log(subCommitteeMap)
        }
      }
      committeeMap.set(committee[i]?.["@comcode"],committee[i]?.["committee-fullname"])
    }
  }

  //This function returns the name of the subcommitte when given in abbreviated form
  const getSubcommittees = (committeeAssignments: any) => {
    
    var SubcommitteeData: subcommittee[] = [];

    for(let i=0; i<committeeAssignments?.['subcommittee']?.length; i++){

      SubcommitteeData.push({
        name: subCommitteeMap.get(committeeAssignments?.['subcommittee'][i]?.["@subcomcode"]),
        rank: committeeAssignments?.['subcommittee'][i]?.["@rank"],
        leadership: committeeAssignments?.['subcommittee'][i]?.["@leadership"]
      })

    }

    return SubcommitteeData

  }

    //This function returns the name of the committe when given in abbreviated form
  const getCommittees = (committeeAssignments: any) => {
    var ComitteeData: commmitee[] = [];

    for(let i=0; i<committeeAssignments?.['committee'].length; i++){

      ComitteeData.push({
        name: committeeMap.get(committeeAssignments?.['committee'][i]?.["@comcode"]),
        rank: committeeAssignments?.['committee'][i]?.["@rank"],
        leadership: committeeAssignments?.['committee'][i]?.["@leadership"]
      })

    return ComitteeData
  }
}

  // Push all member data into memberInfo structure
  function pushData(members:any){

    var tempCommittee: commmitee[] = [];
    var tempSubcommittee: subcommmitee[] = [];

    createCommitteMap()

    for(let i=0; i<members.length; i++){
      
      tempCommittee = getCommittees(members[i]?.['committee-assignments'])
      tempSubcommittee = getSubcommittees(members[i]?.['committee-assignments'])
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
        swornDate: members[i]?.['member-info']?.['sworn-date']?.['#text'],
        commitee: tempCommittee,
        subcomitee : tempSubcommittee
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


const inputText = (
  <div>
    <InputText value={filter} placeholder={`Search Name...`} type="text" onChange={handleFilter} />
  </div>
);


const rowExpansionTemplate = (rowData: any) => {
      

  console.log(rowData)
  //console.log(filteredData)

  return (
      <div className="orders-subtable">
          <h1 className="mb-3">Committees </h1>
          <DataTable value={rowData?.commitee} responsiveLayout="scroll">
              <Column field="name" sortable header="Commitee Name"></Column>
              <Column field="rank" sortable header="Rank"></Column>
              <Column field="leadership" sortable header="Leadership Position"></Column>


          </DataTable>
          <h1 className="mb-3">Subcommittees </h1>
          <DataTable value={rowData?.subcomitee} responsiveLayout="scroll">
          <Column field="name" sortable header="Commitee Name"></Column>
              <Column field="rank" sortable header="Rank"></Column>
              <Column field="leadership" sortable header="Leadership Position"></Column>
              
          </DataTable>
      </div>
  );
};

//Return Members Table
  return (
    
    <div >
      <div>
    
      <DataTable  onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll" rowExpansionTemplate={rowExpansionTemplate} expandedRows={expandedRows} datakey="" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " value={filteredData} selectionMode="single"  header = {inputText}  showGridlines paginator stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100rem' }}>
        <Column expander={true} style={{ width: '5rem' }} />
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