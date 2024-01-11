import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import SignUpForm from '../components/user/SignUpForm'
import Header from '../components/header/Header';
import '../Pages/style.css'

const SignUpPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    if (isLoggedIn) {navigate('/myAccount');}
    }, [token, navigate, isLoggedIn]);

    return (
      <div>
        <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
        <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
          <Header />
          <h1 id='signup-subheading' className='page_subheading'>Register a New Account</h1>
          {isLoggedIn ? (
            <div>
              <p>Please log-out to see this content</p>
            </div>
          ) : (
            <div>
              <SignUpForm navigate={navigate} />
            <br></br>
              Already have an account? 
              <a href='/login'> Log in</a>
            </div>
          )}
        </div>
      </div>
    )};
  
export default SignUpPage;