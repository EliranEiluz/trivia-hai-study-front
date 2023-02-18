import './WelcomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../NavBar.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import WelcomePageModals from './WelcomePageModals.js';
import LanguangeButton from '../LanguangeButton';
function WelcomePage({ nowOnline }) {

    const [name, setName] = useState('');


    var navigation = useNavigate();

    const { t } = useTranslation();


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function onClickTrainingMode() {
        //navigation('/game');
        document.getElementById('toggleModal').click();

    }



    function onPlayAgainstAgent() {
        nowOnline.playType = 0;
        navigation('/game');
    }

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function onPlayAgainstAgentWithAgent() {
        nowOnline.playType = 1;
        navigation('/game');
    }

    function onPlayAgainstAgentAndClock() {
        nowOnline.playType = 3;
        navigation('/game');
    }

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function onPlayWithAmountOfQuestions() {
        nowOnline.playType = 2;
        navigation('/game');
    }

    function onPlayAgainstClock() {
        nowOnline.playType = 4;
        navigation('/game');
    }

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function isGuest() {
        if (nowOnline.onlineUser == null) {
            navigation('/');
            return;
        }
        setName(nowOnline.onlineUser.fullName);
        if (nowOnline.onlineUser.fullName === "Guest") {
            setName(t('guest'));
        }
    }

    function lngChanged() {
        if (document.querySelector("html").lang === "en") {
            document.getElementById("LogoutBtnLi").classList.remove("me-auto");
            document.getElementById("LogoutBtnLi").classList.add("ms-auto");
        }
        else {
            document.getElementById("LogoutBtnLi").classList.remove("ms-auto");
            document.getElementById("LogoutBtnLi").classList.add("me-auto");
        }
    }

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    useEffect(() => {
        lngChanged();
        isGuest();
        tippy('[data-tippy-content]',
            {
                placement: 'right',
                touch: false,
            });
    }, []);


    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <a className="nav-link active" href="#LogoutModal" data-bs-toggle="modal">{t('home')}</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('about')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('scoreboard')}</Link>
                    </li>
                    <li className='nav-item' id="LogoutBtnLi">
                        <div id="LangBtnDiv">
                            <LanguangeButton toRunFunc={lngChanged} />
                        </div>
                        <button type="button" id="logOutBtn_Welcome" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#LogoutModal">{t('logout')}</button>
                    </li>
                </ul>
            </div>


            <WelcomePageModals onPlayWithAmountOfQuestions={onPlayWithAmountOfQuestions} onPlayAgainstClock={onPlayAgainstClock} onPlayAgainstAgent={onPlayAgainstAgent} onPlayAgainstAgentWithAgent={onPlayAgainstAgentWithAgent} onPlayAgainstAgentAndClock={onPlayAgainstAgentAndClock}/>
            <div className='container-fluid' id="WelcomePageContent">
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 col-sm-12 d-flex justify-content-center' id="logoDiv">
                        <img src={require("../tp2.png")} id="imgLogo2"></img>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 col-sm-12 d-flex justify-content-center' id="WelcomeMessage">
                        <div>{t('welcome')}, <span id="regular">{name}!</span> <i className="fa-solid fa-hand-peace fa-1x"></i></div><br></br>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-xl-6 col-sm-12 d-flex justify-content-center' id="WelcomeMessage">
                        <div>{t('choose_game_mode')}</div>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 d-flex justify-content-center'>
                        <button className='btn btn-primary welcome-btn btn-lg' id="TrainingModeBtn" onClick={onClickTrainingMode}>{t('training_mode')}</button>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 d-flex justify-content-center'>
                        <button className='btn btn-primary welcome-btn btn-lg' id="teamModeBtn" disabled={true}>{t('team_mode')}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;