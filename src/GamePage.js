import './GamePage.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
function GamePage({ nowOnline }) {

    //var isClicked = false;
    //const [intervalId, setIntervalId] = useState(null);
    const timerInterval = useRef(null);
    var navigation = useNavigate();
    const playerPoints = useRef(0);
    const agentPoints = useRef(0);
    const [timerClock, setTimerClock] = useState(20);
    const playerQuestionCounter = useRef(1);
    const agentQuestionCounter = useRef(1);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');
    const isPlayerTurn = useRef(false);
    const [points, setPoints] = useState('0')
    const [questionCounter, setQuestionCounter] = useState(1);
    const gameCounter = useRef(0);

    async function onChoosingAnswer(e) {
        answerCheck(parseInt(e.target.value));
        gameCounter.current += 1;
        clearTimeout(timerInterval.current)
        await sleep(3000);
        console.log(gameCounter)
        gameFlow();
    }

    async function onAgentChoosingAnswer(val) {
        answerCheck(val);
        gameCounter.current += 1;
        clearTimeout(timerInterval.current)
        await sleep(3000);
        console.log(gameCounter)
        gameFlow();
    }

    function timer() {
        if (timerClock != 0) {
            setTimerClock((prevTimerClock) => prevTimerClock - 1);
            timerInterval.current = setTimeout(timer, 1000);
        }
        else {
            onAgentChoosingAnswer(0);
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
        gameFlow();
    }

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    function agent() {
        document.getElementById("1stAnswer").disabled = "true";
        document.getElementById("2ndAnswer").disabled = "true";
        document.getElementById("3rdAnswer").disabled = "true";
        document.getElementById("4thAnswer").disabled = "true";
        var rand = (Math.floor(Math.random() * 17) + 1) * 1000;
        setTimeout(() => {
            var chosen = Math.floor(Math.random() * 4) + 1;
            var e;
            switch (chosen) {
                case 1:
                    document.getElementById('1stAnswer').checked = true;
                    e = 1
                    break;
                case 2:
                    document.getElementById('2ndAnswer').checked = true;
                    e = 2
                    break;
                case 3:
                    document.getElementById('3rdAnswer').checked = true;
                    e = 3
                    break;
                case 4:
                    document.getElementById('4thAnswer').checked = true;
                    e = 4
                    break;
            }
            onAgentChoosingAnswer(e)
        }, rand)
    }

    function player() {
        document.getElementById("1stAnswer").disabled = false;
        document.getElementById("2ndAnswer").disabled = false;
        document.getElementById("3rdAnswer").disabled = false;
        document.getElementById("4thAnswer").disabled = false;
    }

    function gameFlow() {
        //await sleep(3000);
        clearTimeout(timerInterval)
        if (gameCounter > 20) {
            navigation('/TMfinished');
        }
        removeClasses();
        isPlayerTurn.current = !isPlayerTurn.current;
        setCurrentQuestion(nowOnline.questions[gameCounter.current].question);
        setFirstAnswer(nowOnline.questions[gameCounter.current].firstAnswer);
        setSecondAnswer(nowOnline.questions[gameCounter.current].secondAnswer);
        setThirdAnswer(nowOnline.questions[gameCounter.current].thirdAnswer);
        setFourthAnswer(nowOnline.questions[gameCounter.current].fourthAnswer);
        setTimerClock(20);
        timer();
        if (isPlayerTurn.current) {
            player();
            setPoints(playerPoints.current);
            setQuestionCounter(playerQuestionCounter.current);
            playerQuestionCounter.current += 1;
        }
        else {
            agent();
            setPoints(agentPoints.current);
            setQuestionCounter(agentQuestionCounter.current);
            agentQuestionCounter.current += 1;
        }
    }

    function answerCheck(ans) {
        switchAnswer(nowOnline.questions[gameCounter.current].rightAnswer);
        if (isPlayerTurn) {
            if (ans === nowOnline.questions[gameCounter.current].rightAnswer) {
                playerPoints.current += 100;
            }
            else {
                if (playerPoints.current > 0) {
                    playerPoints.current -= 100;
                }
            }
            setPoints(playerPoints.current);
        }
        else {
            if (ans === nowOnline.questions[gameCounter.current].rightAnswer) {
                agentPoints.current += 100;
            }
            else {
                if (agentPoints.current > 0) {
                    agentPoints.current -= 100;
                }
            }
            setPoints(agentPoints.current);
        }
    }

    useEffect(() => {
        document.getElementById('startGameModalBtn').click();
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
                                <br />
                                <b>After clicking "Start game", the game will start within 3 seconds.</b>
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
                        <input type="radio" id="1stAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='1' onChange={onChoosingAnswer}></input>
                        <label className="btn question-btn" htmlFor="1stAnswer" id="1stAnswerLabel">{firstAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="2ndAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='2' onChange={onChoosingAnswer}></input>
                        <label className="btn question-btn" htmlFor="2ndAnswer" id="2ndAnswerLabel">{secondAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="3rdAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='3' onChange={onChoosingAnswer}></input>
                        <label className="btn question-btn jusify-content-center" htmlFor="3rdAnswer" id="3rdAnswerLabel">{thirdAnswer}</label>
                    </div>
                    <div className='col-xl-3 d-flex justify-content-center col-sm-6'>
                        <input type="radio" id="4thAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='4' onChange={onChoosingAnswer}></input>
                        <label className="btn btn-primary question-btn" htmlFor="4thAnswer" id="4thAnswerLabel">{fourthAnswer}</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;