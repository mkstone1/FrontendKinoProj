import { handleHttpErrors, kinoUrlUsers} from "../../utils.js";

export function initCreateUser(){
    window.addEventListener("load", createUser())
}

async function createUser(){
    document.querySelector("#btn-add-user").onclick = checkPasswordAreIdentical

    function checkPasswordAreIdentical(){
        const password = document.querySelector("#input-password").value
        const checkPassword = document.querySelector("#input-password-again").value
        if(password == checkPassword){
            makeNewUser()
        }
        else{
            document.querySelector("#update-status").innerHTML = "password stemmer ikke overens"
        }
    }

    async function makeNewUser(){
        const newUser = {}
        newUser.firstName = document.querySelector("#input-first-name").value
        newUser.lastName = document.querySelector("#input-last-name").value
        newUser.userName = document.querySelector("#input-username").value
        newUser.email = document.querySelector("#input-email").value
        newUser.password = document.querySelector("#input-password").value

        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(newUser)
        const addUser = await fetch(kinoUrlUsers, options).then(handleHttpErrors)
        const createStatus = document.querySelector("#update-status")
        createStatus.style.display ="flex"
        createStatus.style.justifyContent = "center"
        if(addUser){
            document.querySelector("#update-status").innerHTML = "Bruger oprettet"
        }
        else{
            document.querySelector("#update-status").innerHTML = "Fejl ved oprettelse"
        }
    }
}

