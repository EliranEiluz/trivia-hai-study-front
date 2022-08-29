import './WelcomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
function WelcomePage({ nowOnline }) {

    var navigation = useNavigate();

    function onClickTrainingMode() {
        //navigation('/game');
        document.getElementById('toggleModal').click();

    }

    function onSinglePlayer() {
        nowOnline.singlePlayer = true;
        navigation('/game');
    }

    function onPlayWithAgent() {
        nowOnline.singlePlayer = false;
        navigation('/game');
    }

    function isGuest() {
        if (nowOnline.onlineUser.fullName === "Guest") {
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
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseTrainingMode" id="toggleModal">
            </button>
            <div class="modal fade" id="chooseTrainingMode" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content"  id="chooseTrainingModalBody">
                        <div class="modal-header" id="chooseTrainingModalHeader">
                            <h5 class="modal-title" id="staticBackdropLabel">Choose Training Mode</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body container-fluid">
                            <div className='row'>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" class="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onPlayWithAgent}>Play with Agent</button>
                                    </center>
                                </div>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" class="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onSinglePlayer}>Single Player</button>
                                    </center>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
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