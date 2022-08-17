import './TMFinished.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TMFinished({ nowOnline }) {

    var navigation = useNavigate();
    const [timerClock, setTimerClock] = useState(10);
    function winOrLose() {
        var message = document.getElementById('message');
        if (nowOnline.isWin) {
            message.innerHTML = "WOW, you WIN! <i class='fa-solid fa-hands-clapping'></i>"
        }
        else {
            message.innerHTML = "Sorry, you LOST! <i class='fa-solid fa-heart-crack'></i>"
        }
    }

    function toHomePageBtnClick() {
        navigation('/');
    }

    useEffect(() => {winOrLose();
        var secondsPassed = 0;
        const interval = setInterval(() => {
            if(secondsPassed < 10) {
                setTimerClock(prevTimerClock => prevTimerClock-1);
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
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Scoreboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Switch Mode</Link>
                    </li>
                </ul>
            </div>
            <div className='container-fluid'>
                <div className='row justify-content-md-center'>
                    <div className='card w-50' id="finishedCard">
                        <div className='card-body'>
                            <div className='container-fluid'>
                                <div className='row row justify-content-md-center' id="WinOrLoseMessage">
                                    <center>
                                        <span id="message"></span>
                                    </center>
                                </div>
                                <div className='row justify-content-md-center' id="points">
                                    Your points: 700<br />
                                    Agent's points: 800
                                </div>
                                <div className='row justify-content-md-center'>
                                    <div className='col-4'>
                                        <center>
                                        <button className='btn btn-primary backToHome-btn' id="backToHomeBtn" onClick={toHomePageBtnClick}>Back to Home Page</button>
                                        </center>
                                    </div>
                                </div>
                                <div className='row justify-content-md-center' id="toHomePageTxt">
                                    Returning to home page in {timerClock} seconds...
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