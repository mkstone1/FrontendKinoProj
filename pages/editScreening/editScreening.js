import {kinoUrlScreenings} from "../../utils.js";
import {kinoUrlTheaters} from "../../utils.js";
import {kinoUrlMovies} from "../../utils.js";
import {handleHttpErrors} from "../../utils.js";

window.addEventListener("load", editScreening())
window.addEventListener("load", getAllTheaters())
window.addEventListener("load",getAllMovies())
window.addEventListener("load",getAllScreenings())

async function editScreening(){
    document.querySelector("#btn-update-screening").onclick = updateScreening

    async function updateScreening(){
        const editScreening = {}

        const options = {}
        options.method = "PUT"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(editScreening)
        const updateScreening = await fetch(kinoUrlScreenings, options).then(handleHttpErrors)
    }
}

async function getScreening(id) {
    const screening = await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
    return screening;
}

async function getScreenings(screeningIds){
    const screenings = [];
    for (let i = 0; i < screeningIds.length; i++) {
        const screening = await (getScreeningFromMovie(screeningIds[i]));
        screenings.push(screening);
    }
    return screenings;
}

async function getAllTheaters(){
    const theaters = await fetch(kinoUrlTheaters).then(handleHttpErrors)
    dropDownData(theaters, "input-choose-theater")
}

async function getAllMovies(){
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    dropDownData(movies, "input-choose-movie")
}

async function getAllScreenings(){
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)
    screeningDropDown(screenings, "input-choose-screening")
}

function screeningDropDown(data, elementId){
    const dataArray = data.map(data =>
        `<option value="${data.id}">
        ${data.screeningStartTime} ${data.theaterName}
        </option>`)
    const dataDropDown= document.getElementById(elementId).innerHTML = dataArray
}

function dropDownData(data, elementId){
    const dataArray = data.map(data =>
        `<option value="${data.id}">
        ${data.name}
        </option>`)
    const dataDropdown= document.getElementById(elementId).innerHTML = dataArray
}

/*async function createScreening(){

    async function makeNewScreening(){

        const newScreening = {}
        newScreening.theaterId = document.querySelector("#input-choose-theater").value
        newScreening.movieId = document.querySelector("#input-choose-movie").value
        newScreening.screeningStartTime = document.querySelector("#input-choose-start-time").value + ":00"
        newScreening.price = document.querySelector("#input-ticket-price").value

        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(newScreening)
        const addScreening = await fetch(kinoUrlScreenings, options).then(handleHttpErrors)
    }
}*/
