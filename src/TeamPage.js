import './TeamPage.css';
import { Link } from 'react-router-dom'



function TeamPage() {

    var isMicrophoneOn = false;

    function micClick() {
        if(isMicrophoneOn) {
            document.getElementById("mic").innerHTML = "<i class='fa-solid fa-microphone'></i>"
            isMicrophoneOn = false;
        }
        else {
            document.getElementById("mic").innerHTML = "<i class='fa-solid fa-microphone-slash'></i>"
            isMicrophoneOn = true;
        }
    }

    

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
                    <li className="nav-item ms-auto">
                        <div className='btn btn-success' id="isInRoomIndicator">Roee is in the room!</div>
                    </li>
                </ul>
            </div>
            <div className="container-fluid" id="page_container">
                <div className='row'>
                    <div className='col-6'>
                        <div className='container-fluid'>
                            <div id="faded_background">
                                <div className="card scrollbar" id="teamPage_card">
                                    <div className="card-body overflow-auto">
                                        <div className='row'>
                                            <div className='col-1'></div>
                                            <div className='col-5' id="ourFriends">
                                                Our Friends
                                            </div>
                                            <div className='col-3'></div>
                                            <div className='col-3'>
                                                <button className='btn btn-primary teamPage-btn'>Add new Team</button>
                                            </div>
                                        </div>
                                        <hr className='blackHr'></hr>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                                        <span id="blink" className='greenblink'></span>
                                                    </div></th>
                                                    <th scope="col" id="teamName">
                                                        <div>HachiTovim</div>
                                                        <div id="smallText">Team with Gal Levi</div>
                                                    </th>
                                                    <th scope="col" id="isInOtherGame"></th>
                                                    <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                                    <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <center>
                            <div id="loggedToTeam">Logged to BestFamily1234 Team</div>
                            <div id="hallOfFamePlace">Your team is at place #7 in Project Trivia Hall Of Fame.</div>
                            <div id="btns">
                                <button className='btn btn-primary teamPageMode-btn btn-lg' id="randomGame">Join Random Game</button>
                                <button className='btn btn-primary teamPageMode-btn btn-lg' id="switchTeam">Switch Team</button>
                            </div>
                        </center>
                        <button className='btn btn-primary teamPageMode-btn float-end' id="mic" onClick={micClick}>
                            <i className='fa-solid fa-microphone'></i>
                            </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamPage;