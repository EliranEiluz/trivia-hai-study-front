import './TMFinished.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { serverIp } from '../index.js';
import '../NavBar.css';

function TMFinished({ nowOnline }) {
    const { t } = useTranslation();

    const [playerPoints, setPlayerPoints] = useState(nowOnline.playerPoints);
    const [agentPoints, setAgentPoints] = useState(nowOnline.agentPoints);
    var navigation = useNavigate();
    const roundNumber = useRef(nowOnline.roundNumber)
    const [timerClock, setTimerClock] = useState(10);

    function winOrLose() {
        var message = document.getElementById('message');
        if (nowOnline.playType === 0 || nowOnline.playType === 1 || (nowOnline.playType === 4 && !nowOnline.isRoundPlaying)) {
            if (nowOnline.isWin == 2) {
                document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
                message.innerHTML = t('you_win') + " <i class='fa-solid fa-hands-clapping'></i>"
            }
            else if (nowOnline.isWin == 0) {
                message.innerHTML = t('you_lost') + " <i class='fa-solid fa-heart-crack'></i>"
            }
            else {
                message.innerHTML = t('draw') + " <i class='fa-solid fa-heart-crack'></i>"
            }
        }
        else if (nowOnline.playType === 2 || nowOnline.playType === 4) {
            document.getElementById("agentPoints").classList.add('d-none');
            setPlayerPoints(nowOnline.isWin + "/20");
            if(nowOnline.isWin < 10) {
                message.innerHTML = t('you_can_do_better') + " <i class='fa-solid fa-heart-crack'></i>"
            }
            else if (nowOnline.isWin < 15) {
                message.innerHTML = t('very_nice') + " <i class='fa-solid fa-hands-clapping'></i>"
            }
            else {
                message.innerHTML = t('you_are_genius') + " <i class='fa-solid fa-hands-clapping'></i>"
            }
        }
        else if(nowOnline.playType === 3 && nowOnline.isRoundPlaying && nowOnline.roundNumber === 0) {
            roundNumber.current = t('train')
            document.getElementById('TMRoundCounter').classList.remove('d-none');
            if(nowOnline.isWin === 2) {
                message.innerHTML = t('keep_going_next_round') + " <i class='fa-solid fa-hands-clapping'></i>"
                nowOnline.playerWins++;
            }
            else if(nowOnline.isWin === 0) {
                message.innerHTML = t('do_better_next_round') + " <i class='fa-solid fa-heart-crack'></i>"
                nowOnline.agentWins++;
            }
            else {
                message.innerHTML = t('tie_round') + " <i class='fa-solid fa-heart-crack'></i>"
            }
        }
        else if (nowOnline.playType === 3 && nowOnline.isRoundPlaying && nowOnline.roundNumber <= nowOnline.amountOfRounds) {
            document.getElementById('TMRoundCounter').classList.remove('d-none');
            if(nowOnline.isWin === 2) {
               
                nowOnline.playerWins++;
            }
            else if(nowOnline.isWin === 0) {
               
                nowOnline.agentWins++;
            }
            else {
                message.innerHTML = t('tie_round') + " <i class='fa-solid fa-heart-crack'></i>"
            }
        }
        nowOnline.roundNumber++;
        if(nowOnline.roundNumber === (nowOnline.amountOfRounds + 1)) {
            nowOnline.roundNumber = 1;
        }
        updateRoundNumber();
    }

    function toHomePageBtnClick() {
        document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
        navigation('/welcome');
    }

    function updateRoundNumber() {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname: nowOnline.onlineUser.fullName, roundNumber: nowOnline.roundNumber}),
            credentials: 'include'
        };
        fetch(serverIp.ip + "/User/UpdateRoundNumber", request)
    }

    useEffect(() => {
        winOrLose();
        var secondsPassed = 0;
        const interval = setInterval(() => {
            if (secondsPassed < 10) {
                setTimerClock(prevTimerClock => prevTimerClock - 1);
                secondsPassed++;
            }
            else {
                clearInterval(interval);
                toHomePageBtnClick();
            }
        }, 1000)
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div id="navBar">
                <ul className="nav py-3">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">{t('home')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('about')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('scoreboard')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{t('switch_mode')}</Link>
                    </li>
                </ul>
            </div>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-xl-8 col-xs-12'>
                        <div className='card' id="finishedCard">
                            <div className='card-body'>
                                <div className='container-fluid'>
                                    <div className='row row justify-content-md-center' id="WinOrLoseMessage">
                                        <center>
                                            <span id="TMRoundCounter" className='d-none'>{t('round')} {roundNumber.current}</span><br></br>
                                            <span id="message"></span>
                                        </center>
                                    </div>
                                    <div className='row justify-content-center' id="points">
                                        <center>
                                            <div id="playerPoints">{t('your_points')}: {playerPoints}</div>
                                            <div id="agentPoints"> {t('agent_points')}: {agentPoints}</div>
                                        </center>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <div className='col-xl-4'>
                                            <center>
                                                <button className='btn btn-primary backToHome-btn' id="backToHomeBtn" onClick={toHomePageBtnClick}>{t('back_to_home_page')}</button>
                                            </center>
                                        </div>
                                    </div>
                                    <div className='row justify-content-md-center' id="toHomePageTxt">
                                        {t('returning_home_page')} {timerClock} {t('seconds')}...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default TMFinished;