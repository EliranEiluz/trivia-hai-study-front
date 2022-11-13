import './GamePage.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GamePageNavBar from './GamePageNavBar';
import GamePageModals from './GamePageModals';



/*
 * This component holds the game page and it's logic, for any available mode.
*/
function GamePage({ nowOnline }) {

    const TIME_FOR_QUESTION = 20;

    const PRESENTAGE_TO_ADD = 100 / TIME_FOR_QUESTION;
    
    const NUM_OF_ROUNDS = 20

    // translation variable.
    const { t } = useTranslation();

    // the time to answer each question.
    const timeLeft = useRef(20);

    // the variable to show the current time.
    const [currentTime, setCurrentTime] = useState(20)

    // the prestentage of the progress bar. starting from 0, as the time passed at the start of each question is 0.
    const presentage = useRef(0);

    // the return value from setTimeout of the countdown clock of each question.
    const timerInterval = useRef(null);

    // the value of the chosen answer by the agent when playing on "Play With Agent" mode
    const playWithAgentOperations = useRef(null);

    // The return value from setTimeout on the agent turn
    const agentTimeout = useRef(null);

    // react navigation variable.
    var navigation = useNavigate();

    // game variables.
    const playerPoints = useRef(0);
    const agentPoints = useRef(0);
    const playerQuestionCounter = useRef(1);
    const agentQuestionCounter = useRef(1);

    // the current question string.
    const [currentQuestion, setCurrentQuestion] = useState('');

    // the current optional answers strings.
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [fourthAnswer, setFourthAnswer] = useState('');

    // boolean variable to tell who holds the turn right now.
    const isPlayerTurn = useRef(false);

    // the number of the current question (now, out of 10).
    const [questionCounter, setQuestionCounter] = useState(1);

    // counting the number of turns (player and agent). so now, out of 20.
    const gameCounter = useRef(0);

    // boolean variable to tell if the beep that starts on the last 5 seconds to answer the question is now playing.
    const isBeepPlaying = useRef(false)

    // the beep sound of the last 5 seconds.
    const beep = useRef(new Audio('https://sounds-mp3.com/mp3/0012921.mp3'));

    // the width of the avatars depending on screen size.
    const avatarWidth = useRef(0);

    // a boolean variable to tell if it's the first round of the game. used for the avatarWidth.
    const firstTime = useRef(true);


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
        clearTimeout(timerInterval);
        beep.current.pause();
        navigation('/TMfinished');
    }


    /*
    * 1.Name: makeBlink
    * 2.Parameters: chosen, the chosen answer by the agent/player.
    * 3.Return value: none
    * 4.Description: in each round, after the agent/player chose an answer, this function is called.
    *                This function makes the card of the chosen answer to blink, so it will be clear that this is the chosen answer.
    *                after adding the blinking class to the chosen answer, the function sleeps for X seconds(now X=2),
    *                so the blink will appear for X seconds. 
    */
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
            default:
                return;
        }
        await sleep(2000)
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
        if (!nowOnline.singlePlayer) {
            clearTimeout(agentTimeout.current)
        }
        choosingAnswer(parseInt(e.target.value));
    }

    /*
    * 1.Name: choosingAnswer
    * 2.Parameters: val, the value of the chosen answer.
    * 3.Return value: none
    * 4.Description: This function is called immediatly after choosing an answer by the player/agent.
    *                if the player is the one who chose the answer, so this function is called from the onChoosingAnswer function,
    *                which is the event listener of the answer radio buttons. If the agent is the one who chose the answer,
    *                so the function is called from the agent function.
    *                This function calls "afterChoosingAnswer" function, which disables the answers button, so the user cannot change it's
    *                answer after choosing. after that, the function stops the last 5 seconds beep, and returns it to default 0 time.
    *                After that, the function clears the question timer's timeout, make the chosen answer blink by calling "makeBlink" function,
    *                check which is the right answer and mark it, increasing the game counter variable and check if it was the last round.
    *                If it was, the function returns. If not, it calls the gameFlow function to run another round.
    */
    async function choosingAnswer(val) {

        // disable the answers buttons
        afterChoosingAnswer();

        // stop the beep, if it was on, and set it back to 0.
        beep.current.pause();
        beep.current.currentTime = 0;

        // clear the question timer's timeout.
        clearTimeout(timerInterval.current)

        // check if an answer was chosen(in case the user/agent did not chose an answer by the given time, val is 0),
        // and if so, make the chosen answer button blink.
        if (val !== 0) {
            await makeBlink(val);
        }

        // mark the right answer with green color.
        await answerCheck(val);

        // increasing the game counter variable and check if the game is finished. If yes, call gameFinished and return.
        // If not, call gameFlow to run another round.
        gameCounter.current += 1;
        if (gameCounter.current === NUM_OF_ROUNDS) {
            gameFinished();
            return;
        }
        gameFlow();
    }

    /*
    * 1.Name: timer
    * 2.Parameters: none
    * 3.Return value: none
    * 4.Description: This function is responsible on the timer clock for each question, which is displays to the user by
    *                a progress bar, and in the last 5 seconds also by text and beep.
    */
    function timer() {

        // timeLeft is set to X, X is the time for each question. So, if there is time left, make the following:
        if (timeLeft.current > 0) {

            // call the function again in 1 second.
            timerInterval.current = setTimeout(timer, 1000);

            // decrease timeLeft by 1.
            timeLeft.current--;

            // set the current time to the time after decreasing.
            setCurrentTime(timeLeft.current)

            // add PRESENTAGE_TO_ADD% width to the progress bar.
            presentage.current += PRESENTAGE_TO_ADD;
            document.getElementById("prog-bar").style.width = presentage.current + "%";
            if (timeLeft.current < 6 && !isBeepPlaying.current) {
                document.getElementById("prog-bar").classList.replace("bg-dark", "bg-danger");
                document.getElementById("timeText").style.display = "block";
                beep.current.play();
                isBeepPlaying.current = true;
            }
        }
        else {
            choosingAnswer(0);
        }
    }


    /*
    * 1.Name: switchAnswer
    * 2.Parameters: rightanswer, the right answer to the current question.
    * 3.Return value: none
    * 4.Description: This function is called after the user/agent marked an answer, or after the time for the question is over.
    *                The function marks the right answer in green.
    */
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
            default:
                return;
        }
    }

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function removeClasses() {
        document.getElementById("1stAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("2ndAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("3rdAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("4thAnswerLabel").classList.remove("rightAnswer");
        document.getElementById("1stAnswerLabel").classList.remove("disableAnswersTouchScreen");
        document.getElementById("2ndAnswerLabel").classList.remove("disableAnswersTouchScreen");
        document.getElementById("3rdAnswerLabel").classList.remove("disableAnswersTouchScreen");
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



    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    async function agent() {
        document.getElementById("1stAnswer").disabled = "true";
        document.getElementById("2ndAnswer").disabled = "true";
        document.getElementById("3rdAnswer").disabled = "true";
        document.getElementById("4thAnswer").disabled = "true";
        var rand = (Math.floor(Math.random() * (TIME_FOR_QUESTION - 1)) + 1) * 1000;
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
                default:
                    return;
            }
            choosingAnswer(e)
        }, rand)
    }

    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function removeDisabled() {
        document.getElementById("1stAnswer").disabled = false;
        document.getElementById("2ndAnswer").disabled = false;
        document.getElementById("3rdAnswer").disabled = false;
        document.getElementById("4thAnswer").disabled = false;
    }

    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function afterChoosingAnswer() {
        document.getElementById("1stAnswerLabel").classList.add("disableAnswers");
        document.getElementById("2ndAnswerLabel").classList.add("disableAnswers");
        document.getElementById("3rdAnswerLabel").classList.add("disableAnswers");
        document.getElementById("4thAnswerLabel").classList.add("disableAnswers");
    }

    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function gameFlow() {
        if (firstTime.current) {
            avatarWidth.current = document.querySelector(".avatarImg").width;
            firstTime.current = false;
        }
        document.getElementById("timeText").style.display = "none";
        document.getElementById("prog-bar").classList.replace("bg-danger", "bg-dark");
        document.getElementById("prog-bar").style.width = "0%"
        presentage.current = 0;
        timeLeft.current = 20;
        clearTimeout(timerInterval)
        isBeepPlaying.current = false;
        removeClasses();
        isPlayerTurn.current = !isPlayerTurn.current;
        setCurrentQuestion(nowOnline.questions[gameCounter.current].question);
        setFirstAnswer(nowOnline.questions[gameCounter.current].firstAnswer);
        setSecondAnswer(nowOnline.questions[gameCounter.current].secondAnswer);
        setThirdAnswer(nowOnline.questions[gameCounter.current].thirdAnswer);
        setFourthAnswer(nowOnline.questions[gameCounter.current].fourthAnswer);
        timer();
        if (isPlayerTurn.current) {
            document.getElementById("playerImg").style.width = avatarWidth.current * 1.3 + "px";
            document.getElementById("agentImg").style.width = avatarWidth.current / 1.5 + "px";
            document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
            removeDisabled();
            if (!nowOnline.singlePlayer) {
                playWithAgent();
            }
            setQuestionCounter(playerQuestionCounter.current);
            playerQuestionCounter.current += 1;
        }
        else {
            document.body.style.backgroundImage = "linear-gradient(0deg,#c0a0c3, #c0a0c3)";
            document.getElementById("playerImg").style.width = avatarWidth.current / 1.5 + "px";
            document.getElementById("agentImg").style.width = avatarWidth.current * 1.3 + "px";
            agent();
            setQuestionCounter(agentQuestionCounter.current);
            agentQuestionCounter.current += 1;
        }
    }

    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
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
        }
        document.getElementById("1stAnswerLabel").classList.remove("blink");
        document.getElementById("2ndAnswerLabel").classList.remove("blink");
        document.getElementById("3rdAnswerLabel").classList.remove("blink");
        document.getElementById("4thAnswerLabel").classList.remove("blink");
        await sleep(2000);
    }

    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
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
                default:
                    return;
            }
            choosingAnswer(e)
        }, playWithAgentOperations.current[playerQuestionCounter.current - 1].time)
    }


    /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    useEffect(() => {
        if (nowOnline.singlePlayer) {
            document.getElementById('singlePlayerInstructions').style.display = "block";
        }
        else {
            document.getElementById('playWithAgentInstructions').style.display = "block";
            playWithAgentOperations.current = require('./agent.json');
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

            <GamePageModals beep={beep} timerInterval={timerInterval} gameFlow={gameFlow} />

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
                                                {t('question')} {questionCounter}/10
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