import * as utils from './utils'
import {Beep} from './Beep.js'
class PlayAgainstAgent {
    constructor(amountOfQuestions, timeForQuestion, setQuestionCounter, questions, setQuestion, playerPoints, agentPoints, setCurrentTime, playWithAgentOperations, nowOnline, navigateToFinishPage) {
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
        this.playerQuestionCounter = 1;
        this.agentQuestionCounter = 1;
        this.setQuestionCounter = setQuestionCounter;
        this.gameCounter = 0;
        this.questions = questions;
        this.setQuestion = setQuestion;
        this.playerPoints = playerPoints;
        this.agentPoints = agentPoints;
        this.setCurrentTime = setCurrentTime;
        this.playWithAgentOperations = playWithAgentOperations
        this.agentTimeout = null;
        this.nowOnline = nowOnline;
        this.navigateToFinishPage = navigateToFinishPage
    }

    gameFlow() {
        if(this.firstRound) {
            this.avatarSize = document.querySelector(".avatarImg").width;
            this.firstRound = false;
        }
        this.presentage = 0;
        this.timeLeft = 20;
        utils.initializeBeforeTurn();
        this.setQuestion(this.gameCounter);
        this.timer();
        this.isPlayerTurn = !this.isPlayerTurn;
        if (this.isPlayerTurn) {
            this.setQuestionCounter(this.playerQuestionCounter);
            document.getElementById("playerImg").style.width = this.avatarSize * 1.3 + "px";
            document.getElementById("agentImg").style.width = this.avatarSize / 1.5 + "px";
            document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
            if (this.playWithAgentOperations) {
                this.playWithAgent()
            }
            this.playerQuestionCounter += 1;
        }
        else {
            this.setQuestionCounter(this.agentQuestionCounter)
            document.body.style.backgroundImage = "linear-gradient(0deg,#c0a0c3, #c0a0c3)";
            document.getElementById("playerImg").style.width = this.avatarSize / 1.5 + "px";
            document.getElementById("agentImg").style.width = this.avatarSize * 1.3 + "px";
            this.agent();
            this.agentQuestionCounter += 1;
        }
    }

    async answerCheck(ans) {
        utils.switchAnswer(this.questions[this.gameCounter].rightAnswer);
        if (this.isPlayerTurn) {
            if (ans === this.questions[this.gameCounter].rightAnswer) {
                this.playerPoints.current += 100;
            }
            else {
                if (this.playerPoints.current > 0) {
                    this.playerPoints.current -= 100;
                }
            }
        }
        else {
            if (ans === this.questions[this.gameCounter].rightAnswer) {
                this.agentPoints.current += 100;
            }
            else {
                if (this.agentPoints.current > 0) {
                    this.agentPoints.current -= 100;
                }
            }
        }
        utils.removeBlink()
        await utils.sleep(2000);
    }


    async onChoosingAnswer(val) {
        if(this.agentTimeout) {
            clearTimeout(this.agentTimeout)
        }
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
            //gameFinished();
            return;
        }
        this.gameFlow();
    }
    
    timer() {

        // timeLeft is set to X, X is the time for each question. So, if there is time left, make the following:
        if (this.timeLeft > 0) {
            console.log('here');
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

       /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    async agent() {
        document.getElementById("1stAnswer").disabled = "true";
        document.getElementById("2ndAnswer").disabled = "true";
        document.getElementById("3rdAnswer").disabled = "true";
        document.getElementById("4thAnswer").disabled = "true";
        var rand = (Math.floor(Math.random() * (this.timeForQuestion - 1)) + 1) * 1000;
        setTimeout(() => {
            var chosen = Math.floor(Math.random() * 4) + 1;
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
            this.onChoosingAnswer(e)
        }, rand)
    }

    clear() {
        clearTimeout(this.timerInterval);
        if(this.agentTimeout) {
            clearTimeout(this.agentTimeout);
        }
        this.beep.stop();
        document.body.style.backgroundImage = "linear-gradient(0deg,#fce0b3, #ffda9e)";
    }

     /*
    * 1.Name:
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    playWithAgent() {
        this.agentTimeout = setTimeout(() => {
            var chosen = this.playWithAgentOperations.current[this.playerQuestionCounter - 1].answer;
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
            this.onChoosingAnswer(e)
        }, this.playWithAgentOperations.current[this.playerQuestionCounter - 1].time)
    }

    gameFinished() {
        this.clear();
        this.nowOnline.playerPoints = this.playerPoints.current;
        this.nowOnline.agentPoints = this.agentPoints.current;
        if (this.playerPoints.current > this.agentPoints.current) {
            this.nowOnline.isWin = 2;
        }
        else if (this.agentPoints.current > this.playerPoints.current) {
            this.nowOnline.isWin = 0;
        }
        else {
            this.nowOnline.isWin = 1;
        }
        this.navigateToFinishPage();
    }

}

export {PlayAgainstAgent}