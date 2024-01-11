import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import LogInForm from '../components/auth/LoginForm'
import Header from '../components/header/Header';
import '../Pages/style.css'

const LogInPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {

    if (isLoggedIn) {navigate('/myAccount');}
    }, [token,navigate]);

  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header/>
        <h1 id='sign-in-subheading' className='page_subheading' >Sign in to your account</h1>
        {isLoggedIn ? (
          <div>
            <p>Please Log-Out to See this content</p>
            
          </div>
        ) : (
          <div>
            <LogInForm navigate={ navigate }/>
          Don't have an account?
          <br/>
          <a href='/signup'>Register</a>
          </div>
        )}
      </div>
    </div>
  )};
  
export default LogInPage;







  




    
  

 



