import './RegisterPage.css';
import { useNavigate } from "react-router-dom";
import { serverIp, User } from '../index.js';
import LogoRow from './LogoRow';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ResearchGroupOption from './ResearchGroupOption';
function RegisterPage({ nowOnline }) {

    const { t } = useTranslation();
    var navigation = useNavigate();
    const validity = {
        isUserNameVaild: false, isPasswordValid: false, isMemberTypeValid: false,
        isPhoneNumberValid: false, isFullNameValid: false, isResearchGroupValid:true
    }
    nowOnline.onlineUser = new User();
    nowOnline.onlineUser.memberType = -1;
    const [reserachOptions, setResearchOptions] = useState(null)

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function isFormValid() {
        return validity.isUserNameVaild && validity.isPasswordValid && validity.isMemberTypeValid && validity.isPhoneNumberValid
            && validity.isFullNameValid;
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    async function handleSubmit(e) {
        e.preventDefault();
        for(let i =0; i < document.getElementsByClassName("error").length; i++) {
            document.getElementsByClassName("error")[i].style.display = "none";
        }
        if (isFormValid()) {
            const request = {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    username:nowOnline.onlineUser.username,
                    password:nowOnline.onlineUser.password,
                    phoneNumber:nowOnline.onlineUser.phoneNumber,
                    fullName:nowOnline.onlineUser.fullName,
                    memberType:nowOnline.onlineUser.memberType,
                    researchGroup:nowOnline.onlineUser.researchGroup
                }),
                credentials: 'include'
              };
            await fetch(serverIp.ip + "/User/Register", request).then(async response => {
                if(response.status == 201) {
                    return response.json()
                }
                else {
                    return null;
                } 
            }).then(async user => {
                if(user) {
                    nowOnline.onlineUser = user;
                    navigation('/welcome');
                }
                else {
                    //document.getElementById().classList.remove('d-none');
                }
            }) 
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
            if(!validity.isResearchGroupValid) {
                document.getElementById("register_research_error").style.display = "block";
            }
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function loginBtnClick() {
        navigation('/');

    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function memberTypeChange(e) {
        if (e.target.checked) {
            nowOnline.onlineUser.memberType = parseInt(e.target.value);
            validity.isMemberTypeValid = true;
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function userNameChange(e) {
        if (e.target.value !== '') {
            nowOnline.onlineUser.username = e.target.value;
            validity.isUserNameVaild = true;
        }
        else {
            validity.isUserNameVaild = false;
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function fullNameChange(e) {
        if (e.target.value !== '') {
            nowOnline.onlineUser.fullName = e.target.value;
            validity.isFullNameValid = true;
        }
        else {
            validity.isFullNameValid = false;
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function passwordChange(e) {
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (e.target.value.match(password)) {
            nowOnline.onlineUser.password = e.target.value;
            validity.isPasswordValid = true;
        }
        else {
            validity.isPasswordValid = false;
        }
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function phoneNumberChange(e) {
        var phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (e.target.value.match(phone)) {
            nowOnline.onlineUser.phoneNumber = e.target.value;
            validity.isPhoneNumberValid = true;
        }
        else {
            validity.isPhoneNumberValid = false;
        }
    }

    function researchGroupChange(e) {
        nowOnline.onlineUser.researchGroup = e.target.value;
        validity.isResearchGroupValid = true;
    }

    async function fetchResearchGroupOptions() {
        const params = {
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            credentials: 'include'
        }
        await fetch(serverIp.ip + "/reserachGroup/All", params).then(async response => {
            if(response.status == 200) {
                return response.json()
            }
            else {
                return null;
            }
        }).then(async options => {
            if(options) {
                setResearchOptions(options.map((option, key) => {
                    return <ResearchGroupOption key={key} value={option}/>
                }))
            }
        })
    }

    useEffect(() => {
        fetchResearchGroupOptions();
    },[])

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-xl-10 col-xs-12'>
                    <div id="faded_background">
                        <form id="register_form" onSubmit={handleSubmit} className="container-fluid h-100 w-100" autoComplete='off'>
                            <div className="card" id="register_card">
                                <div className="card-body">
                                    <LogoRow nowOnline={nowOnline} toRunFunc={null}/>
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
                                        <div className='col-xl-1 d-none d-md-block'>
                                        </div>
                                        <div className='col-xl-5'>
                                            {t('research_group') + ":"}
                                        </div>
                                        <div className='col-xl-5'>
                                            <div id="register_research_error" className="error">
                                                {t('research_error')}
                                            </div>
                                            <select class="form-select bg-transparent" aria-label="Default select example" id="research_select" onChange={researchGroupChange} dir="ltr"></select>
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