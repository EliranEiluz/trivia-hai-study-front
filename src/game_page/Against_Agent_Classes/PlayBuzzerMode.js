import * as utils from '../utils'
import { Beep } from '../Beep'

class PlayBuzzerMode {
    constructor(amountOfQuestions, timeForQuestion, setQuestionCounter, questions, setQuestion, playerPoints, agentPoints, setCurrentTime, agentOperations, nowOnline, navigateToFinishPage) {
        this.amountOfQuestions = amountOfQuestions;
        this.timeForQuestion = timeForQuestion;
        this.timerInterval = null;
        this.firstRound = true;
        this.timeLeft = timeForQuestion;
        this.presentage = 0;
        this.presentageToAdd = 100 / timeForQuestion;
        this.isPlayerTurn = false;
        this.beep = new Beep();
        this.avatarSize = 0;
        this.setQuestionCounter = setQuestionCounter;
        this.gameCounter = 0;
        this.questions = questions;
        this.setQuestion = setQuestion;
        this.playerPoints = playerPoints;
        this.agentPoints = agentPoints;
        this.setCurrentTime = setCurrentTime;
        this.agentOperations = agentOperations;
        this.agentTimeout = null;
        this.nowOnline = nowOnline;
        this.navigateToFinishPage = navigateToFinishPage
        this.agentPoints.current = 0;
        this.playerPoints.current = 0;
        this.buzzerSound = new Audio(require('../buzzer.wav'));
        utils.initDetails(this.nowOnline);
        this.rightAnswerTime = 1200;
        this.minTimeWhenAgentWrong = 10;
    }

    gameFlow() {
        this.setQuestionCounter(this.gameCounter+1);
        this.presentage = 0;
        this.timeLeft = this.timeForQuestion;
        utils.initializeBeforeTurn();
        this.setQuestion(this.gameCounter);
        this.timer();
        if(this.nowOnline.roundNumber === 0) {
            this.agent();
        }
        else {
            this.tempAgent();
        }
    }

    async answerCheck(ans, whoClicked) {
        utils.switchAnswer(this.questions[this.gameCounter].rightAnswer);
        if (whoClicked == "player") {
            if (ans === this.questions[this.gameCounter].rightAnswer) {
                utils.updateDetails(this.nowOnline, this.gameCounter + 1, true);
                this.playerPoints.current += 1;
            } else {
                utils.updateDetails(this.nowOnline, this.gameCounter + 1, false);
            }
        }
        else if (whoClicked == "agent"){
            if (ans === this.questions[this.gameCounter].rightAnswer) {
                this.agentPoints.current += 1;
            }
        }
        utils.removeBlink()
        await utils.sleep(4000);
    }


    async onChoosingAnswer(val, whoClicked) {
        //this.buzzerSound.play()
        clearTimeout(this.agentTimeout);

        //[val, whoClicked] = this.agentFirst(whoClicked, val)
        // disable the answers buttons
        utils.afterChoosingAnswer();

        // stop the beep, if it was on, and set it back to 0.
        this.beep.stop();

        // clear the question timer's timeout.
        clearTimeout(this.timerInterval)

        // check if an answer was chosen(in case the user/agent did not chose an answer by the given time, val is 0),
        // and if so, make the chosen answer button blink.
        if (val !== 0) {
            await utils.makeBlink(val, whoClicked);
        }

        // mark the right answer with green color.
        await this.answerCheck(val, whoClicked);

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
            this.onChoosingAnswer(0, "agent");
        }
    }

    clear() {
        clearTimeout(this.timerInterval);
        clearTimeout(this.agentTimeout);
        this.beep.stop();
    }

     /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    agent() {
        this.agentTimeout = setTimeout(() => {
            var chosen = this.agentOperations.current[this.gameCounter].answer;
            var e;
            switch (chosen) {
                case 1:
                    document.getElementById('1stAnswer').checked = true;
                    e = 1
                    break;
                case 2:
                    document.getElementById('2ndAnswer').checked = true;
                    e = 2
                    break;
                case 3:
                    document.getElementById('3rdAnswer').checked = true;
                    e = 3
                    break;
                case 4:
                    document.getElementById('4thAnswer').checked = true;
                    e = 4
                    break;
                default:
                    return;
            }
            this.onChoosingAnswer(e, "agent")
        }, this.agentOperations.current[this.gameCounter].time)
    }

    tempAgent() {
        var chosen;
        var time;
        if(((this.playerPoints.current - this.agentPoints.current) > 1) && this.nowOnline.roundNumber == this.nowOnline.amountOfRounds) {
            chosen = this.questions[this.gameCounter].rightAnswer;
            time = this.rightAnswerTime;
        }
        else if((((this.playerPoints.current - this.agentPoints.current) > 1) || ((this.playerPoints.current - this.agentPoints.current + 1) == (this.amountOfQuestions - this.gameCounter))) && this.nowOnline.roundNumber != this.nowOnline.amountOfRounds) {
            chosen = this.questions[this.gameCounter].rightAnswer;
            time = this.rightAnswerTime;
        }
        else if(this.gameCounter == 17 && this.playerPoints.current - this.agentPoints.current == 1) {
            if (this.questions[this.gameCounter].rightAnswer === 1) {
                chosen = 2;
            }
            else {
                chosen = this.questions[this.gameCounter].rightAnswer - 1;
            }
            time = this.rightAnswerTime;
        }
        else {
            if (this.questions[this.gameCounter].rightAnswer === 1) {
                chosen = 2;
            }
            else {
                chosen = this.questions[this.gameCounter].rightAnswer - 1;
            }
            time = Math.floor(Math.random() * (this.timeForQuestion - this.minTimeWhenAgentWrong) + this.minTimeWhenAgentWrong) * 1000;
        }
        this.agentTimeout = setTimeout(() => {
            var e;
            switch (chosen) {
                case 1:
                    document.getElementById('1stAnswer').checked = true;
                    e = 1
                    break;
                case 2:
                    document.getElementById('2ndAnswer').checked = true;
                    e = 2
                    break;
                case 3:
                    document.getElementById('3rdAnswer').checked = true;
                    e = 3
                    break;
                case 4:
                    document.getElementById('4thAnswer').checked = true;
                    e = 4
                    break;
                default:
                    return;
            }
            this.onChoosingAnswer(e, "agent")
        }, time)
        
    }

    gameFinished() {
        this.clear();
        utils.fetchPlayerDetails(this.nowOnline);
        this.nowOnline.playerPoints = this.playerPoints.current;
        this.nowOnline.agentPoints = this.agentPoints.current;
        if (this.nowOnline.playerPoints > this.nowOnline.agentPoints) {
            this.nowOnline.isWin = 2;
        }
        else if (this.nowOnline.agentPoints > this.nowOnline.playerPoints) {
            this.nowOnline.isWin = 0;
        }
        else {
            this.nowOnline.isWin = 1;
        }
        this.navigateToFinishPage();
    }

}
export { PlayBuzzerMode }