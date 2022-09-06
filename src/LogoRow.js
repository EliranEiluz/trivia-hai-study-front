import './LogoRow.css';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function LogoRow() {

    const { t } = useTranslation();

    function changeToHeb() {
        if (document.querySelector("html").lang == "en") {
            document.querySelector("html").lang = "iw";
            document.querySelector("html").dir = "rtl";
            i18n.changeLanguage("iw");
        }
    }

    function changeToEn() {
        if (document.querySelector("html").lang == "iw") {
            document.querySelector("html").lang = "en";
            document.querySelector("html").dir = "ltr";
            i18n.changeLanguage("en");
        }
    }

    return (
        <div className='row'>
            <div className='col-xl-3 d-flex justify-content-center justify-content-md-start'>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="langBtn">
                        <span className='flag-icon flag-icon-us'></span>{t('english')}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button" onClick={changeToEn}><span className='flag-icon flag-icon-us'></span>{t('english')}</button></li>
                        <li><button className="dropdown-item" type="button" onClick={changeToHeb}><span className='flag-icon flag-icon-il'></span>{t('hebrew')}</button></li>
                    </ul>
                </div>
            </div>
            <div className='col-xl-6 d-flex justify-content-center' id="logo">
                <img src="./tp1.png" id="imgLogo"></img>
            </div>
            <div className='col-xl-3 d-none d-m-block'></div>
        </div>
    )
}

export default LogoRow;