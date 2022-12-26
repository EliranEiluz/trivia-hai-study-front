import { useRef } from "react";

function ResearchGroupOption(value) {
    const val = useRef("");
    if(document.querySelector("html").lang === "en") {
        val.current = value.groupName
        }
    else {
        val.current = value.groupNameHe
    }
    return(
        <option value={value.researchGroupNumber}>{val.current}</option>
    )
}

export default ResearchGroupOption