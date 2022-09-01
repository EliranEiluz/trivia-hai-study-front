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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseTrainingMode" id="toggleModal">
            </button>
            <div className="modal fade" id="chooseTrainingMode" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" id="chooseTrainingModalBody">
                        <div className="modal-header" id="chooseTrainingModalHeader">
                            <h5 className="modal-title" id="staticBackdropLabel">Choose Training Mode</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body container-fluid">
                            <div className='row'>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onPlayWithAgent}>Play with Agent</button>
                                    </center>
                                </div>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-dismiss="modal" onClick={onSinglePlayer}>Single Player</button>
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
                        Project Trivia Logo
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 col-sm-12 d-flex justify-content-center' id="WelcomeMessage">
                        <div>Welcome back, {nowOnline.onlineUser.fullName}! <i className="fa-solid fa-hand-peace fa-1x"></i></div><br></br>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-xl-6 col-sm-12 d-flex justify-content-center' id="WelcomeMessage">
                        <div>Please choose game mode:</div>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 d-flex justify-content-center'>
                        <button className='btn btn-primary welcome-btn btn-lg' id="TrainingModeBtn" onClick={onClickTrainingMode}>Training Mode</button>
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-xl-6 d-flex justify-content-center'>
                        <button className='btn btn-primary welcome-btn btn-lg' id="teamModeBtn">Team Mode</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;