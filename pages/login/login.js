import {kinoUrlLogin, kinoUrlUsers} from "../../utils.js";
import {handleHttpErrors, setErrorMessage} from "../../utils.js";

export function initLogin(){
window.addEventListener("load", login())
}


 function getUserFromUsername(username){
    return fetch(kinoUrlUsers + username).then(handleHttpErrors);
}


async function login(){
    document.querySelector("#btn-user-login").onclick = checkLogin
    
    async function checkLogin(){

        const userDetails = {}
        userDetails.username = document.querySelector("#input-user-username").value
        userDetails.password = document.querySelector("#input-user-password").value
 
        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(userDetails)
        const updateScreening = await fetch(kinoUrlLogin, options).then(handleHttpErrors)
        if(setErrorMessage(updateScreening,"Login success") == true){
            document.querySelector("#update-status").innerHTML = "du bliver sendt videre"

            const username = userDetails.username;
            const user = await getUserFromUsername(username);

            localStorage.setItem("role", user.role);
            localStorage.setItem("username",userDetails.username)
            console.log(localStorage.getItem("username"))
            location.replace("/")

        }
    }
}