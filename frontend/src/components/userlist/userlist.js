import React, { useEffect, useState } from 'react';
import SingleUser from './Singleuser';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';

const UserList = () => {
  const [ListOfUsers, setUsernames] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await fetch('/userdata', {headers: { Authorization: `Bearer ${token}` }});

        if (!response.ok) {throw new Error('Network response was not ok');}

        const userData = await response.json();
        const userList = userData.users.map((user) => user); 
        setUsernames(userList);
        console.log(userList)

    } catch (error) {console.error('Error fetching user data:', error);}
    };

    fetchData();
  }, [token]); 

  return (
	<div>
		<NavBar/>
    <SearchBar message={"serch for a user..."} list={ListOfUsers}/>
	  <ul>
		{ListOfUsers.map((user) => (
		  <SingleUser SelectedUser={user} key={user._id} />
		))}
	  </ul>
	</div>
  );
};

export default UserList;
