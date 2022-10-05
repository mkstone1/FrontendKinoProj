import {kinoUrlScreenings} from "../../utils.js";
import {kinoUrlTheaters} from "../../utils.js";
import {handleHttpErrors} from "../../utils.js";

window.addEventListener("load", createScreening())
window.addEventListener("load", getAllTheaters())

async function createScreening(){
    document.querySelector("#btn-add-screening").onclick = makeNewScreening

    async function makeNewScreening(){
        console.log("make new screening")
        const newScreening = {}
        //const startTime = newScreening.startTime = document.querySelector("#input-choose-start-time").value
        //const startDate = document.querySelector("#input-choose-start-date").value
        newScreening.theaterId = document.querySelector("#input-choose-theater").value
        newScreening.movieId = document.querySelector("#input-choose-movie").value
        newScreening.screeningStartTime = document.querySelector("#input-choose-start-time").value + ":00"
        //newScreening.startDate = document.querySelector(#input-choose-start-date).value
        //newScreening.screeningStartTime = startDate + "T" + startTime

        newScreening.price = document.querySelector("#input-ticket-price").value

        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(newScreening)
        const addScreening = await fetch(kinoUrlScreenings, options).then(handleHttpErrors)
    }
}

async function getAllTheaters(){
    const theaters = await fetch(kinoUrlTheaters).then(handleHttpErrors)
    dropDownData(theaters)

function dropDownData(data){
    const theaterArray = data.map(theater =>
        `
        <option>
        ${theater.name}
        </option>`)
    const theaterDropDown= document.getElementById("input-choose-theater").innerHTML = theaterArray
}
}

