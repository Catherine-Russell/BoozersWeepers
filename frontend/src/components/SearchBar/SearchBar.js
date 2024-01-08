import React, { useState } from 'react';
import './SearchBar.css';
import SingleUser from '../userlist/Singleuser';
import { useNavigate } from 'react-router-dom';



const SearchBar = (props) =>{
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState(null)
  const [searchSubmit, setSearchSubmit] = useState(null)
  const [searchMessage, setSearchMessage] = useState("")



  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const navigate = useNavigate();


  const handleChange =(event) => {
    setSearch(event.target.value)
    if(search.length > 0){
      const result = props.list.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
    
      setSearchRes(result)
      event.preventDefault();

    }
  
  }
  const handleSubmit = (event) =>{
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
    {searchRes && (
      <div className="result-container">
        <ul>
          {searchRes.map((user) => (
            <SingleUser SelectedUser={user} key={user._id} />
          ))}
        </ul>
      </div>
    )}
    {searchMessage && <h2>{searchMessage}</h2>}
  </form>
);



}




export default SearchBar

