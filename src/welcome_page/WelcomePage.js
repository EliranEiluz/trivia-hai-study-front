import './WelcomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../NavBar.css';

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

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function onSinglePlayer() {
        nowOnline.singlePlayer = true;
        navigation('/game');
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function onPlayWithAgent() {
        nowOnline.singlePlayer = false;
        navigation('/game');
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function isGuest() {
        if(nowOnline.onlineUser == null) {
            navigation('/');
            return;
        }
        setName(nowOnline.onlineUser.fullName);
        if (nowOnline.onlineUser.fullName === "Guest") {
            document.getElementById("teamModeBtn").disabled = "true";
            setName(t('guest'));
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    useEffect(() => isGuest(), []);

    
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseTrainingMode" id="toggleModal">
            </button>
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
                                        <button type="button" className="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onPlayWithAgent}>{t('play_with_agent')}</button>
                                    </center>
                                </div>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onSinglePlayer}>{t('single_player')}</button>
                                    </center>
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
                        <button className='btn btn-primary welcome-btn btn-lg' id="teamModeBtn">{t('team_mode')}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;