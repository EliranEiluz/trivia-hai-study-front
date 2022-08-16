import './WelcomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
function WelcomePage({ nowOnline }) {

    var navigation = useNavigate();

    function onClickTrainingMode() {
        navigation('/game');
    }

    function isGuest() {
        if(nowOnline.onlineUser.fullName === "Guest") {
            document.getElementById("teamModeBtn").disabled = "true";
        }
    }

    useEffect(() => isGuest(), [])

    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Scoreboard</Link>
                    </li>
                </ul>
            </div>
            <div className='container-fluid' id="WelcomePageContent">
                <div className='row justify-content-md-center'>
                    <div className='col-6 col-md-auto' id="logoDiv">
                        Project Trivia Logo
                    </div>
                    <div className='row justify-content-md-center'>
                        <div className='col-6 col-md-auto' id="WelcomeMessage">
                            Welcome back, {nowOnline.onlineUser.fullName}! <i className="fa-solid fa-hand-peace fa-1x"></i><br />
                            <i className="fa-solid fa-hand-wave"></i>
                            Please choose game mode:
                        </div>
                        <div className='row justify-content-md-center'>
                            <div className='col-6 col-md-auto' id="TrainingModeBtn">
                                <button className='btn btn-primary welcome-btn btn-lg' onClick={onClickTrainingMode}>Training Mode</button>
                            </div>
                            <div className='row justify-content-md-center'>
                                <div className='col-6 col-md-auto'>
                                    <button className='btn btn-primary welcome-btn btn-lg' id="teamModeBtn">Team Mode</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;