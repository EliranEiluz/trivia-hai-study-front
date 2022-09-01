import './GamePage.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function GamePage({ nowOnline }) {

    const timeLeft = useRef(20);
    const timerInterval = useRef(null);
    const playWithAgentOperations = useRef(null);
    const agentTimeout = useRef(null);
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
    const [pointsStr, setPointsStr] = useState("Points");
    const [turn, setTurn] = useState("It's your turn!");
    const isBeepPlaying = useRef(false)
    const beep = useRef(new Audio('https://sounds-mp3.com/mp3/0012921.mp3'));
    function gameFinished() {
        nowOnline.playerPoints = playerPoints.current;
        nowOnline.agentPoints = agentPoints.current;
        if (playerPoints.current > agentPoints.current) {
            nowOnline.isWin = 2;
        }
        else if (agentPoints.current > playerPoints.current) {
            nowOnline.isWin = 0;
        }
        else {
            nowOnline.isWin = 1;
        }
        clearTimeout(timerInterval);
        navigation('/TMfinished');
    }

    async function makeBlink(chosen) {
        switch (chosen) {
            case 1:
                document.getElementById('1stAnswerLabel').classList.add("blink");
                break;
            case 2:
                document.getElementById('2ndAnswerLabel').classList.add("blink");
                break;
            case 3:
                document.getElementById('3rdAnswerLabel').classList.add("blink");
                break;
            case 4:
                document.getElementById('4thAnswerLabel').classList.add("blink");
                break;
        }
        await sleep(2000)
    }

    async function onChoosingAnswer(e) {
        if (!nowOnline.singlePlayer) {
            clearTimeout(agentTimeout.current)
        }
        onAgentChoosingAnswer(parseInt(e.target.value));
    }

    async function onAgentChoosingAnswer(val) {
        beep.current.pause();
        beep.current.currentTime = 0;
        clearTimeout(timerInterval.current)
        if (val != 0) {
            await makeBlink(val);
        }
        await answerCheck(val);
        gameCounter.current += 1;
        if (gameCounter.current == 20) {
            gameFinished();
            return;
        }
        gameFlow();
    }

    function timer() {
        if (timeLeft.current > 0) {
            setTimerClock((prevTimerClock) => prevTimerClock - 1);
            timerInterval.current = setTimeout(timer, 1000);
            timeLeft.current--;
            if (timeLeft.current < 6 && !isBeepPlaying.current) {
                beep.current.play();
                isBeepPlaying.current = true;
            }
        }
        else {
            onAgentChoosingAnswer(0);
        }
    }

    function leaveGame() {
        clearTimeout(timerInterval.current);
        beep.current.pause();
        navigation('/welcome')
    }

    function leaveToHomeGame() {
        clearTimeout(timerInterval.current);
        beep.current.pause();
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


    async function agent() {
        document.getElementById("1stAnswer").disabled = "true";
        document.getElementById("2ndAnswer").disabled = "true";
        document.getElementById("3rdAnswer").disabled = "true";
        document.getElementById("4thAnswer").disabled = "true";
        var rand = (Math.floor(Math.random() * 19) + 1) * 1000;
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

    function removeDisabled() {
        document.getElementById("1stAnswer").disabled = false;
        document.getElementById("2ndAnswer").disabled = false;
        document.getElementById("3rdAnswer").disabled = false;
        document.getElementById("4thAnswer").disabled = false;
    }

    function gameFlow() {
        timeLeft.current = 20;
        clearTimeout(timerInterval)
        isBeepPlaying.current = false;
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
            removeDisabled();
            document.getElementById('turnBtn').classList.replace('btn-dark', 'btn-success')
            setTurn("It's your turn!")
            setPointsStr("Points");
            if (!nowOnline.singlePlayer) {
                playWithAgent()
            }
            setPoints(playerPoints.current);
            setQuestionCounter(playerQuestionCounter.current);
            playerQuestionCounter.current += 1;
        }
        else {
            document.getElementById('turnBtn').classList.replace('btn-success', 'btn-dark')
            setPointsStr("Agent's Points");
            setTurn("It's agent's turn")
            agent();
            setPoints(agentPoints.current);
            setQuestionCounter(agentQuestionCounter.current);
            agentQuestionCounter.current += 1;
        }
    }

    async function answerCheck(ans) {
        switchAnswer(nowOnline.questions[gameCounter.current].rightAnswer);
        if (isPlayerTurn.current) {
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
        document.getElementById("1stAnswerLabel").classList.remove("blink");
        document.getElementById("2ndAnswerLabel").classList.remove("blink");
        document.getElementById("3rdAnswerLabel").classList.remove("blink");
        document.getElementById("4thAnswerLabel").classList.remove("blink");
        await sleep(2000);
    }

    function playWithAgent() {
        agentTimeout.current = setTimeout(() => {
            var chosen = playWithAgentOperations.current[playerQuestionCounter.current - 1].answer;
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
        }, playWithAgentOperations.current[playerQuestionCounter.current - 1].time)
    }


    useEffect(() => {
        if (nowOnline.singlePlayer) {
            document.getElementById('singlePlayerInstructions').style.display = "block";
        }
        else {
            document.getElementById('playWithAgentInstructions').style.display = "block";
            playWithAgentOperations.current = require('./agent.json');
        }
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
                            <p id="singlePlayerInstructions">
                                Hello and welcome to Project Trivia game! <br />
                                In Single-Player training mode, you will be playing against an agent, when each of you has 10 questions to answer on.<br />
                                The one who holds the turn has 20 seconds to answer the question.<br />
                                Right answer will increase your points by 100.<br />
                                Wrong answer (if you have more than 0 points) will decrease your points by 100.<br />
                                The one who has more points after the 10 questions, wins!<br />
                                <b>Hope you will enjoy the game.</b>
                                <br />
                            </p>
                            <p id="playWithAgentInstructions">
                                Hello and welcome to Project Trivia game! <br />
                                In Play With Agent training mode, you will be playing against an agent, when each of you has 10 questions to answer on.<br />
                                The one who holds the turn has 20 seconds to answer the question.<br />
                                Beacuse an agent is also playing with you, At any time this agent can answer the question instead of you.
                                Right answer will increase your points by 100.<br />
                                Wrong answer (if you have more than 0 points) will decrease your points by 100.<br />
                                The one who has more points after the 10 questions, wins!<br />
                                <b>Hope you will enjoy the game.</b>
                                <br />
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
                <div className='row justify-content-center'>
                    <div className='col-xl-11 col-sm-12 justify-content-sm-center justify-content-md-start'>
                        <div className='card' id="question-card">
                            <div className='card-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-xl-5 d-flex col-xs-5' id="pointsDiv">
                                            {pointsStr}: {points} <br />
                                            Question {questionCounter}/10
                                        </div>
                                        <div className='col-xl-4 d-flex col-xs-4 justify-content-md-start' id="time">
                                            <div><span id="timeWord">Time:</span><br /> {timerClock} seconds</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-xl-3 justify-content-md-end justify-content-sm-center col-sm-3' id="turnCol">
                                                <div className='btn btn-dark float-end' id="turnBtn"><span id="turnStr">{turn}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row justify-content-center' id="question">
                                        {currentQuestion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="answersRow" role="group" aria-label="Basic radio toggle button group">
                    <div className='row' id="firstAnswerRow">
                        <div className='col-xl-6 d-flex justify-content-center col-sm-6'>
                            <input type="radio" id="1stAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='1' onChange={onChoosingAnswer}></input>
                            <label className="btn question-btn" htmlFor="1stAnswer" id="1stAnswerLabel">{firstAnswer}</label>
                        </div>
                        <div className='col-xl-6 d-flex justify-content-center col-sm-6'>
                            <input type="radio" id="2ndAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='2' onChange={onChoosingAnswer}></input>
                            <label className="btn question-btn" htmlFor="2ndAnswer" id="2ndAnswerLabel">{secondAnswer}</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-6 d-flex justify-content-center col-sm-6'>
                            <input type="radio" id="3rdAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='3' onChange={onChoosingAnswer}></input>
                            <label className="btn question-btn jusify-content-center" htmlFor="3rdAnswer" id="3rdAnswerLabel">{thirdAnswer}</label>
                        </div>
                        <div className='col-xl-6 d-flex justify-content-center col-sm-6'>
                            <input type="radio" id="4thAnswer" name="answerRadio" autoComplete='off' className='btn-check' value='4' onChange={onChoosingAnswer}></input>
                            <label className="btn question-btn" htmlFor="4thAnswer" id="4thAnswerLabel">{fourthAnswer}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage;