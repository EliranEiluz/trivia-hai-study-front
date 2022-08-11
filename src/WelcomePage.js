import './WelcomePage.css';
import { Link } from 'react-router-dom'
function WelcomePage({ nowOnline }) {
    nowOnline.fullName = "Itzik Levi";
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
                </ul>
            </div>
            <div className='container-fluid' id="WelcomePageContent">
                <div className='row justify-content-md-center'>
                    <div className='col-6 col-md-auto' id="logoDiv">
                        Logo here
                    </div>
                    <div className='row justify-content-md-center'>
                        <div className='col-6 col-md-auto' id="WelcomeMessage">
                            Welcome back, {nowOnline.fullName}! <br />
                            <i className="fa-solid fa-hand-wave"></i>
                            Please choose game mode:
                        </div>
                        <div className='row justify-content-md-center'>
                            <div className='col-6 col-md-auto' id="TrainingModeBtn">
                                <button className='btn btn-primary welcome-btn btn-lg'>Training Mode</button>
                            </div>
                            <div className='row justify-content-md-center'>
                                <div className='col-6 col-md-auto'>
                                    <button className='btn btn-primary welcome-btn btn-lg' id="GameModeBtn">Team Mode</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;