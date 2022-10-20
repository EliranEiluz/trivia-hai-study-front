import './RegisterPage.css';
import { useNavigate } from "react-router-dom";
import { User } from '../index.js';
import LogoRow from './LogoRow';
import { useTranslation } from 'react-i18next';

function RegisterPage({ nowOnline }) {

    const { t } = useTranslation();
    var navigation = useNavigate();
    const validity = {
        isUserNameVaild: false, isPasswordValid: false, isMemberTypeValid: false,
        isPhoneNumberValid: false, isFullNameValid: false
    }
    nowOnline.onlineUser = new User();
    nowOnline.onlineUser.memberType = -1;

    function isFormValid() {
        return validity.isUserNameVaild && validity.isPasswordValid && validity.isMemberTypeValid && validity.isPhoneNumberValid
            && validity.isFullNameValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isFormValid()) {

            navigation('/welcome')
        }
        else {
            document.getElementById("register_form").style.marginTop = "2.5%";
            if (!validity.isUserNameVaild) {
                document.getElementById("register_username_error").style.display = "block";
            }
            if (!validity.isPasswordValid) {
                document.getElementById("register_password_error").style.display = "block";
            }
            if (!validity.isPhoneNumberValid) {
                document.getElementById("register_phoneNumber_error").style.display = "block";
            }
            if (!validity.isFullNameValid) {
                document.getElementById("register_fullName_error").style.display = "block";
            }
            if (!validity.isMemberTypeValid) {
                document.getElementById("register_memberType_error").style.display = "block";
            }
        }
    }

    function loginBtnClick() {
        navigation('/');

    }

    function memberTypeChange(e) {
        if (e.target.checked) {
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
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-xl-10 col-xs-12'>
                    <div id="faded_background">
                        <form id="register_form" onSubmit={handleSubmit} className="container-fluid h-100 w-100">
                            <div className="card" id="register_card">
                                <div className="card-body">
                                    <LogoRow nowOnline={nowOnline} />
                                    <div className='row register-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5'>
                                            {t('username')}
                                        </div>
                                        <div className='col-xl-5'>
                                            <div id="register_username_error" className="error">
                                                {t('register_username_error')}
                                            </div>
                                            <input className="register_input form-control" id="username_input" onChange={userNameChange} dir="ltr"></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row register-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5'>
                                            {t('password')}
                                        </div>
                                        <div className='col-xl-5'>
                                            <div id="register_password_error" className="error">
                                                {t('register_password_error')}
                                            </div>
                                            <div className='col-xl-1 d-none d-md-block'>
                                            </div>
                                            <input className="register_input form-control" id="password_input" type="password" onChange={passwordChange} dir="ltr"></input>
                                        </div>
                                    </div>
                                    <div className='row register-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5'>
                                            {t('phone_number')}
                                        </div>
                                        <div className='col-xl-5'>
                                            <div id="register_phoneNumber_error" className="error">
                                                {t('phone_number_error')}
                                            </div>
                                            <input className="register_input form-control" id="phoneNumber_input" type="tel" onChange={phoneNumberChange} dir="ltr"></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row register-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5'>
                                            {t('full_name')}
                                        </div>
                                        <div className='col-xl-5'>
                                            <div id="register_fullName_error" className="error">
                                                {t('full_name_error')}
                                            </div>
                                            <input className="register_input form-control" id="fullName_input" onChange={fullNameChange} dir="ltr"></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row register-row'>
                                        <center>
                                            <div id="register_memberType_error" className="error">{t('radio_error')}</div>
                                        </center>
                                        <div className='col-xl-2'></div>
                                        <div className='col-xl-4'>
                                            <input type="radio" name="player" value="0" onChange={memberTypeChange} className="radio_btn"></input>
                                            <span id="register_keep_login_text">{t('grandparent')}</span>
                                        </div>
                                        <div className='col-xl-1'></div>
                                        <div className='col-xl-5'>
                                            <input type="radio" name="player" value="1" onChange={memberTypeChange} className="radio_btn"></input>
                                            <span id="register_keep_login_text">{t('grandson')}</span>
                                        </div>
                                    </div>
                                    <div className='row register-row'>
                                        <div className='col-xl-1 d-none d-xl-block'></div>
                                        <div className='col-xl-4 col-sm-12 col-md-6 d-flex justify-content-md-start justify-content-center'>
                                            <button className='btn btn-primary register-btn' id="register_loginPage_btn" onClick={loginBtnClick} type="button">{t('register_login_btn')}</button>
                                        </div>
                                        <div className='col-xl-3 d-none d-xl-block'></div>
                                        <div className='col-xl-3 col-sm-12 col-md-6 d-flex justify-content-md-end justify-content-center'>
                                            <button className='btn btn-primary register-btn' id="register_register_btn" type="submit">{t('register_register_btn')}</button>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row register-row' id="register_read_more">
                                        <div className='col-12'>
                                            <center>
                                                {t('click')} <a href="#">{t('here')}</a> {t('read_more')}
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;