import './GamePage.css';
import { Question } from './index.js';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function GamePage({ nowOnline }) {
    const { t } = useTranslation();
    const timeLeft = useRef(20);
    const presentage = useRef(0);
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
    const [pointsStr, setPointsStr] = useState(t('points'));
    const [turn, setTurn] = useState(t('your_turn'));
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
        beep.current.pause();
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
        afterChoosingAnswer();
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
            presentage.current += 5;
            document.getElementById("prog-bar").style.width = presentage.current + "%";
            if (timeLeft.current < 6 && !isBeepPlaying.current) {
                document.getElementById("prog-bar").classList.replace("bg-dark", "bg-danger");
                document.getElementById("timeText").style.display = "block";
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
        document.getElementById("1stAnswerLabel").classList.remove("disableAnswers");
        document.getElementById("2ndAnswerLabel").classList.remove("disableAnswers");
        document.getElementById("3rdAnswerLabel").classList.remove("disableAnswers");
        document.getElementById("4thAnswerLabel").classList.remove("disableAnswers");
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

    function afterChoosingAnswer() {
        document.getElementById("1stAnswerLabel").classList.add("disableAnswers");
        document.getElementById("2ndAnswerLabel").classList.add("disableAnswers");
        document.getElementById("3rdAnswerLabel").classList.add("disableAnswers");
        document.getElementById("4thAnswerLabel").classList.add("disableAnswers");
    }

    function gameFlow() {
        document.getElementById("timeText").style.display = "none";
        document.getElementById("prog-bar").classList.replace("bg-danger", "bg-dark");
        document.getElementById("prog-bar").style.width = "0%"
        presentage.current = 0;
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
            setTurn(t('your_turn'))
            setPointsStr(t('points'));
            if (!nowOnline.singlePlayer) {
                playWithAgent()
            }
            setPoints(playerPoints.current);
            setQuestionCounter(playerQuestionCounter.current);
            playerQuestionCounter.current += 1;
        }
        else {
            document.getElementById('turnBtn').classList.replace('btn-success', 'btn-dark')
            setPointsStr(t('agent_points'));
            setTurn(t('agent_turn'))
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
        var questionsArray;
        if (nowOnline.singlePlayer) {
            document.getElementById('singlePlayerInstructions').style.display = "block";
        }
        else {
            document.getElementById('playWithAgentInstructions').style.display = "block";
            playWithAgentOperations.current = require('./agent.json');
        }
        if (document.querySelector("html").lang == "en") {
            nowOnline.questions = require('./questions.json');
            document.getElementById("leaveGameBtnLi").classList.add("ms-auto");
            document.getElementById("turnBtn").classList.add("float-end");
        }
        else {
            nowOnline.questions = require('./questions-he.json');
            document.getElementById("leaveGameBtnLi").classList.add("me-auto");
            document.getElementById("turnBtn").classList.add("float-start");
        }
        document.getElementById('startGameModalBtn').click();
    }, [])
    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <a className="nav-link active" href="#leaveToHomeGameModal" data-bs-toggle="modal">{t('home')}</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('about')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('scoreboard')}</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#leaveGameModal" data-bs-toggle="modal">{t('switch_mode')}</a>
                    </li>
                    <li className="nav-item" id="leaveGameBtnLi">
                        <button className='btn btn-danger' id="leaveGameBtn" data-bs-toggle="modal" data-bs-target="#leaveGameModal">{t('leave_game')}</button>
                    </li>
                </ul>
            </div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#startGameModal" id="startGameModalBtn"></button>
            <div className="modal modal-lg fade" tabIndex="-1" aria-hidden="true" id="startGameModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('game_instructions')}</h5>
                        </div>
                        <div className="modal-body">
                            <p id="singlePlayerInstructions">
                                {t('single_player_instructions')}
                            </p>
                            <p id="playWithAgentInstructions">
                                {t('play_with_agent_instructions')}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={startGame}>{t('start_game')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>{t('back_to_home_page')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="leaveGameModal" tabIndex="-1" aria-labelledby="leaveGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveGameModalLabel">{t('leave_game')}</h5>
                        </div>
                        <div className="modal-body">
                            {t('leave_game_exp')}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveGame}>{t('leave_game')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="leaveToHomeGameModal" tabIndex="-1" aria-labelledby="leaveToHomeGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveToHomeGameModalLabel">{t('back_to_home_page')}</h5>
                        </div>
                        <div className="modal-body">
                            {t('leave_game_exp')}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>{t('back_to_home_page')}</button>
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
                                        <div className='col-xs-1 col-sm-4' id="pointsDiv">
                                            {pointsStr}: {points} <br />
                                            {t('question')} {questionCounter}/10
                                        </div>
                                        <div className='col-xs-1 col-sm-4 justify-content-end justify-content-sm-center' id="time">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-dark" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div id="timeText">{t('time')}: {timeLeft.current} {t('seconds')}</div>
                                        </div>
                                        <div className='col-xs-1 col-sm-4 d-xs-hidden d-none d-sm-block' id="turnCol">
                                            <div className='btn btn-dark' id="turnBtn"><span id="turnStr">{turn}</span></div>
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