import './GamePage.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function GamePage({ nowOnline }) {

    var navigation = useNavigate();
    const [points, setPoints] = useState(0);
    const [timerClock, setTimerClock] = useState(20);
    const [questionCounter, setQuestionCounter] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState('When did Israel Declare independence?');

    function leaveGame() {
        navigation('/welcome')
    }

    function leaveToHomeGame() {
        navigation('/')
    }

    useEffect(() => {
        var secondsPassed = 0;
        const interval = setInterval(() => {
            if(secondsPassed < 20) {
                setTimerClock(prevTimerClock => prevTimerClock-1);
                secondsPassed++;
            }
            else {
                clearInterval(interval);
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <a className="nav-link active" href="#leaveToHomeGameModal" data-bs-toggle="modal">Home</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Scoreboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#leaveGameModal" data-bs-toggle="modal">Switch Mode</a>
                    </li>
                    <li className="nav-item ms-auto">
                        <button className='btn btn-danger' id="leaveGameBtn" data-bs-toggle="modal" data-bs-target="#leaveGameModal">Leave Game</button>
                    </li>
                </ul>
            </div>
            <div className="modal fade" id="leaveGameModal" tabIndex="-1" aria-labelledby="leaveGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveGameModalLabel">Leave Game</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to leave the game? It will be a technical lost!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveGame}>Leave Game</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="leaveToHomeGameModal" tabIndex="-1" aria-labelledby="leaveToHomeGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveToHomeGameModalLabel">Back to Home Page</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to leave the game to home page? It will be a technical lost!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>Back to home page</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid' id="gamePageContainer">
                <div className='row'>
                    <div className='col-11'>
                        <div className='card' id="question-card">
                            <div className='card-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-5'>
                                            Points: {points} <br />
                                            Question {questionCounter}/10
                                        </div>
                                        <div className='col-4' id="time">
                                            <span id="timeWord">Time:</span><br /> {timerClock} seconds
                                        </div>
                                        <div className='col-3'>
                                            <button className='btn btn-primary passQuestion-btn float-end'>Pass Question</button>
                                        </div>
                                    </div>
                                    <div className='row justify-content-md-center' id="question">
                                        {currentQuestion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center' id="answersRow" role="group" aria-label="Basic radio toggle button group">
                    <div className='col-3 d-flex justify-content-center'>
                        <input type="radio" id="1stAnswer" name="answerRadio" autoComplete='off' className='btn-check'></input>
                        <label className="btn question-btn" htmlFor="1stAnswer">1967</label>
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        <input type="radio" id="2ndAnswer" name="answerRadio" autoComplete='off' className='btn-check'></input>
                        <label className="btn question-btn" htmlFor="2ndAnswer">1954</label>
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        <input type="radio" id="3rdAnswer" name="answerRadio" autoComplete='off' className='btn-check'></input>
                        <label className="btn question-btn jusify-content-center" htmlFor="3rdAnswer">2021</label>
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        <input type="radio" id="4thAnswer" name="answerRadio" autoComplete='off' className='btn-check'></input>
                        <label className="btn btn-primary question-btn" htmlFor="4thAnswer">1948</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;