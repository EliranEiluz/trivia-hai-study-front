import './WelcomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../NavBar.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    useEffect(() => {
        isGuest();
        tippy('[data-tippy-content]', 
        {
            placement: 'right',
            touch:false,
        });
    }, []);


    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">{t('home')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('about')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('scoreboard')}</Link>
                    </li>
                </ul>
            </div>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseTrainingMode" id="toggleModal"></button>

            <div className="modal fade" id="chooseTrainingMode" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" id="chooseTrainingModalBody">
                        <div className="modal-header" id="chooseTrainingModalHeader">
                            <h5 className="modal-title" id="staticBackdropLabel">{t('choose_training_mode')}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeBtn"></button>
                        </div>
                        <div className="modal-body container-fluid">
                            <div className='row'>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-toggle="collapse" data-bs-target="#PlayAgainstAgentOptions" aria-expanded="false" aria-controls="PlayAgainstAgentOptions">{t('play_against_agent')}</button>
                                    </center>
                                </div>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-toggle="collapse" data-bs-target="#singlePlayerOptions" aria-expanded="false" aria-controls="singlePlayerOptions">{t('single_player')}</button>
                                    </center>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12' id="collapseGroup">
                                    <div id="singlePlayerOptions" className='collapse' data-bs-parent='#collapseGroup'>
                                        <div className='card card-body' id="gameModeMenu">
                                            <div>
                                                <center>
                                                    <button id="PlayWithAmountOfQuestions" type="button" data-tippy-content={t('2_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayWithAmountOfQuestions}>{t('given_amount_of_questions')}</button>
                                                </center>
                                            </div>
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstClock" type="button" data-tippy-content={t('4_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstClock}>{t('on_time_mode')}</button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="PlayAgainstAgentOptions" className='collapse' data-bs-parent='#collapseGroup'>
                                        <div className='card card-body' id="gameModeMenu">
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstAgent" type="button" data-tippy-content={t('0_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstAgent}>{t('play_alone')}</button>
                                                </center>
                                            </div>
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstAgentWithAgent" type="button" data-tippy-content={t('1_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstAgentWithAgent}>{t('play_with_agent')}</button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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