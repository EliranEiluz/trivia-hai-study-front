import { useNavigate } from "react-router-dom";
import { serverIp, Details } from "..";

export function initializeBeforeTurn() {
    document.getElementById("timeText").style.display = "none";
    document.getElementById("prog-bar").classList.replace("bg-danger", "bg-dark");
    document.getElementById("prog-bar").style.width = "0%"
    removeClasses();
}

export function afterChoosingAnswer() {
    document.getElementById("1stAnswerLabel").classList.add("disableAnswersTouchScreen");
    document.getElementById("2ndAnswerLabel").classList.add("disableAnswersTouchScreen");
    document.getElementById("3rdAnswerLabel").classList.add("disableAnswersTouchScreen");
    document.getElementById("4thAnswerLabel").classList.add("disableAnswersTouchScreen");
}

export function switchAnswer(rightAnswer) {
    switch (rightAnswer) {
        case 1:
            document.getElementById("1stAnswerLabel").classList.add("rightAnswer");
            document.getElementById("1stAnswer").classList.add("rightAnswer");
            break;
        case 2:
            document.getElementById("2ndAnswerLabel").classList.add("rightAnswer");
            document.getElementById("2ndAnswer").classList.add("rightAnswer");
            break;
        case 3:
            document.getElementById("3rdAnswerLabel").classList.add("rightAnswer");
            document.getElementById("3rdAnswer").classList.add("rightAnswer");
            break;
        case 4:
            document.getElementById("4thAnswerLabel").classList.add("rightAnswer");
            document.getElementById("4thAnswer").classList.add("rightAnswer");
            break;
        default:
            return;
    }
}

/*
* 1.Name: This function is called at the start of every 
* 2.Parameters:
* 3.Return value:
* 4.Description:
*/
export function removeClasses() {
    document.getElementById("1stAnswerLabel").classList.remove("rightAnswer");
    document.getElementById("2ndAnswerLabel").classList.remove("rightAnswer");
    document.getElementById("3rdAnswerLabel").classList.remove("rightAnswer");
    document.getElementById("4thAnswerLabel").classList.remove("rightAnswer");

    document.getElementById("1stAnswerLabel").classList.remove("disableAnswersTouchScreen");
    document.getElementById("2ndAnswerLabel").classList.remove("disableAnswersTouchScreen");
    document.getElementById("3rdAnswerLabel").classList.remove("disableAnswersTouchScreen");
    document.getElementById("4thAnswerLabel").classList.remove("disableAnswersTouchScreen");

    document.getElementById("1stAnswer").classList.remove("rightAnswer");
    document.getElementById("2ndAnswer").classList.remove("rightAnswer");
    document.getElementById("3rdAnswer").classList.remove("rightAnswer");
    document.getElementById("4thAnswer").classList.remove("rightAnswer");

    // the answers stays in "checked" status, so after disable and enable resets the status.
    document.getElementById("1stAnswer").disabled = "true";
    document.getElementById("2ndAnswer").disabled = "true";
    document.getElementById("3rdAnswer").disabled = "true";
    document.getElementById("4thAnswer").disabled = "true";
    document.getElementById("1stAnswer").disabled = false;
    document.getElementById("2ndAnswer").disabled = false;
    document.getElementById("3rdAnswer").disabled = false;
    document.getElementById("4thAnswer").disabled = false;

    document.getElementById("1stAnswer").checked = false;
    document.getElementById("2ndAnswer").checked = false;
    document.getElementById("3rdAnswer").checked = false;
    document.getElementById("4thAnswer").checked = false;
}


/*
* 1.Name:
* 2.Parameters:
* 3.Return value:
* 4.Description:
*/
export const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);


export async function makeBlink(chosen) {
    switch (chosen) {
        case 1:
            document.getElementById('1stAnswerLabel').classList.add("blink");
            break;
        case 2:
            document.getElementById('2ndAnswerLabel').classList.add("blink");
            break;
        case 3:
            document.getElementById('3rdAnswerLabel').classList.add("blink");
            break;
        case 4:
            document.getElementById('4thAnswerLabel').classList.add("blink");
            break;
        default:
            return;
    }
    await sleep(2000)
}

export function removeBlink() {
    document.getElementById("1stAnswerLabel").classList.remove("blink");
    document.getElementById("2ndAnswerLabel").classList.remove("blink");
    document.getElementById("3rdAnswerLabel").classList.remove("blink");
    document.getElementById("4thAnswerLabel").classList.remove("blink");
}


export function fetchPlayerDetails(nowOnline) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: nowOnline.onlineUser.fullName, details: nowOnline.details }),
        credentials: 'include'
    };
    fetch(serverIp.ip + "/User/Gamedetails", request);
    nowOnline.details = null;
}

export function initDetails(nowOnline) {
    nowOnline.details = new Details(nowOnline.roundNumber, nowOnline.onlineUser.gameNumber);
}

export function updateDetails(nowOnline, questionNumber, isRightAnswer) {
    nowOnline.details.userAnswers.push({questionNumber: questionNumber, isRightAnswer: isRightAnswer})
}

