import {kinoUrlScreenings} from "../../utils.js";
import {kinoUrlTheaters} from "../../utils.js";
import {kinoUrlMovies} from "../../utils.js";
import {handleHttpErrors} from "../../utils.js";

export function initEditScreening(){
window.addEventListener("load", editScreening())
window.addEventListener("load", getAllTheaters())
window.addEventListener("load", getAllMovies())
window.addEventListener("load", getAllScreenings())
var selected = document.querySelector("#input-choose-screening")
selected.addEventListener("change", function () {
    editSelection(selected.value)
})}

async function editScreening() {
    document.querySelector("#btn-update-screening").onclick = updateScreening

    async function updateScreening() {
        const editScreening = {}
        editScreening.theaterId = document.querySelector("#input-choose-theater").value
        editScreening.movieId = document.querySelector("#input-choose-movie").value
        editScreening.screeningStartTime = document.querySelector("#input-choose-start-time").value + ":00"
        editScreening.price = document.querySelector("#input-ticket-price").value

        const URL = kinoUrlScreenings + document.querySelector("#input-choose-screening").value

        const options = {}
        options.method = "PATCH"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(editScreening)
        const updateScreening = await fetch(URL, options).then(handleHttpErrors)
        setErrorMessage(updateScreening, "Forestilling er opdateret")
    }
}

async function getAllTheaters(){
    const theaters = await fetch(kinoUrlTheaters).then(handleHttpErrors)
    dropDownData(theaters, "input-choose-theater")
}

async function getAllMovies() {
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    dropDownData(movies, "input-choose-movie")
}

async function getAllScreenings() {
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)
    const theaters = await fetch(kinoUrlTheaters).then(handleHttpErrors)
    screeningDropDown(screenings,theaters, "input-choose-screening")
}

function screeningDropDown(screeningData, theaterData, elementId) {
    for (let i = 0 ; i< screeningData.length ; i++){
        for(let j = 0 ; j < theaterData.length; j++){
        if(screeningData[i].theaterId == theaterData[j].id){
            screeningData[i].theaterName = theaterData[j].name
        }
        }
    }
    const dataArray = screeningData.map(screeningData =>
        `<option value="${screeningData.id}" >
        ${screeningData.screeningStartTime} ${screeningData.theaterName}
        </option>`)
    const dataDropDown = document.getElementById(elementId).innerHTML = dataArray

}

function dropDownData(data, elementId) {
    const dataArray = data.map(data =>
        `<option value="${data.id}">
        ${data.name}
        </option>`)
    const dataDropdown = document.getElementById(elementId).innerHTML = dataArray
}

async function editSelection(screeningId) {
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    const theater = await fetch(kinoUrlTheaters).then(handleHttpErrors)

    const selectedScreening = await getScreeningById(screeningId).then(data =>{
        console.log(data)
        setSelectedTheaterAndMovie(movies,data.movieId, "input-choose-movie")
        setSelectedTheaterAndMovie(theater,data.theaterId,"input-choose-theater")
        setSelectedDateTimeAndPrice(data.screeningStartTime, "input-choose-start-time")
        setSelectedDateTimeAndPrice(data.price, "input-ticket-price")
        })

}

async function setSelectedTheaterAndMovie(data, id, elementId) {
    var dataArray ="";
    for(let i = 0; i<data.length; i++){
        if(data[i].id == id){
            dataArray += "<option value=\"" + data[i].id +"\" selected = \"selected\" >"+data[i].name+ "</option>"
        }
        else{
            dataArray +="<option value=\"" + data[i].id+"\">"+data[i].name+" </option>"
        }
    }
    document.getElementById(elementId).innerHTML = dataArray
}

async function setSelectedDateTimeAndPrice(data, elementId) {
    document.getElementById(elementId).value = data
}

async function getScreeningById(id) {
    const screening = await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
    return screening;
}