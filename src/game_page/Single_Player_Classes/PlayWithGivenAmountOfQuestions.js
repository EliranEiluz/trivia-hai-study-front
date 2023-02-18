import * as utils from '../utils'
import {Beep} from '../Beep'

class PlayWithGivenAmountOfQuestions {
    constructor(amountOfQuestions, timeForQuestion, setQuestionCounter, questions, setQuestion, playerPoints, setCurrentTime, nowOnline, navigateToFinishPage) {
        this.amountOfQuestions = amountOfQuestions;
        this.timeForQuestion = timeForQuestion;
        this.setQuestionCounter = setQuestionCounter;
        this.questions = questions;
        this.setQuestion = setQuestion;
        this.playerPoints = playerPoints;
        this.setCurrentTime = setCurrentTime;
        this.nowOnline = nowOnline;
        this.navigateToFinishPage = navigateToFinishPage;

        this.rightAnswers = 0;
        this.timerInterval = null;
        this.timeLeft = timeForQuestion;
        this.presentage = 0;
        this.presentageToAdd = 100 / timeForQuestion;
        this.beep = new Beep();
        this.playerQuestionCounter = 1;
        this.gameCounter = 0;
        document.getElementById("agentCol").classList.add('d-none');
        document.getElementById("playerImg").style.width = document.querySelector(".avatarImg").width * 1.3 + "px";
        this.playerPoints.current = "0/20";
    }

    gameFlow() {
        this.presentage = 0;
        this.timeLeft = 20;
        utils.initializeBeforeTurn();
        this.setQuestion(this.gameCounter);
        this.timer();
        this.setQuestionCounter(this.playerQuestionCounter);
        this.playerQuestionCounter += 1;
    }

    async answerCheck(ans) {
        utils.switchAnswer(this.questions[this.gameCounter].rightAnswer);
        if (ans === this.questions[this.gameCounter].rightAnswer) {
            this.rightAnswers += 1;
            this.playerPoints.current = this.rightAnswers + "/" + this.amountOfQuestions;
        }
        utils.removeBlink();
        await utils.sleep(2000);
    }

    
    async onChoosingAnswer(val) {

        // disable the answers buttons
        utils.afterChoosingAnswer();

        // stop the beep, if it was on, and set it back to 0.
        this.beep.stop();

        // clear the question timer's timeout.
        clearTimeout(this.timerInterval)

        // check if an answer was chosen(in case the user/agent did not chose an answer by the given time, val is 0),
        // and if so, make the chosen answer button blink.
        if (val !== 0) {
            await utils.makeBlink(val);
        }

        // mark the right answer with green color.
        await this.answerCheck(val);

        // increasing the game counter variable and check if the game is finished. If yes, call gameFinished and return.
        // If not, call gameFlow to run another round.
        this.gameCounter += 1;
        if (this.gameCounter === this.amountOfQuestions) {
            this.gameFinished();
            return;
        }
        this.gameFlow();
    }
    
    timer() {

        // timeLeft is set to X, X is the time for each question. So, if there is time left, make the following:
        if (this.timeLeft > 0) {

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
        else {
            this.onChoosingAnswer(0);
        }
    }

    clear() {
        clearTimeout(this.timerInterval);
        this.beep.stop();
    }

    gameFinished() {
        this.clear();
        this.nowOnline.isWin = this.rightAnswers;
        this.navigateToFinishPage();
    }

}

export {PlayWithGivenAmountOfQuestions}