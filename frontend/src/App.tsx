import React from 'react';
import './App.css';
import 'reset-css';
import NavbarScroller from './compoonents/NavbarScroller';
import Table from './compoonents/Table';
import Navbar from 'react-bootstrap/Navbar';
import { DataTable } from "primereact/datatable";

const API_URL = 'http://localhost:5000/test/json';

const navigation = {
  brand: { name: 'Office of the Clerk', to: '/' },
  links: []
};

function App() {
  //const [query, setQuery] = useState("")
  const [ memberData, setMemberData ] = React.useState<any>({});

  const getMembers = () => {
    return memberData?.MemberData?.members?.member || [];
  }

  
  const getMemberName = (member: any): string => {
    return member?.['member-info']?.namelist || '';
  };

  const getMemberState = (member: any): string => {
    return member?.['member-info']?.['state']?.['state-fullname'];
  };

  const { brand, links } = navigation;

  // Fetch the data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMemberData(data)
    };
    
    fetchData();
  }, []);

  return (
    <main >
      <header>
        <div >
          <Navbar bg="light"></Navbar>
        <NavbarScroller brand={brand} links={links}/>
        <div className="navBar">
        </div>
      </div>
      </header>
     
     <body>
     <div className="center">
       <Table class="child" memberInfo={getMembers()}>
         
       </Table>
     </div>
     </body>
    </main>
    
  );
}

export default App;
