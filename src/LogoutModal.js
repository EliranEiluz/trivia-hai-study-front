import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serverIp } from '.';

function LogoutModal({playModeClass}) {
    const navigation = useNavigate();
    async function Logout() {
        const request = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            credentials: 'include'
          };
        await fetch(serverIp.ip + "/User/Logout", request)
        if (playModeClass) {
            playModeClass.current.clear();
        }
        document.getElementById("btnCloseLogoutModal").click();
        navigation('/')
    }

    const { t } = useTranslation();
    return (
        <div className="modal fade" id="LogoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{t('logout_title')}</h1>
                    </div>
                    <div className="modal-body">
                        {t('logout_message')}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="btnCloseLogoutModal">{t('close')}</button>
                        <button type="button" className="btn btn-danger" onClick={Logout}>{t('logout')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal;