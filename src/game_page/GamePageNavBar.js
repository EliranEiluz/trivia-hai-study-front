import './NavBar.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function GamePageNavBar() {

    const { t } = useTranslation();
    return(
        <div id="navBar">
    <ul className="nav py-3">
        <li className="nav-item">
            <a className="nav-link active" href="#leaveToHomeGameModal" data-bs-toggle="modal">{t('home')}</a>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="#">{t('about')}</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="#">{t('scoreboard')}</Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#leaveGameModal" data-bs-toggle="modal">{t('switch_mode')}</a>
        </li>
        <li className="nav-item" id="leaveGameBtnLi">
            <button className='btn btn-danger' id="leaveGameBtn" data-bs-toggle="modal" data-bs-target="#leaveGameModal">{t('leave_game')}</button>
        </li>
    </ul>
</div>
    )
}

export default GamePageNavBar;