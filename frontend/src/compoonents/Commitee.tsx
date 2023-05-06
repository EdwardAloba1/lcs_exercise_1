//@ts-nocheck
import React, { useState} from "react";
import { DataTable} from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';

import "primereact/resources/themes/lara-light-indigo/theme.css";

const Commitee = ({ MemberData }: any) => {

    var data: CommiteeData[] = [];
    const [expandedRows, setExpandedRows] = useState(null);
    const commiteeInfo = MemberData?.['committees']?.['committee'] || []
    const [sortDirection, setSortDirection] = useState("asc");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    type CommiteeData = {

        name: string;
        type: string;
        commiteeHeader: string;
        ratio: string;
        phone?: string;
        location?: string;
        subcommitee?: SubcomiteeData[]
    };

    type SubcomiteeData = {
        name: string
        ratio: string
        location: string
    }

    //Returns all subcomittee Data from a commitee to an array
    const getSubcomittees = (inputData: any) => {
        var subComitteeData: SubcomiteeData[] = [];

        for (let i = 0; i < inputData?.['subcommittee'].length; i++) {

            subComitteeData.push({
                name: inputData?.['subcommittee'][i]?.['subcommittee-fullname'],
                ratio: 
                "Majority: " + inputData?.['subcommittee'][i]?.["ratio"]?.["majority"] + "\n" +
                "Minority: " + inputData?.['subcommittee'][i]?.["ratio"]?.["minority"],
                location: 
                    "Room: " + inputData?.['subcommittee'][i]?.["@subcom-room"] + 
                    ", Building: " + inputData?.['subcommittee'][i]?.["@subcom-building-code"] +
                    ", Zip-Code: " + inputData?.['subcommittee'][i]?.["@subcom-zip"],
            }
            )
        }

        return subComitteeData
    };


    //Parses all data into SubcomiteeData and CommiteeData structures
    function pushData(commitee: any) {
        console.log("pushData")
        var sub: SubcomiteeData[] = [];
        for (let i = 0; i < commitee.length; i++) {
            if (commitee[i].hasOwnProperty("subcommittee")) {

                sub = getSubcomittees(commitee[i])

                data.push({
                    subcommitee: sub,
                    name: commitee[i]?.['committee-fullname'],
                    type: commitee[i]?.['@type'],
                    commiteeHeader: commitee[i]?.["@com-header-text"],
                    phone: "(202) " + commitee[i]?.["@com-phone"],
                    ratio: 
                    "Majority: " + commitee[i]?.["ratio"]?.["majority"] + "\n" +
                    "Minority: " + commitee[i]?.["ratio"]?.["minority"],
                    location: 
                    "Room: " + commitee[i]?.["@com-room"] + 
                    ", Building: " + commitee[i]?.["@com-building-code"] +
                    ", Zip-Code: " + commitee[i]?.["@com-zip"],
                })

            }

            else {
                data.push({
                    name: commitee[i]?.['committee-fullname'],
                    type: commitee[i]?.['@type'],
                    commiteeHeader: commitee[i]?.["@com-header-text"],
                    phone: "(202) " + commitee[i]?.["@com-phone"],
                    ratio: 
                    "Majority: " + commitee[i]?.["ratio"]?.["majority"] + "\n" +
                    "Minority: " + commitee[i]?.["ratio"]?.["minority"],
                    location: 
                    "Room: " + commitee[i]?.["@com-room"] + 
                    ", Building: " + commitee[i]?.["@com-building-code"] +
                    ", Zip-Code: " + commitee[i]?.["@com-zip"],
                })
            }
        }

    }

    // Pushes all commitee information into structures
    pushData(commiteeInfo)

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
            <InputText value={filter} placeholder={`Search...`} type="text" onChange={handleFilter} />
        </div>
    );

    const allowExpansion = (rowData: CommiteeData) => {
        const rowLength = rowData?.subcommitee?.length
        if (rowLength != undefined && rowLength > 0) {

            return true
        }
    
        return false;
    };

    const rowExpansionTemplate = (rowData: any) => {
      

        console.log(rowData)
        console.log(filteredData)

        return (
            <div className="orders-subtable">
                <h1 className="mb-3">Sub-Committees </h1>
                <DataTable value={rowData?.subcommitee} responsiveLayout="scroll">
                    <Column field="name" sortable header="Sub-commitee Name"></Column>
                    <Column field="ratio" sortable header="Sub-commitee Ratio"></Column>
                    <Column field="location" sortable header="Location"></Column>

                </DataTable>
                
            </div>
        );
    };

//Return Commitee Table
    return (
        <div >
            <div>
                <DataTable onRowToggle={(e) => setExpandedRows(e.data)}
                    datakey="" expandedRows={expandedRows}
                    rowExpansionTemplate={rowExpansionTemplate}
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                    value={filteredData}
                    selectionMode="single"
                    header={inputText}
                    showGridlines
                    paginator
                    stripedRows
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '100rem' }}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="name" sortable header="Commitee Name"></Column>
                    <Column field="type" sortable header="Commitee Type"></Column>
                    <Column field="ratio" sortable header="Committee Ratio"></Column>
                    <Column field="commiteeHeader" sortable header="Committee Header"></Column>
                    <Column field="phone" sortable header="Phone Number"></Column>
                    <Column field="location" sortable header="Location"></Column>

                </DataTable>

            </div>
        </div>
    );
};

export default Commitee;