import './RegisterPage.css';
import { useNavigate } from "react-router-dom";

function RegisterPage({nowOnline}) {
    var navigation = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
    }

    function loginBtnClick() {
        navigation('/');
    }

    return (
        <div id="faded_background">
        <form id="register_form" onSubmit={handleSubmit} className="container-fluid h-75 w-75">
            <div className="card" id="register_card">
                <div className="card-body">
                    <div className='row'>
                        <div id="logo">
                        Here is The logo!
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Username:
                        </div>
                        <div className='col-6'>
                            <div id="userName_error"></div>
                            <input className="register_input form-control" id="username_input"></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Password:
                        </div>
                        <div className='col-6'>
                            <div id="password_error"></div>
                            <input className="register_input form-control" id="password_input"></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Phone Number:
                        </div>
                        <div className='col-6'>
                            <div id="phoneNumber_error"></div>
                            <input className="register_input form-control" id="phoneNumber_input"></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Full Name:
                        </div>
                        <div className='col-6'>
                            <div id="fullName_error"></div>
                            <input className="register_input form-control" id="fullName_input"></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-2'></div>
                        <div className='col-4'>
                            <input type="radio" name="player" value="0"></input>
                            <span id="register_keep_login_text">I'm a Grandparent</span>
                        </div>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <input type="radio" name="player" value="1"></input>
                            <span id="register_keep_login_text">I'm a Grandson</span>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            <button className='btn btn-primary' id="register_loginPage_btn" onClick={loginBtnClick}>Back to login page</button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-3'>
                            <button className='btn btn-primary' id="register_register_btn" type="submit">Register</button>
                        </div>
                    </div>
                    <div className='row register-row' id="register_read_more">
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

export default RegisterPage;