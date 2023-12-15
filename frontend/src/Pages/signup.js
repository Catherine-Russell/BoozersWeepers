import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import SignUpForm from '../components/user/SignUpForm'
const SignUpPage = ({ navigate }) => {
  return(
    <div>
    <NavBar/>
    <h1>Register a New Account</h1>
    <SignUpForm navigate={ navigate }/>
    Already Have an account?
    <a href='/login'>Log in</a>
    </div>
)
}

export default SignUpPage;