import React, { useState } from 'react';
import './SerchBar.css';
import SingleUser from '../userlist/Singleuser';


const SerchBar = (props) =>{
  const [serch, setSerch] = useState("");
  const [serchRes, setSerchRes] = useState(null)
  const [serchSubmit, setSerchSubmit] = useState(null)
  const [serchMessage, setSerchMessage] = useState("")



  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const handleChange =(event) => {
    setSerch(event.target.value)
    const result = props.list.filter(user => user.username.toLowerCase().includes(serch.toLowerCase()))
    
    setSerchRes(result)
    event.preventDefault();
  }
  const handleSubmit = (event) =>{
    const result = props.list.filter(user => user.username.toLowerCase().includes(serch.toLowerCase()))
    
    
      setSerchRes(result)
      setSerchSubmit(result)
      console.log(serchSubmit)
    if(serchSubmit.length === 0){
      setSerchMessage('USER NOT FOUND')
    }
    else{
      setSerchMessage(null)

    }
    event.preventDefault();
    
    
    
    
  

  }




  return (
    <form className="search-bar" onSubmit={handleSubmit} >
      <input 
        type="text" 
        className="search-field" 
        placeholder={props.message}
        value={serch}
        onChange={handleChange} 

        
      />
      <button type="submit"></button>
      {serchRes &&  <h1>
		{serchRes.map((user) => (
		  <SingleUser SelectedUser={user} key={user._id} />
		))}
	  </h1>}
      {serchMessage && <h2>{serchMessage}</h2>}
     

    </form>

  );



}




export default SerchBar

