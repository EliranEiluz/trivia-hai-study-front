import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TeamComponent({ teamName, otherUserFullName, nowOnline }) {

    var navigation = useNavigate();

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function deleteTeam() {

    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function connectTeam() {

    }

    
    /*
    * 1.Name: This function is called at the start of every 
    * 2.Parameters:
    * 3.Return value:
    * 4.Description:
    */
    function isOnline() {
        // check if the other user is online via server.

        //if online.
        document.getElementById("indicator").classList.add("online-indicator");
        document.getElementById("blink").classList.add("greenblink");

        //if offline.
        document.getElementById("indicator").classList.add("offline-indicator");
        document.getElementById("blink").classList.add("redblink");

        //if in other game
        document.getElementById("isInOtherGame").style.color = "black";
    }

    useEffect(() => {
        isOnline();
    }, [])
    return (
        <tr>
            <th scope="col" id="isOnline"> <div id="indicator">
                <span id="blink"></span>
            </div></th>
            <th scope="col" id="teamName">{teamName}</th>
            <th scope="col" id="isInOtherGame"></th>
            <th scope="col" id="connectBtn"><button className="btn btn-success menuBtn">Connect</button></th>
            <th scope="col" id="deleteBtn"><button className="btn btn-danger menuBtn">Delete</button></th>
        </tr>
    )
}

export default TeamComponent;