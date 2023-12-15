import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import LogInForm from '../components/auth/LoginForm';

const LogInPage = ({ navigate }) => {
  return(
    <div>
    <NavBar/>
    <h1>Sign in to your account</h1>
    <LogInForm navigate={ navigate }/>
    Don't have an account?
    <br/>
    <a href='/signup'>Register</a>
    </div>
)
}

export default LogInPage;