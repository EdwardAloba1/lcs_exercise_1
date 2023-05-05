import React from 'react';
import NavbarScroller from './compoonents/NavbarScroller';
import Table from './compoonents/Table';
import Navbar from 'react-bootstrap/Navbar';
import { DataTable } from "primereact/datatable";
import Nav from './compoonents/Nav/Nav'
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
  <div>
    <div >
        
        
        <Nav></Nav>
      <div className="navBar"></div>
      </div>
    
    <body>
     <div >
       <Table  memberInfo={getMembers()}></Table>
      </div>
    </body>
  </div>
    
  );
}

export default App;
