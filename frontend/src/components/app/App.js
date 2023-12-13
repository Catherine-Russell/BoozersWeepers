import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NewWagerForm from '../wagers/NewWagerForm'
import Home from '../home/Home';

import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/newWager/:challengedUserID' element={<NewWagerForm navigate={ useNavigate() }/>}/>
          <Route path='/'  element={<Home navigate={ useNavigate() }/>}/>



        </Routes>
    );
}

export default App;
