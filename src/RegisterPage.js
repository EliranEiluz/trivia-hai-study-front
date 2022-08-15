import './RegisterPage.css';
import { useNavigate } from "react-router-dom";
import { User } from './index.js';

function RegisterPage({nowOnline}) {

    var navigation = useNavigate();
    const validity = {isUserNameVaild: false, isPasswordValid: false, isMemberTypeValid: false,
         isPhoneNumberValid: false, isFullNameValid: false}
    nowOnline.onlineUser = new User();
    nowOnline.onlineUser.memberType = -1;

    function isFormValid() {
        return validity.isUserNameVaild && validity.isPasswordValid && validity.isMemberTypeValid && validity.isPhoneNumberValid
                && validity.isFullNameValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(isFormValid()) {
            
        }
        else {
            document.getElementById("register_form").style.marginTop = "2.5%";
            if(!validity.isUserNameVaild) {
                document.getElementById("register_username_error").style.display = "block";
            }
            if(!validity.isPasswordValid) {
                document.getElementById("register_password_error").style.display = "block";
            }
            if(!validity.isPhoneNumberValid) {
                document.getElementById("register_phoneNumber_error").style.display = "block";
            }
            if(!validity.isFullNameValid) {
                document.getElementById("register_fullName_error").style.display = "block";
            }
            if(!validity.isMemberTypeValid) {
                document.getElementById("register_memberType_error").style.display = "block";
            }
        }
    }

    function loginBtnClick() {
        navigation('/');

    }

    function memberTypeChange(e) {
        if(e.target.checked) {
            nowOnline.onlineUser.memberType = e.target.value;
            validity.isMemberTypeValid = true;
        }   
    }

    function userNameChange(e) {
        if (e.target.value !== '') {
            nowOnline.onlineUser.username = e.target.value;
            validity.isUserNameVaild = true;
        }
        else {
            validity.isUserNameVaild = false;
        }
    }

    function fullNameChange(e) {
        if (e.target.value !== '') {
            nowOnline.onlineUser.username = e.target.value;
            validity.isFullNameValid = true;
        }
        else {
            validity.isFullNameValid = false;
        }
    }

    function passwordChange(e) {
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (e.target.value.match(password)) {
            nowOnline.onlineUser.username = e.target.value;
            validity.isPasswordValid = true;
        }
        else {
            validity.isPasswordValid = false;
        }
    }

    function phoneNumberChange(e) {
        var phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (e.target.value.match(phone)) {
            nowOnline.onlineUser.phone = e.target.value;
            validity.isPhoneNumberValid = true;
        }
        else {
            validity.isPhoneNumberValid = false;
        }
    }



    return (
        <div id="faded_background">
        <form id="register_form" onSubmit={handleSubmit} className="container-fluid h-75 w-75">
            <div className="card" id="register_card">
                <div className="card-body">
                    <div className='row'>
                        <div id="logo">
                        Project Trivia Logo
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Username:
                        </div>
                        <div className='col-6'>
                            <div id="register_username_error" class="error">
                             Username must contain at least one character.
                            </div>
                            <input className="register_input form-control" id="username_input" onChange={userNameChange}></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Password:
                        </div>
                        <div className='col-6'>
                            <div id="register_password_error" class="error">
                            Choose at least 8 characters- one numeric digit, one uppercase and one lowercase letter.
                            </div>
                            <input className="register_input form-control" id="password_input" type="password" onChange={passwordChange}></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Phone Number:
                        </div>
                        <div className='col-6'>
                            <div id="register_phoneNumber_error" class="error">
                                Please enter valid phone number. 
                            </div>
                            <input className="register_input form-control" id="phoneNumber_input" type="tel" onChange={phoneNumberChange}></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Full Name:
                        </div>
                        <div className='col-6'>
                            <div id="register_fullName_error" class="error">
                                Full name must contain at least one character.
                            </div>
                            <input className="register_input form-control" id="fullName_input" onChange={fullNameChange}></input>
                        </div>
                    </div>
                    <div className='row register-row'>
                        <center>
                        <div id="register_memberType_error" class="error">Please select one of the options below.</div>
                        </center>
                    <div className='col-2'></div>
                        <div className='col-4'>
                            <input type="radio" name="player" value="0" onChange={memberTypeChange} class="radio_btn"></input>
                            <span id="register_keep_login_text">I'm a Grandparent</span>
                        </div>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <input type="radio" name="player" value="1" onChange={memberTypeChange} class="radio_btn"></input>
                            <span id="register_keep_login_text">I'm a Grandson</span>
                        </div>
                    </div>
                    <div className='row register-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            <button className='btn btn-primary register-btn' id="register_loginPage_btn" onClick={loginBtnClick}>Back to login page</button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-3'>
                            <button className='btn btn-primary register-btn' id="register_register_btn" type="submit">Register</button>
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