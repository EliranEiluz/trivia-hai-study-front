import './Teams.css';
import { Link } from 'react-router-dom';
import '../NavBar.css';

//TODO: NEEDS MASSIVE EDIT, ADD COMPONENT FOR EACH TEAM, ADD LOGO INSTEAD OF TEXT, CHANGE COLORS.


function Teams() {
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
            <div className='container-fluid' id="WelcomePageContent">
                <div className='row justify-content-md-center'>
                    <div className='col-6 col-md-auto' id="logoDiv">
                        Project Trivia Logo
                    </div>
                </div>
            </div>
            <div id="faded_background">
                <div className="container-fluid h-75 w-75">
                    <div className="card" id="teams_card">
                        <div className="card-body overflow-auto">
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-5' id="myTeams">
                                    My Teams
                                </div>
                                <div className='col-4' id="myTeams"></div>
                                <div className='col-2'>
                                    <button className='btn btn-primary teams-btn'>Create new Team</button>
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
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                    <tr>
                                        <th scope="col" id="isOnline"> <div id="indicator" className='online-indicator'>
                                            <span id="blink" className='greenblink'></span>
                                        </div></th>
                                        <th scope="col" id="teamName">
                                            <div>HachiTovim</div>
                                            <div id="smallText">Team with Gal Levi</div>
                                        </th>
                                        <th scope="col" id="isInOtherGame">sdsdghdsfgsdfgdsgsfdgsd</th>
                                        <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
                                        <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teams;