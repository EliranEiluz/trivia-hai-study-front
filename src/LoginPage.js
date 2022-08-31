import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { User } from './index.js'

function LoginPage({ nowOnline }) {

    var navigation = useNavigate();

    var keepLoggedIn = false;

    const details = { username: '', password: '' }

    function loginAsGuest() {
        nowOnline.onlineUser = new User();
        nowOnline.onlineUser.fullName = "Guest";
        navigation('/welcome');
    }


    function handleSubmit(e) {
        e.preventDefault()
        if (details.username !== '' && details.password !== '') {
            // server fetching...
        }
        else {
            if (details.username === '') {
                document.getElementById('login_userName_error').style.display = "block";
            }
            if (details.password.length < 8) {
                document.getElementById('login_password_error').style.display = "block";
            }
        }
    }

    function registerBtnClick() {
        navigation('/register');
    }

    function keepLoginChange(e) {
        if (e.target.checked) {
            keepLoggedIn = true;
        }

    }

    function userNameChange(e) {
        details.username = e.target.value;
    }

    function passwordChange(e) {
        details.password = e.target.value;
    }

    return (
        <div id="faded_background">
            <form id="login_form" onSubmit={handleSubmit} className="container-fluid h-75 w-75 h-sm-100 w-sm-100">
                <div className="card" id="login_card">
                    <div className="card-body">
                        <div className='row'>
                            <div id="logo">
                                Project Trivia Logo
                            </div>
                        </div>
                        <div className='row login-row'>
                            <div className='col-xl-1 col-sm-0'></div>
                            <div className='col-xl-5 col-sm-12'>
                                Username:
                            </div>
                            <div className='col-xl-6 col-sm-12'>
                                <div className="error" id="login_userName_error">
                                    Please fill the username field.
                                </div>
                                <input className="login_input form-control" onChange={userNameChange}></input>
                            </div>
                        </div>
                        <div className='row login-row'>
                            <div className='col-xl-1 col-sm-0'></div>
                            <div className='col-xl-5 col-sm-12'>
                                Password:
                            </div>
                            <div className='col-xl-6 col-sm-12'>
                                <div className="error" id="login_password_error">
                                    The password field must contain at least 8 characters.
                                </div>
                                <input className="login_input form-control" onChange={passwordChange}></input>
                            </div>
                        </div>
                        <div className='row login-row'>
                            <div className='col-1 col-sm-0'></div>
                            <div className='col-xl-5 col-sm-6'>
                                <span id="login_keep_login_text">Keep me logged in</span>
                                <input type="checkbox" onChange={keepLoginChange}></input>
                            </div>
                        </div>
                        <div className='row login-row'>
                            <div className='col-1'></div>
                            <div className='col-4'>
                                <button className='btn btn-primary login-btn' id="login_register_btn" onClick={registerBtnClick}>Create new account</button>
                            </div>
                            <div className='col-4'>
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary login-btn' id="login_login_btn" type="submit">Log in</button>
                            </div>
                        </div>
                        <div className='row login-row justify-content-md-center'>
                            <div className='col-xl-4 col-sm-6'>
                                <button className='btn btn-primary login-btn' id="login_guest_btn" onClick={loginAsGuest} type="button">Login as Guest</button>
                            </div>
                        </div>
                        <div className='row login-row' id="login_read_more">
                            <div className='col-12'>
                                <center>
                                    Click <a href="#">Here</a> to read more about Trivia Project
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;