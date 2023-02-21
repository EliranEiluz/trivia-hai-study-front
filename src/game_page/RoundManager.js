import { PlayBuzzerMode } from "./Against_Agent_Classes/PlayBuzzerMode"

class RoundManager {
    constructor(numOfRounds, numOfQuestions, timeForQuestion, setQuestionCounter, questions, setQuestions, playerPoints, agentPoints, setCurrentTime, playWithAgentOperations, nowOnline, navigateToFinishPage, playModeClass) {
        this.numOfRounds = numOfRounds
        this.numOfQuestions = numOfQuestions
        this.timeForQuestion = timeForQuestion
        this.setQuestionCounter = setQuestionCounter
        this.questions = questions
        this.setQuestions = setQuestions
        this.playerPoints = playerPoints
        this.agentPoints = agentPoints
        this.setCurrentTime = setCurrentTime
        this.playWithAgentOperations = playWithAgentOperations
        this.nowOnline = nowOnline
        this.navigateToFinishPage = navigateToFinishPage
        this.playModeClass = playModeClass
        this.roundCounter = 1
        this.numOfAgentWins = 0
        this.numOfPlayerWins = 0
    }

    setRound() {
        this.playModeClass.current = new PlayBuzzerMode((this.nowOnline.questions[this.roundCounter - 1]).length, this.timeForQuestion, this.setQuestionCounter, this.nowOnline.questions[this.roundCounter - 1], this.setQuestions, this.playerPoints, this.agentPoints, this.setCurrentTime, this.playWithAgentOperations[this.roundCounter - 1], this.nowOnline, this.gameFinish);
        document.getElementById('startGameModalBtn').click();
    }

    gameFinish() {
        if (this.nowOnline.isWin == 2) {
            this.numOfPlayerWins++;
        }
        else if(this.nowOnline.isWin == 1) {
            this.numOfAgentWins++;
        }

        if(this.roundCounter == this.numOfRounds) {
            if(this.numOfPlayerWins > this.numOfAgentWins) {
                this.nowOnline.isWin = 2;
            }
            else if (this.numOfPlayerWins < this.numOfAgentWins) {
                this.nowOnline.isWin = 1;
            }
            else {
                this.nowOnline.isWin = 0;
            }
            this.navigateToFinishPage()
            return;
        }
        this.roundCounter++;
        this.setRound() 
    }
}

export { RoundManager }