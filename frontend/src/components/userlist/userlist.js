import React, { useEffect, useState } from 'react';
import SingleUser from './Singleuser';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import VertNavbar from '../VertNavBar/VertNavBar';
import getSessionUserID from '../Utility/getSignedInUser_id';
import './userlist.css'
import Header from '../header/Header';

const UserList = () => {
  const [ListOfUsers, setUsernames] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(null);
  const [showAllMessage, setShowAllMessage] = useState("Show All")


  const showAllClick = (event) =>{
    if(showAll === null){
    setShowAll(true)
    event.preventDefault();
    setShowAllMessage("hide")
    }
    else{
      setShowAll(null)
      setShowAllMessage(" Show All")
    }
    
  }
  
  
  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await fetch('/userdata', {headers: { Authorization: `Bearer ${token}` }});

        if (!response.ok) {throw new Error('Network response was not ok');}

        const userData = await response.json();

        const userList1 = userData.users.map((user) => user);
        const userList = userList1.filter(user => user._id != getSessionUserID(token))
        console.log(userList) 
        setUsernames(userList);
        console.log(userList)

    } catch (error) {console.error('Error fetching user data:', error);}
    };

    fetchData();
  }, [token]); 

  return (
	<div>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
    <Header/>
          <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
          <br></br>
						<br></br>
						<br></br>
						<br></br>
						<br></br>
						<br></br>
    
    <div className="pageTitle">
    <h1 id='new-wager-heading' className='page_subheading'>Who do you wanna make a wager with?</h1>
    <SearchBar message={"Search for a user..."} list={ListOfUsers}/>
	  <button onClick={showAllClick} className='show all button'>{showAllMessage} </button>
    {showAll &&
    
    <ul>
      

		{ListOfUsers.map((user) => (
		  <SingleUser SelectedUser={user} key={user._id} />
		))}
	  </ul>
}
    </div>
	</div>
  </div >
  );
};

export default UserList;
