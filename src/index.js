import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import WelcomePage from './WelcomePage';
import Teams from './Teams';
import TeamPage from './TeamPage';
import GamePage from './GamePage';
import TMFinished from './TMFinished';

class User {
  constructor(username, password, fullName, phoneNumber, memberType) {
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.memberType = memberType;
    this.teams = [];
  }
}

class Team {
  constructor(teamName, firstMember, secondMember, scoreBoardPlace, totalPoints, wins, loses) {
    this.teamName = teamName;
    this.firstMember = firstMember;
    this.secondMember = secondMember;
    this.scoreBoardPlace = scoreBoardPlace;
    this.totalPoints = totalPoints;
    this.wins = wins;
    this.loses = loses;
  }
}

const nowOnline = {onlineUser: null, signalR: null, JWT_Token:'', isWin: false };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage nowOnline={nowOnline}/>} />
        <Route path='/register' element={<RegisterPage nowOnline={nowOnline}/>} />
        <Route path='/welcome' element={<WelcomePage nowOnline={nowOnline}/>} />
        <Route path='/teams' element={<Teams nowOnline={nowOnline}/>} />
        <Route path='/teamPage' element={<TeamPage nowOnline={nowOnline}/>} />
        <Route path='/game' element={<GamePage nowOnline={nowOnline}/>} />
        <Route path='/TMfinished' element={<TMFinished nowOnline={nowOnline}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {Team, User};