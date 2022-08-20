import './GamePage.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function GamePage({ nowOnline }) {

    var navigation = useNavigate();
    var playerPoints = 0;
    var agentPoints = 0;
    const [timerClock, setTimerClock] = useState(20);
    var playerQuestionCounter = 1;
    var agentQuestionCounter = 1;
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');
    var isPlayerTurn = true;
    const [points, setPoints] = useState('0')
    const [questionCounter, setQuestionCounter] = useState(1);
    var gameCounter = 0;
    var intervalId = null;
    var timerInterval = null;
    function checkAnswer() {
        if (document.getElementById('1stAnswer').checked) {
            return 1;
        }
        if (document.getElementById('2ndAnswer').checked) {
            return 2;
        }
        if (document.getElementById('3rdAnswer').checked) {
            return 3;
        }
        if (document.getElementById('4thAnswer').checked) {
            return 4;
        }
        return 0;
    }

    function passQuestionClicked() {
        console.log(intervalId);
        console.log(timerInterval)
        clearInterval(intervalId)
        clearInterval(timerInterval)
        intervalId = null;
        timerInterval = null;
        intervalId = setInterval(() => {
            gameCounter++;
            if (gameCounter < 20) {
                gameFlow();
            }
            else {
                clearInterval(intervalId);
            }
        }, 23000)
        timerInterval = setInterval(() => {
            setTimerClock((prevTimerClock) => prevTimerClock - 1);
        }, 1000)
        if (isPlayerTurn) {
            agent();
        }
        else {
            player();
        }
        return () => {
            clearInterval(intervalId);
            clearInterval(timerInterval)
        }
    }

    function leaveGame() {
        navigation('/welcome')
    }

    function leaveToHomeGame() {
        navigation('/')
    }

    function switchAnswer(rightAnswer) {
        switch (rightAnswer) {
            case 1:
                document.getElementById("1stAnswerLabel").classList.add("rightAnswer");
                document.getElementById("1stAnswer").classList.add("rightAnswer");
                break;
            case 2:
                document.getElementById("2ndAnswerLabel").classList.add("rightAnswer");
                document.getElementById("2ndAnswer").classList.add("rightAnswer");
                break;
            case 3:
                document.getElementById("3rdAnswerLabel").classList.add("rightAnswer");
                document.getElementById("3rdAnswer").classList.add("rightAnswer");
                break;
            case 4:
                document.getElementById("4thAnswerLabel").classList.add("rightAnswer");
                document.getElementById("4thAnswer").classList.add("rightAnswer");
                break;
        }
    }

    function removeClasses() {
        document.getElementById("1stAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("2ndAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("3rdAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("4thAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("1stAnswer").classList.remove("rightAnswer");
        document.getElementById("2ndAnswer").classList.remove("rightAnswer");
        document.getElementById("3rdAnswer").classList.remove("rightAnswer");
        document.getElementById("4thAnswer").classList.remove("rightAnswer");
        document.getElementById("1stAnswer").checked = false;
        document.getElementById("2ndAnswer").checked = false;
        document.getElementById("3rdAnswer").checked = false;
        document.getElementById("4thAnswer").checked = false;
    }

    function startGame() {
        timerInterval = null;
        gameFlow();
        intervalId = setInterval(() => {
            gameCounter++;
            if (gameCounter < 20) {
                gameFlow();
            }
            else {
                clearInterval(intervalId);
            }
        }, 23000)
        console.log(intervalId);
        return () => clearInterval(intervalId);
    }

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    function agent() {
        document.getElementById("1stAnswer").disabled = "true";
        document.getElementById("2ndAnswer").disabled = "true";
        document.getElementById("3rdAnswer").disabled = "true";
        document.getElementById("4thAnswer").disabled = "true";
        document.getElementById("passQuestionBtn").disabled = "true";
        var rand = (Math.floor(Math.random() * 17) + 1) * 1000;
        setTimeout(() => {
            var chosen = Math.floor(Math.random() * 4) + 1;
            switch (chosen) {
                case 1:
                    document.getElementById("1stAnswer").checked = "true";
                    break;
                case 2:
                    document.getElementById("2ndAnswer").checked = "true";
                    break;
                case 3:
                    document.getElementById("3rdAnswer").checked = "true";
                    break;
                case 4:
                    document.getElementById("4thAnswer").checked = "true";
                    break;
            }
        }, rand)
    }

    function player() {
        document.getElementById("1stAnswer").disabled = false;
        document.getElementById("2ndAnswer").disabled = false;
        document.getElementById("3rdAnswer").disabled = false;
        document.getElementById("4thAnswer").disabled = false;
        document.getElementById("passQuestionBtn").disabled = false;
    }

    async function gameFlow() {
        if (timerInterval != null) {
            clearInterval(timerInterval);
            let answer = checkAnswer();
            console.log(answer);
            if (isPlayerTurn) {
                if (nowOnline.questions[gameCounter - 1].rightAnswer == answer) {
                    playerPoints = playerPoints + 100;
                }
                else {
                    if (playerPoints > 0) {
                        playerPoints = playerPoints - 100;
                    }
                }
                setPoints(playerPoints);
            }
            else {
                if (nowOnline.questions[gameCounter - 1].rightAnswer == answer) {
                    agentPoints = agentPoints + 100;
                }
                else {
                    if (agentPoints > 0) {
                        agentPoints = agentPoints - 100;
                    }
                }
                setPoints(agentPoints);
            }
            switchAnswer(nowOnline.questions[gameCounter - 1].rightAnswer)
            await sleep(3000);
            isPlayerTurn = !isPlayerTurn;
            if (isPlayerTurn) {
                playerQuestionCounter++;
                setPoints(playerPoints)
                setQuestionCounter(playerQuestionCounter)
            }
            else {
                setPoints(agentPoints)
                setQuestionCounter(agentQuestionCounter)
                agentQuestionCounter++;
            }
        }
        else {
            await sleep(3000);
        }
        if (!isPlayerTurn) {
            agent();
        }
        else {
            player();
        }
        removeClasses();
        setTimerClock(20);
        setCurrentQuestion(nowOnline.questions[gameCounter].question);
        setFirstAnswer(nowOnline.questions[gameCounter].firstAnswer);
        setSecondAnswer(nowOnline.questions[gameCounter].secondAnswer);
        setThirdAnswer(nowOnline.questions[gameCounter].thirdAnswer);
        setFourthAnswer(nowOnline.questions[gameCounter].fourthAnswer);
        timerInterval = setInterval(() => {
            setTimerClock((prevTimerClock) => prevTimerClock - 1);
        }, 1000)
    }

    useEffect(() => {
        document.getElementById('startGameModalBtn').click();
        return () => {
            clearInterval(intervalId);
            clearInterval(timerInterval);
        }
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
            <button type="button" data-bs-toggle="modal" data-bs-target="#startGameModal" id="startGameModalBtn">Launch modal</button>
            <div className="modal modal-lg fade" tabIndex="-1" aria-hidden="true" id="startGameModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Game instructions</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Hello and welcome to Project Trivia game! <br />
                                In Training mode, you will be playing against an agent, when each of you has 10 questions to answer on.<br />
                                The one who holds the turn has 20 seconds to answer the question.<br />
                                Right answer will increase your points by 100.<br />
                                Wrong answer (if you have more than 0 points) will decrease your points by 100.
                                If you don't know the answer and you don't want to lose points,<br />
                                You can press the "Pass Question" button to pass the question to the agent.<br />
                                The agent can do it also, so be focused!<br />
                                When a question is passed, the one who the question is passed to can only earn points.<br />
                                Hope you will enjoy the game.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={startGame}>Start game!</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>Back to home page</button>
                        </div>
                    </div>
                </div>
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
                    <div className='col-xl-11 col-sm-12'>
                        <div className='card' id="question-card">
                            <div className='card-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-xl-5 col-sm-8'>
                                            Points: {points} <br />
                                            Question {questionCounter}/10
                                        </div>
                                        <div className='col-xl-4 col-sm-6' id="time">
                                            <span id="timeWord">Time:</span><br /> {timerClock} seconds
                                        </div>
                                        <div className='col-xl-3 col-sm-6'>
                                            <button className='btn btn-primary passQuestion-btn float-end' id="passQuestionBtn" onClick={passQuestionClicked}>Pass Question</button>
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
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="1stAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='1'></input>
                        <label className="btn question-btn" htmlFor="1stAnswer" id="1stAnswerLabel">{firstAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="2ndAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='2'></input>
                        <label className="btn question-btn" htmlFor="2ndAnswer" id="2ndAnswerLabel">{secondAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="3rdAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='3'></input>
                        <label className="btn question-btn jusify-content-center" htmlFor="3rdAnswer" id="3rdAnswerLabel">{thirdAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="4thAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='4'></input>
                        <label className="btn btn-primary question-btn" htmlFor="4thAnswer" id="4thAnswerLabel">{fourthAnswer}</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;