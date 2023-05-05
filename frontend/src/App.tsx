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

  const getPublishDate = () => {
    const date = memberData?.MemberData?.['@publish-date']
    return date
  }

  const getCongressData = () => {
    const data = memberData?.MemberData?.['title-info'] || [];
    
    console.log(data?.clerk)
    return (
      <div>
        Welcome to The Office of the Clerk! {data?.['congress-num']} {data?.clerk}
      </div>
    );
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

  const memberDatas = getCongressData();
  const publishDate = getPublishDate();
  return (
  <div>
    <div >
        
        
        <Nav></Nav>
      <div className="navBar"></div>
      </div>
    <h1 className="mb-3">Member Info </h1>
    <h4>{memberDatas}</h4>
    <body>
     <div >
       <Table  memberInfo={getMembers()}></Table>
      </div>
      
      
    </body>
    <footer>Published on: {publishDate}</footer>

  </div>
  );
}

export default App;
