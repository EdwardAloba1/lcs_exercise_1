//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { DataTable, DataTableRowEvent,DataTableRowToggleEvent } from "primereact/datatable";
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

const Commitee = ({ MemberData }: any) => {

    const commiteeInfo = MemberData?.['committees']?.['committee'] || []

    //console.log(commiteeInfo[0])
    type CommiteeData = {

        name: string;
        type: string;
        subcommitee?: SubcomiteeData[]

    };

    type SubcomiteeData = {
        name: string
    }

    const getSubcomittees = (inputData: any) => {
        var subComitteeData: SubcomiteeData[] = [];

        for (let i = 0; i < inputData?.['subcommittee'].length; i++) {

            subComitteeData.push({
                name: inputData?.['subcommittee'][i]?.['subcommittee-fullname']
            }
            )
        }

        return subComitteeData
    };

    var data: CommiteeData[] = [];

    function pushData(commitee: any) {
        console.log("pushData")
        var sub: SubcomiteeData[] = [];
        for (let i = 0; i < commitee.length; i++) {
            if (commitee[i].hasOwnProperty("subcommittee")) {

                //console.log("SubCommitee: "+ commitee[i]?.['subcommittee'].length)

                sub = getSubcomittees(commitee[i])

                //console.log(sub)

                data.push({
                    name: commitee[i]?.['committee-fullname'],
                    subcommitee: sub,
                    type: commitee[i]?.['@type']
                })

            }


            else {
                data.push({
                    name: commitee[i]?.['committee-fullname'],
                    type: commitee[i]?.['@type']

                })
            }
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

    console.log(commiteeInfo)
    pushData(commiteeInfo)
    console.log(data)

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
        { field: 'name', header: 'Name' },
        { field: 'party', header: 'Party' }

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

    const onClick = (event: any) => {
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

    

    const blockDocument = () => {
        setBlockedDocument(true);
    }

    const blockPanel = () => {
        setBlockedPanel(true);
    }


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
            `Name: ${event.data.name} ` + '\n' +
            `State: ${event.data.state}` + '\n' +
            `Party: ${event.data.party}` + '\n' +
            `District: ${event.data.district}` + '\n' +
            `Town Name: ${event.data.townname}`
        )
    }
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const header = (event: any) => {
        console.log("test")

    }
    const inputText = (
        <div>
            <InputText value={filter} placeholder={`Search...`} type="text" onChange={handleFilter} />
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
    
    
    const allowExpansion = (rowData: CommiteeData) => {
        const rowLength = rowData?.subcommitee?.length
        if(rowLength!= undefined && rowLength>0){
            
            return true
        }
        console.log("Notx")
        return false ;
    };
    
    const rowExpansionTemplate = (rowData: any) => {
        console.log("eddie")

        console.log(rowData?.subcommitee)
        console.log(filteredData)

        return (
            <div className="orders-subtable">
                <h1 className="mb-3">Sub-Committees </h1>
                <DataTable value={rowData?.subcommitee} responsiveLayout="scroll">
                <Column field="name" sortable header="Sub-commitee Name"></Column>
                </DataTable>
            </div>
        );
    };

    const [expandedRows, setExpandedRows] = useState(null);
    
    return (

        <div >

            <div>

                
                <DataTable onRowToggle={(e) => setExpandedRows(e.data)} datakey="" expandedRows={expandedRows}  rowExpansionTemplate={rowExpansionTemplate}   responsiveLayout="scroll" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " value={filteredData} selectionMode="single" header={inputText}  showGridlines paginator stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100rem' }}>

                    
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="name" sortable header="Commitee Name"></Column>
                    <Column field="type" sortable header="Commitee Type"></Column>





                </DataTable>
                
            </div>
        </div>
    );
};

export default Commitee;