import * as utils from './utils'
import { Beep } from './Beep'

class PlayAgainstTheClock {
    constructor(amountOfQuestions, totalTime, setQuestionCounter, questions, setQuestion, playerPoints, setCurrentTime, nowOnline, navigateToFinishPage) {
        this.amountOfQuestions = amountOfQuestions;
        this.totalTime = totalTime
        this.setQuestionCounter = setQuestionCounter;
        this.questions = questions;
        this.setQuestion = setQuestion;
        this.playerPoints = playerPoints;
        this.setCurrentTime = setCurrentTime;
        this.nowOnline = nowOnline;
        this.navigateToFinishPage = navigateToFinishPage;

        this.firstRound = true;
        this.fromGameFinished = false;
        this.gameTimeout = null;
        this.rightAnswers = 0;
        this.timerInterval = null;
        this.timeLeft = totalTime;
        this.presentage = 0;
        this.presentageToAdd = 100 / totalTime;
        this.beep = new Beep();
        this.playerQuestionCounter = 1;
        this.gameCounter = 0;

        document.getElementById("agentCol").classList.add('d-none');
        document.getElementById("playerImg").style.width = document.querySelector(".avatarImg").width * 1.3 + "px";
        this.playerPoints.current = "0/" + amountOfQuestions;
    }

    gameFlow() {
        this.setQuestionCounter(this.gameCounter + 1);
        if (this.firstRound) {
            this.gameTimeout = setTimeout(this.gameFinished.bind(this), this.totalTime * 1000)
            this.firstRound = false;
        }
        utils.removeClasses();
        this.setQuestion(this.gameCounter);
        this.timer();
    }

    async onChoosingAnswer(val) {
        this.beep.pause();
        clearTimeout(this.timerInterval);
        utils.afterChoosingAnswer();
        await this.answerCheck(val);
        clearTimeout(this.gameTimeout);
        this.gameTimeout = setTimeout(this.gameFinished.bind(this), this.timeLeft * 1000)
        this.gameCounter += 1;
        if(this.gameCounter == this.amountOfQuestions) {
            this.clear();
            this.gameFinished();
        }
        this.gameFlow();
    }

    async answerCheck(ans) {
        utils.switchAnswer(this.questions[this.gameCounter].rightAnswer);
        if (ans === this.questions[this.gameCounter].rightAnswer) {
            this.rightAnswers += 1
            this.playerPoints.current = this.rightAnswers + "/" + this.amountOfQuestions
        }
        await utils.sleep(1500)
    }

    timer() {

        // call the function again in 1 second.
        this.timerInterval = setTimeout(this.timer.bind(this), 1000);
        // decrease timeLeft by 1.
        this.timeLeft--;

        this.setCurrentTime(this.timeLeft)
        // add PRESENTAGE_TO_ADD% width to the progress bar.
        this.presentage += this.presentageToAdd
        document.getElementById("prog-bar").style.width = this.presentage + "%";
        if (this.timeLeft < 6 && !this.beep.isPlaying()) {
            document.getElementById("prog-bar").classList.replace("bg-dark", "bg-danger");
            // add shake to prog bar.
            document.getElementById("timeText").style.display = "block";
            this.beep.play();
        }
    }

    clear() {
        this.beep.stop();
        if (!this.fromGameFinished) {
            clearTimeout(this.gameTimeout);
        }
        clearTimeout(this.timerInterval);
    }

    gameFinished() {
        this.fromGameFinished = true;
        this.clear();
        this.nowOnline.isWin = this.rightAnswers;
        this.navigateToFinishPage();
    }
}

export { PlayAgainstTheClock }
