import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
    .then(async response => {
      if(response.status === 201) {
        navigate('/login')
      } else {
        const errorData = await response.json();
          navigate('/signup') 
          setErrorMsg(errorData.message)
          console.log(errorData.message)
      }
    })
  }
  
  const handleEmailChange = (event) => {setEmail(event.target.value)}
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} /> <br/>
        <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} /> <br/>
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} /> <br/>
  
        <input id='submit' type="submit" value="Submit" />
        <h1>{errorMsg}</h1>
      </form>
      
    );
  
}

export default SignUpForm;
