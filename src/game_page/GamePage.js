import './GamePage.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GamePageNavBar from './GamePageNavBar';
import GamePageModals from './GamePageModals';
import { PlayAgainstAgent } from './PlayAgainstAgent'
import { PlayWithGivenAmountOfQuestions } from './PlayWithGivenAmountOfQuestions'
import { PlayAgainstTheClock } from './PlayAgainstTheClock'
/*
 * This component holds the game page and it's logic, for any available mode.
*/
function GamePage({ nowOnline }) {

    const playModeClass = useRef(null)

    const amountOfQuestions = useRef(20)

    // translation variable.
    const { t } = useTranslation();

    // the variable to show the current time.
    const [currentTime, setCurrentTime] = useState(20)


    // the value of the chosen answer by the agent when playing on "Play With Agent" mode
    const playWithAgentOperations = useRef(null);


    // react navigation variable.
    var navigation = useNavigate();

    // game variables.
    const playerPoints = useRef(0);
    const agentPoints = useRef(0);

    // the current question string.
    const [currentQuestion, setCurrentQuestion] = useState('');

    // the current optional answers strings.
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');


    // the number of the current question (now, out of 10).
    const [questionCounter, setQuestionCounter] = useState(1);

    /*
    * 1.Name: gameFinished
    * 2.Parameters: none
    * 3.Return value: none
    * 4.Description: After X rounds(now X=20), the game is finished and this function is called.
    *                The function checks who has more points, the player or the agent, and according to that fills the "nowOnline.isWin"
    *                value, when "nowOnline" is a common variable to all components.
    *                If the player won, than isWin=2.
    *                If the agent won, than isWin=1.
    *                If it's a draw, than isWin=0.
    *                after setting the variabe value, the function clears the clock timeOut, stops the beep of the last 5 seconds
    *                and navigates to the game finish page, to declare the winner.
    */
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
        navigation('/TMfinished');
    }


    /*
    * 1.Name: onChoosingAnswer
    * 2.Parameters: e, an answer radio button checked event.
    * 3.Return value: none
    * 4.Description: This function is called when the Player choosing an answer. This function checks if the game is a "Play With Agent"
    *                game, and if so clears the timeout foe the agent(beacuse the user already chose an asswer for this question ,so the agent cannot play.)
    *                In any case, the onAgentC
    */
    async function onChoosingAnswer(e) {
        playModeClass.current.onChoosingAnswer(parseInt(e.target.value));
    }


    function setQuestions(index) {
        // setCurrentQuestion(nowOnline.questions[gameCounter.current].question);
        // setFirstAnswer(nowOnline.questions[gameCounter.current].firstAnswer);
        // setSecondAnswer(nowOnline.questions[gameCounter.current].secondAnswer);
        // setThirdAnswer(nowOnline.questions[gameCounter.current].thirdAnswer);
        // setFourthAnswer(nowOnline.questions[gameCounter.current].fourthAnswer);

        setCurrentQuestion(nowOnline.questions[index].question);
        setFirstAnswer(nowOnline.questions[index].firstAnswer);
        setSecondAnswer(nowOnline.questions[index].secondAnswer);
        setThirdAnswer(nowOnline.questions[index].thirdAnswer);
        setFourthAnswer(nowOnline.questions[index].fourthAnswer);
        console.log('imHere')
    }
    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function gameFlow() {
        if (nowOnline.playType == 0) {
            amountOfQuestions.current = 10
            playModeClass.current = new PlayAgainstAgent(20, 20, setQuestionCounter, nowOnline.questions, setQuestions, playerPoints, agentPoints, setCurrentTime, null);
            playModeClass.current.gameFlow();
        }
        else if (nowOnline.playType == 1) {
            amountOfQuestions.current = 10
            playModeClass.current = new PlayAgainstAgent(20, 20, setQuestionCounter, nowOnline.questions, setQuestions, playerPoints, agentPoints, setCurrentTime, playWithAgentOperations);
            playModeClass.current.gameFlow();
        }
        else if (nowOnline.playType == 2) {
            playModeClass.current = new PlayWithGivenAmountOfQuestions(20, 20, setQuestionCounter, nowOnline.questions, setQuestions, playerPoints, setCurrentTime)
            playModeClass.current.gameFlow();
        }
        else if (nowOnline.playType == 4) {
            playModeClass.current = new PlayAgainstTheClock(20, 30, setQuestionCounter, nowOnline.questions, setQuestions, playerPoints, setCurrentTime)
            playModeClass.current.gameFlow();
        }
    }

    // function playAgainstAgent() {
    //     if (firstTime.current) {
    //         avatarWidth.current = document.querySelector(".avatarImg").width;
    //         firstTime.current = false;
    //         amountOfQuestions.current = 10
    //     }
    //     initializeBeforeTurn();
    //     isPlayerTurn.current = !isPlayerTurn.current;
    //     setQuestions();
    //     timer();
    //     if (isPlayerTurn.current) {
    //         document.getElementById("playerImg").style.width = avatarWidth.current * 1.3 + "px";
    //         document.getElementById("agentImg").style.width = avatarWidth.current / 1.5 + "px";
    //         document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
    //         if (nowOnline.playType == 1) {
    //             playWithAgent();
    //         }
    //         setQuestionCounter(playerQuestionCounter.current);
    //         playerQuestionCounter.current += 1;
    //     }
    //     else {
    //         document.body.style.backgroundImage = "linear-gradient(0deg,#c0a0c3, #c0a0c3)";
    //         document.getElementById("playerImg").style.width = avatarWidth.current / 1.5 + "px";
    //         document.getElementById("agentImg").style.width = avatarWidth.current * 1.3 + "px";
    //         agent();
    //         setQuestionCounter(agentQuestionCounter.current);
    //         agentQuestionCounter.current += 1;
    //     }
    // }

    // function playWithGivenAmountOfQuestions() {
    //     if (firstTime.current) {
    //         document.getElementById("playerImg").style.width = document.querySelector(".avatarImg").width * 1.3 + "px";
    //         document.getElementById("agentCol").classList.add('d-none')
    //         firstTime.current = false;
    //         isPlayerTurn.current = true;
    //     }
    //     initializeBeforeTurn();
    //     setQuestions();
    //     timer();
    //     setQuestionCounter(playerQuestionCounter.current)
    //     playerQuestionCounter.current += 1
    // }


    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    useEffect(() => {
        if (nowOnline.playType == 0) {
            document.getElementById('singlePlayerInstructions').style.display = "block";
        }
        else if (nowOnline.playType == 1) {
            document.getElementById('playWithAgentInstructions').style.display = "block";
            playWithAgentOperations.current = require('./agent.json');
        }
        else if (nowOnline.playType == 2) {

        }
        else if (nowOnline.playType == 4) {

        }
        if (document.querySelector("html").lang === "en") {
            nowOnline.questions = require('./questions.json');
            document.getElementById("leaveGameBtnLi").classList.add("ms-auto");
        }
        else {
            nowOnline.questions = require('./questions-he.json');
            document.getElementById("leaveGameBtnLi").classList.add("me-auto");
        }
        document.getElementById('startGameModalBtn').click();
    }, [nowOnline])


    return (
        <>
            <GamePageNavBar />

            <GamePageModals playModeClass={playModeClass} gameFlow={gameFlow} />
            <div className='container-fluid' id="gamePageContainer">
                <div className='row justify-content-center'>
                    <div className='col-md-9 col-sm-11 col-xs-12 justify-content-sm-center justify-content-md-start'>
                        <div className='card' id="question-card">
                            <div className='card-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-xs-1 col-sm-4 avatarsRow d-flex justify-content-center align-items-center' id="playerCol">
                                            <div id="playerDiv" className='avatarDiv'>
                                                <div className='avatarTxt'>{t('you')}</div>
                                                <img src={require("../PNG/avatar1.png")} className="avatarImg" id="playerImg" alt="player's Avatar"></img>
                                                <div className='avatarTxt'>{playerPoints.current}</div>
                                            </div>
                                        </div>
                                        <div className='col-xs-1 col-sm-4 time d-flex flex-column justify-content-center' id="timeCol">
                                            <div>
                                                {t('question')} {questionCounter}/{amountOfQuestions.current}
                                            </div>
                                            <div className="progress w-100">
                                                <div className="progress-bar progress-bar-striped bg-dark" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div id="timeText">{t('time')}: {currentTime} {t('seconds')}</div>
                                        </div>
                                        <div className='col-xs-1 col-sm-4 avatarsRow d-flex justify-content-center align-items-center' id="agentCol">
                                            <div id="agentDiv" className='avatarDiv'>
                                                <div className='avatarTxt'>{t('agent')}</div>
                                                <img src={require("../PNG/avatar3.png")} className="avatarImg" id="agentImg" alt="agent's Avatar"></img>
                                                <div className='avatarTxt'>{agentPoints.current}</div>
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