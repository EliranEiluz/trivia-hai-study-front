import './LogoRow.css';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LogoRow({ nowOnline }) {

    const { t } = useTranslation();

    async function changeToHeb() {
        if (document.querySelector("html").lang == "en") {
            document.querySelector("html").lang = "iw";
            document.querySelector("html").dir = "rtl";
            await i18n.changeLanguage("iw");
            document.getElementById("langBtn").innerHTML = document.getElementById("il").innerHTML;
        }
    }

    async function changeToEn() {
        if (document.querySelector("html").lang == "iw") {
            document.querySelector("html").lang = "en";
            document.querySelector("html").dir = "ltr";
            await i18n.changeLanguage("en");
            document.getElementById("langBtn").innerHTML = document.getElementById("us").innerHTML;
        }
    }

    useEffect(() => {
        if (document.querySelector("html").lang == "iw") {
            document.getElementById("langBtn").innerHTML = document.getElementById("il").innerHTML;
        }
        else {
            document.getElementById("langBtn").innerHTML = document.getElementById("us").innerHTML;
        }
    }, [])

    return (
        <div className='row'>
            <div className='col-xl-3 d-flex justify-content-center justify-content-md-start'>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="langBtn">
                        <span className='flag-icon flag-icon-us'></span>{t('english')}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button" onClick={changeToEn} id="us"><span className='flag-icon flag-icon-us'></span>{t('english')}</button></li>
                        <li><button className="dropdown-item" type="button" onClick={changeToHeb} id="il"><span className='flag-icon flag-icon-il'></span>{t('hebrew')}</button></li>
                    </ul>
                </div>
            </div>
            <div className='col-xl-6 d-flex justify-content-center' id="logo">
                <Link to="/"><img src={require("./tp2.png")} id="imgLogo"></img></Link>
            </div>
            <div className='col-xl-3 d-none d-m-block'></div>
        </div>
    )
}

export default LogoRow;