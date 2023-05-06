import React from 'react';
import Members from './compoonents/Members';
import Commitee from './compoonents/Commitee';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Nav from './compoonents/Nav/Nav'
const API_URL = 'http://localhost:5000/test/json';


function App() {
  const [memberData, setMemberData] = React.useState<any>({});

  const getMemberData = () => {
    return memberData?.MemberData || [];
  }

  const getPublishDate = () => {
    const date = memberData?.MemberData?.['@publish-date']
    return date
  }

  //Return full name of party
  const getPartyName = (partyLetter: any) => {

    if (partyLetter == 'D') {
      return "Democrat"
    } else if (partyLetter == 'R') {
      return "Republican"
    } else return ""

  }

  //Returns title
  const getTitle = () => {
    const data = memberData?.MemberData?.['title-info'] || [];
    const party = getPartyName(data?.['majority'])

    console.log(data?.clerk)
    return (
      <div className="p-3">
        <h2>Current Clerk is {data?.clerk}</h2>
        Welcome to The Office of the Clerk! We are currently in session {data?.['session']} of the {data?.['congress-text']}. The majority party this session is the {party} party.
        Find more information at {data?.weburl}
      </div>
    );
  }

  // Fetch the data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMemberData(data)
    };

    fetchData();
  }, []);

  const Title = getTitle();
  const publishDate = getPublishDate();

  return (
    <div>
      <div >
        <Nav></Nav>
        <div className="navBar"></div>
      </div>

      <h4>{Title}</h4>
      <h1 className="mb-3">Member Information </h1>
      <body>
        <div >
          <Members MemberData={(getMemberData())} ></Members>
        </div>

        <h1 className="mb-3">Commitee Information </h1>

        <div >
          <Commitee MemberData={(getMemberData())} ></Commitee>
        </div>

      </body>
      <footer>Published on: {publishDate}</footer>

    </div>
  );
}

export default App;
