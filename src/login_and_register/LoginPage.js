import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import LogoRow from './LogoRow';
import { useTranslation } from 'react-i18next';
import { serverIp } from '../index.js';
import { useRef } from 'react';


function LoginPage({ nowOnline }) {

    var navigation = useNavigate();

    async function checkCookie() {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        await fetch(serverIp.ip + "/Verify/verifyToken", request).then(async response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                return null;
            }
        }).then(async user => {
            if (user) {
                nowOnline.onlineUser = user;
                navigation('/welcome')
            }
        })
    }

    checkCookie();


    const { t } = useTranslation();

    const details = useRef({ username: '', password: '', keepLoggedIn: 0 })

    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    async function handleSubmit(e) {
        document.getElementById('login_userName_error').style.display = "none";
        document.getElementById('login_password_error').style.display = "none";
        document.getElementById('login_error').style.display = "none";
        e.preventDefault()
        if (details.username !== '' && details.password !== '') {
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: details.current.username, password: details.current.password, keepMeLoggedIn: details.current.keepLoggedIn }),
                credentials: 'include'
            };
            await fetch(serverIp.ip + "/User/Login", request).then(async response => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    return null;
                }
            }).then(async user => {
                if (user) {
                    nowOnline.onlineUser = user;
                    nowOnline.roundNumber = user.roundNumber;
                    navigation('/welcome')
                }
                else {
                    document.getElementById('login_error').style.display = "block";
                }
            })
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

    async function handleSubmitTemp(e) {
        document.getElementById('login_fullname_error').style.display = "none";
        e.preventDefault()
        if (details.current.username !== '') {
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: details.current.username, keepMeLoggedIn: details.current.keepLoggedIn }),
                credentials: 'include'
            };
            await fetch(serverIp.ip + "/User/TempLogin", request).then(async response => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    return null;
                }
            }).then(async user => {
                if (user) {
                    nowOnline.onlineUser = user;
                    nowOnline.roundNumber = user.roundNumber;
                    navigation('/welcome')
                }
                else {
                    document.getElementById('login_error').style.display = "block";
                }
            })
        }
        else {
            document.getElementById('login_fullname_error').style.display = "block";
        }
    }


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function registerBtnClick() {
        navigation('/register');
    }


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function keepLoginChange(e) {
        if (e.target.checked) {
            details.current.keepLoggedIn = 1;
        }

    }


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function userNameChange(e) {
        details.current.username = e.target.value;
    }


    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function passwordChange(e) {
        details.current.password = e.target.value;
    }


    return (
        <div id="faded_background">
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-xl-10 col-xs-12'>
                        <form id="login_form" onSubmit={handleSubmitTemp} className="container-fluid w-100" autoComplete='off'>
                            <div className="card" id="login_card">
                                <div className="card-body">
                                    <LogoRow nowOnline={nowOnline} toRunFunc={null}/>
                                    <div className='row'>
                                        <center>
                                            <div className="error" id="login_error">
                                                {t('login_error')}
                                            </div>
                                        </center>
                                    </div>
                                    <div className='row login-row'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-sm-12 jusify-content-md-center'>
                                            {t('full_name')}
                                        </div>
                                        <div className='col-xl-6 col-sm-12'>
                                            <div className="error" id="login_fullname_error">
                                                {t('full_name_error')}
                                            </div>
                                            <input className="login_input form-control" onChange={userNameChange} id="login_fullname_input"></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row login-row d-none'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-sm-12 jusify-content-md-center'>
                                            {t('username')}
                                        </div>
                                        <div className='col-xl-6 col-sm-12'>
                                            <div className="error" id="login_userName_error">
                                                {t('login_username_error')}
                                            </div>
                                            <input className="login_input form-control" onChange={userNameChange} dir="ltr" id="login_username_input"></input>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                    </div>
                                    <div className='row login-row d-none'>
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-4 col-sm-12'>
                                            {t('password')}
                                        </div>
                                        <div className='col-xl-6 col-sm-12'>
                                            <div className="error" id="login_password_error">
                                                {t('login_password_error')}
                                            </div>
                                            <input className="login_input form-control" onChange={passwordChange} dir="ltr" type="password" id="login_password_input"></input>
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
                                            <button className='btn btn-primary login-btn d-none' id="login_register_btn" onClick={registerBtnClick} type="button">{t('login_register_btn')}</button>
                                        </div>
                                        <div className='col-xl-2 d-flex justify-content-center d-none d-xl-block justify-content-md-start'>

                                        </div>
                                        <div className='col-xl-4 col-xs-12 col-sm-12 col-md-5 d-flex justify-content-center justify-content-md-end'>
                                            <button className='btn btn-primary login-btn' id="login_login_btn" type="submit">{t('login_login_btn')}</button>
                                        </div>
                                        <div className='col-xl-1 d-none d-md-block'>
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