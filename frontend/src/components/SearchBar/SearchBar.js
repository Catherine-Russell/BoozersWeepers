import React, { useState } from 'react';
import './SearchBar.css';
import SingleUser from '../userlist/Singleuser';
import { useNavigate } from 'react-router-dom';



const SearchBar = (props) =>{
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState(null)
  const [searchSubmit, setSearchSubmit] = useState(null)
  const [searchMessage, setSearchMessage] = useState("")
  const [group, setGroup] = useState(props.group)



  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const navigate = useNavigate();

  const handleButtonClick = (event)=>{
    setSearchMessage(null)
    event.preventDefault()
  }


  const handleChange =(event) => {
    setSearch(event.target.value)
    if(group && search.length > 0){
      const result = props.list.filter(user => group.name.toLowerCase().includes(search.toLowerCase()))
    
      setSearchRes(result)
      event.preventDefault();

    }
    if(search.length > 0 && !group){
      const result = props.list.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
    
      setSearchRes(result)
      event.preventDefault();

    }
  
  }







  const handleSubmit = (event) =>{
    if(!group){
      const result = props.list.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
      setSearchRes(result)
      setSearchSubmit(result)
      event.preventDefault();
    if(result.length === 1){
      navigate(`/newWager/${result[0]._id}`);
      console.log(searchSubmit[0])
      event.preventDefault();

    }
    else if(result.length === 0){
      setSearchMessage("user not found")
      console.log(searchSubmit[0])
      event.preventDefault();


    }
   


    }

    if(group){
      const result = props.list.filter(group => group.name.toLowerCase().includes(search.toLowerCase()))
      setSearchRes(result)
      setSearchSubmit(result)
      event.preventDefault();
    if(result.length === 1){
      navigate(`/groups/${result[0]._id}`)
      console.log(searchSubmit[0])
      event.preventDefault();

    }
    else if(result.length === 0){
      setSearchMessage("group not found")
      console.log(searchSubmit[0])
      event.preventDefault();


    }





    }
    
    
    
    
  

  }


  return (
    <form className="search-bar" onSubmit={handleSubmit}>
    <div className="search-container">
      <input 
        type="text" 
        className="search-field" 
        placeholder={props.message}
        value={search}
        onChange={handleChange} 
      />
      <button type="submit">Search</button>
    </div>
    {searchRes  && !group && (
      <div className="result-container">
        <ul>
          {searchRes.map((user) => (
             <a href={`/newWager/${user._id}`} key={user._id} className='searchRes'>{user.username} </a>
          ))}
        </ul>
      </div>
    )}
    {searchRes  && group && (
      <div className="result-container">
        <ul>
          {searchRes.map((group) => (
             <a href={`/groups/${group._id}`} key={group._id} className='searchRes'>{group.name} </a>
          ))}
        </ul>
      </div>
    )}
    {searchMessage && <button className="searchMessage" onClick={handleButtonClick}>{searchMessage}<span className="close-icon">×</span></button>}
  </form>
);



}




export default SearchBar

