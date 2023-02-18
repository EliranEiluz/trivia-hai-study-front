import LogoutModal from "../LogoutModal";
import { useTranslation } from 'react-i18next';

function WelcomePageModals({ onPlayWithAmountOfQuestions, onPlayAgainstClock, onPlayAgainstAgent, onPlayAgainstAgentWithAgent }) {

    const { t } = useTranslation();
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseTrainingMode" id="toggleModal"></button>

            <div className="modal fade" id="chooseTrainingMode" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" id="chooseTrainingModalBody">
                        <div className="modal-header" id="chooseTrainingModalHeader">
                            <h5 className="modal-title" id="staticBackdropLabel">{t('choose_training_mode')}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeBtn"></button>
                        </div>
                        <div className="modal-body container-fluid">
                            <div className='row'>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-toggle="collapse" data-bs-target="#PlayAgainstAgentOptions" aria-expanded="false" aria-controls="PlayAgainstAgentOptions">{t('play_against_agent')}</button>
                                    </center>
                                </div>
                                <div className='col-6'>
                                    <center>
                                        <button type="button" className="btn choose-mode-btn" data-bs-toggle="collapse" data-bs-target="#singlePlayerOptions" aria-expanded="false" aria-controls="singlePlayerOptions">{t('single_player')}</button>
                                    </center>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12' id="collapseGroup">
                                    <div id="singlePlayerOptions" className='collapse' data-bs-parent='#collapseGroup'>
                                        <div className='card card-body' id="gameModeMenu">
                                            <div>
                                                <center>
                                                    <button id="PlayWithAmountOfQuestions" type="button" data-tippy-content={t('2_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayWithAmountOfQuestions}>{t('given_amount_of_questions')}</button>
                                                </center>
                                            </div>
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstClock" type="button" data-tippy-content={t('4_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstClock}>{t('on_time_mode')}</button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="PlayAgainstAgentOptions" className='collapse' data-bs-parent='#collapseGroup'>
                                        <div className='card card-body' id="gameModeMenu">
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstAgent" type="button" data-tippy-content={t('0_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstAgent}>{t('play_alone')}</button>
                                                </center>
                                            </div>
                                            <div>
                                                <center>
                                                    <button id="PlayAgainstAgentWithAgent" type="button" data-tippy-content={t('1_gameMode_tooltip')} className="btn choose-mode-btn gameTypeOptionBtn" data-bs-dismiss="modal" onClick={onPlayAgainstAgentWithAgent}>{t('play_with_agent')}</button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LogoutModal />
        </>
    )
}

export default WelcomePageModals;