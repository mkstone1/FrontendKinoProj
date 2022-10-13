import {kinoUrlLogin} from "../../utils.js";
import {handleHttpErrors, setErrorMessage} from "../../utils.js";

export function initLogout(){

    localStorage.removeItem("username")
    localStorage.removeItem("role");
    location.replace("/")
}