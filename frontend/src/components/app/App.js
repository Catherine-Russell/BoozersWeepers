import './App.css';
import React from 'react';
import {useNavigate,Routes,Route,} from "react-router-dom";
import LogInPage from '../../Pages/login';
import NewWagerForm from '../wagers/NewWagerForm'
import Home from '../home/Home';
import MyAccountPage from '../myAccountPage/MyAccountPage';
import UserList from '../userlist/userlist';
import WagerInfoPage from '../singleWagerPage/wagerInfoPage.js';
import SingleWager from '../singlewager/singlewager';
import SignUpPage from '../../Pages/signup';
import Workshop from '../workshop/workshop';
import ProfilePage from '../../Pages/profilepage';



const App = () => {
    return (
        <Routes>
          <Route path='/login'  element={<LogInPage  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpPage navigate={ useNavigate() }/>}/>
          <Route path='/myAccount' element={<MyAccountPage navigate={ useNavigate() }/>}/>
          <Route path='/newWager/:challengedUserID' element={<NewWagerForm navigate={ useNavigate() }/>}/>
          <Route path='/'  element={<Home navigate={ useNavigate() }/>}/>
          <Route path='/userlist'  element={<UserList navigate={ useNavigate() }/>}/>
          <Route path='/Wager/:wagerID' element={<WagerInfoPage navigate={ useNavigate() }/>}/>
          <Route path='/workshop' element={<Workshop navigate={ useNavigate() }/>}/>
          <Route path='/profile/:userID' element={<ProfilePage navigate={ useNavigate() }/>}/>




        </Routes>
    );
}

export default App;
