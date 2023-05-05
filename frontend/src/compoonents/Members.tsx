import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { BlockUI } from 'primereact/blockui';
import { Panel } from 'primereact/panel';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { VirtualScroller } from 'primereact/virtualscroller';
import { Paginator } from 'primereact/paginator';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
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
  
  const getMemberName = (member: any): string => {
    return member?.['member-info']?.["official-name"] || '';
  };

  const getMemberState = (member: any): string => {
    return member?.['member-info']?.['state']?.['state-fullname'];
  };
  
  var data: CommiteeData[] = [
   
  ];
  
  function pushData(members:any){
    for(let i=0; i<members.length; i++){

      //console.log(memberInfo.map((s) => getMemberState(s))); //use i instead of 0
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


  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
});
  
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

const [displayBasic, setDisplayBasic] = useState(false);
const [position, setPosition] = useState('center');

const dialogFuncMap = {
  'displayBasic': setDisplayBasic,
}

const onClick = ( event:any) => {
  dialogFuncMap["displayBasic"](true);
  console.log(event.data.name)
  if (position) {
      setPosition(position);
  }
  return (
    <div>
    <Dialog header="Headr" keepInViewport visible={displayBasic} style={{ width: '100vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
    Testing
    </Dialog>
    </div>
);
}

const onHide = (name: any) => {
  dialogFuncMap["displayBasic"](false);
}

const renderFooter = (name: any) => {
  return (
    
      <div>  
        <div>tested</div>
        <Button label="Close" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
      </div>
  );
}

const [blockedPanel, setBlockedPanel] = useState<boolean>(true);
const [blockedDocument, setBlockedDocument] = useState<boolean>(false);

useEffect(() => {
    if(blockedDocument){
        setTimeout(() => {
            setBlockedDocument(true);
        }, 3000);
    }
}, [blockedDocument])

const blockDocument = () => {
    setBlockedDocument(true);
}

const blockPanel = () => {
    setBlockedPanel(true);
}

const unblockPanel = () => {
    setBlockedPanel(false);
}

const dropdownOptions = [
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 50, value: 50 }
];

const onGlobalFilterChange = (event: any) => {
  const value = event.target.value;
  let _filters = { ...filters };
  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
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
const [visibleColumns, setVisibleColumns] = useState(columns);

const header = (event: any) => {
  console.log("test")
  
}
const inputText = (
  <div>
    <InputText value={filter} placeholder={`Search Name...`} type="text" onChange={handleFilter} />
  </div>
);
const [cities, setCities] = useState<any>([]);

const onCityChange = (e: { value: any, checked: boolean }) => {
  let selectedCities = [...cities];

  if (e.checked)
      selectedCities.push(e.value);
  else
      selectedCities.splice(selectedCities.indexOf(e.value), 1);

  setCities(selectedCities);
}

  return (
    
    <div >
      
      <div>
      
      <Dialog header="{header}" keepInViewport visible={displayBasic} style={{ width: '100vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
    Testing
    </Dialog>
    
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