import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NewWagerForm from '../wagers/NewWagerForm'
import Home from '../home/Home';
import MyAccountPage from '../myAccountPage/MyAccountPage';
import UserList from '../userlist/userlist';
import SingleWager from '../singlewager/singlewager';

import React, { useState } from 'react';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/myAccount' element={<MyAccountPage navigate={ useNavigate() }/>}/>
          <Route path='/newWager/:challengedUserID' element={<NewWagerForm navigate={ useNavigate() }/>}/>
          <Route path='/'  element={<Home navigate={ useNavigate() }/>}/>
          <Route path='/userlist'  element={<UserList navigate={ useNavigate() }/>}/>
          <Route path='/Wager/:wagerID' element={<SingleWager />}/>



        </Routes>
    );
}

export default App;
