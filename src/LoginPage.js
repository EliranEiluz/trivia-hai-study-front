import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { User } from './index.js';
import LogoRow from './LogoRow';
import { useTranslation } from 'react-i18next';


function LoginPage({ nowOnline }) {

    var navigation = useNavigate();

    var keepLoggedIn = false;

    const { t } = useTranslation();

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
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-xl-10 col-xs-12'>
                        <form id="login_form" onSubmit={handleSubmit} className="container-fluid h-100 w-100">
                            <div className="card" id="login_card">
                                <div className="card-body">
                                    <LogoRow />
                                    <div className='row login-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-sm-12 jusify-content-md-center'>
                                            {t('username')}
                                        </div>
                                        <div className='col-xl-6 col-sm-12'>
                                            <div className="error" id="login_userName_error">
                                                {t('login_username_error')}
                                            </div>
                                            <input className="login_input form-control" onChange={userNameChange}></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row login-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-sm-12'>
                                            {t('password')}
                                        </div>
                                        <div className='col-xl-6 col-sm-12'>
                                            <div className="error" id="login_password_error">
                                                {t('login_password_error')}
                                            </div>
                                            <input className="login_input form-control" onChange={passwordChange}></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row login-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5 col-sm-6'>
                                            <span id="login_keep_login_text">{t('keep_logged')}</span>
                                            <input type="checkbox" onChange={keepLoginChange} id="keep_logged_checkbox"></input>
                                        </div>
                                    </div>
                                    <div className='row login-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-start'>
                                            <button className='btn btn-primary login-btn' id="login_register_btn" onClick={registerBtnClick} type="button">{t('login_register_btn')}</button>
                                        </div>
                                        <div className='col-xl-2 d-flex justify-content-center d-none d-xl-block justify-content-md-start'>
                                        </div>
                                        <div className='col-xl-4 col-xs-12 col-sm-12 col-md-5 d-flex justify-content-center justify-content-md-end'>
                                            <button className='btn btn-primary login-btn' id="login_login_btn" type="submit">{t('login_login_btn')}</button>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row login-row justify-content-center'>
                                        <div className='col-xl-4 col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center'>
                                            <button className='btn btn-primary login-btn' id="login_guest_btn" onClick={loginAsGuest} type="button">{t('login_guest_btn')}</button>
                                        </div>
                                    </div>
                                    <div className='row login-row' id="login_read_more">
                                        <div className='col-xl-12'>
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

export default LoginPage;