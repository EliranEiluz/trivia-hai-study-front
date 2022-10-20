import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './login_and_register/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './login_and_register/RegisterPage';
import WelcomePage from './welcome_page/WelcomePage';
import Teams from './team_selection/Teams';
import TeamPage from './team_page/TeamPage';
import GamePage from './game_page/GamePage';
import TMFinished from './game_finish_page/TMFinished';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init(require('./languange.json'));



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

class Question {
  constructor(Id, question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, rightAnswer) {
    this.Id = Id;
    this.question = question;
    this.firstAnswer = firstAnswer;
    this.secondAnswer = secondAnswer;
    this.thirdAnswer = thirdAnswer;
    this.fourthAnswer = fourthAnswer;
    this.rightAnswer = rightAnswer;
  }
}



const nowOnline = {onlineUser: null, signalR: null, JWT_Token:'', isWin: 1, questions: null, agentPoints:0, playerPoints:0, singlePlayer:true};





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={'/trivia'}>
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
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {Team, User, Question };