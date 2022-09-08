import './TMFinished.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TMFinished({ nowOnline }) {
    const {t} = useTranslation();

    const [playerPoints, setPlayerPoints] = useState(nowOnline.playerPoints);
    const [agentPoints, setAgentPoints] = useState(nowOnline.agentPoints);
    var navigation = useNavigate();
    const [timerClock, setTimerClock] = useState(10);
    function winOrLose() {
        var message = document.getElementById('message');
        if (nowOnline.isWin == 2) {
            message.innerHTML = t('you_win') + " <i class='fa-solid fa-hands-clapping'></i>"
        }
        else if (nowOnline.isWin == 0) {
            message.innerHTML = t('you_lost') + " <i class='fa-solid fa-heart-crack'></i>"
        }
        else {
            message.innerHTML = t('draw') + " <i class='fa-solid fa-heart-crack'></i>"
        }
        console.log(nowOnline.playerPoints);
    }

    function toHomePageBtnClick() {
        navigation('/');
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
                navigation('/')
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
                                            <span id="message"></span>
                                        </center>
                                    </div>
                                    <div className='row justify-content-md-center' id="points">
                                        {t('your_points')}: {playerPoints}<br />
                                        {t('agent_points')}: {agentPoints}
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