import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal';
function GamePageModals({ playModeClass, gameFlow }) {

    const navigation = useNavigate();
    const { t } = useTranslation();

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function leaveGame() {
        if(playModeClass.current) {
            playModeClass.current.clear();
        }
        navigation('/welcome')
    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function leaveToHomeGame() {
        if(playModeClass.current) {
            playModeClass.current.clear();
        }
        navigation('/')
    }

    return (
        <>
            <button type="button" data-bs-toggle="modal" data-bs-target="#startGameModal" id="startGameModalBtn"></button>
            <div className="modal modal-lg fade" tabIndex="-1" aria-hidden="true" id="startGameModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('game_instructions')}</h5>
                        </div>
                        <div className="modal-body">
                            <p id="singlePlayerInstructions" className='d-none'>
                                {t('single_player_instructions')}
                            </p>
                            <p id="playWithAgentInstructions" className='d-none'>
                                {t('play_with_agent_instructions')}
                            </p>
                            <p id="playWithGivenAmountOfQuestionsInstrctions" className='d-none'>
                                {t('2_gameMode_tooltip')}
                            </p>
                            <p id="playAgainstTheClockInstrctions" className='d-none'>
                                {t('4_gameMode_tooltip')}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={gameFlow}>{t('start_game')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>{t('back_to_home_page')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="leaveGameModal" tabIndex="-1" aria-labelledby="leaveGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveGameModalLabel">{t('leave_game')}</h5>
                        </div>
                        <div className="modal-body">
                            {t('leave_game_exp')}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveGame}>{t('leave_game')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="leaveToHomeGameModal" tabIndex="-1" aria-labelledby="leaveToHomeGameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="leaveToHomeGameModalLabel">{t('back_to_home_page')}</h5>
                        </div>
                        <div className="modal-body">
                            {t('leave_game_exp')}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close')}</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={leaveToHomeGame}>{t('back_to_home_page')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <LogoutModal />
        </>
    )
}

export default GamePageModals;