import {kinoUrlScreenings} from "../../utils.js";
import {kinoUrlTheaters} from "../../utils.js";
import {kinoUrlMovies} from "../../utils.js";
import {handleHttpErrors} from "../../utils.js";


window.addEventListener("load", editScreening())
window.addEventListener("load", getAllTheaters())
window.addEventListener("load", getAllMovies())
window.addEventListener("load", getAllScreenings())
var selected = document.querySelector("#input-choose-screening")
selected.addEventListener("change", function () {
    editSelection(selected.value)
})

async function editScreening() {
    document.querySelector("#btn-update-screening").onclick = updateScreening

    async function updateScreening() {
        const editScreening = {}
        editScreening.theaterName = document.querySelector("#input-choose-theater").value
        editScreening.movieId = document.querySelector("#input-choose-movie").value
        editScreening.screeningStartTime = document.querySelector("#input-choose-start-time").value + ":00"
        editScreening.price = document.querySelector("#input-ticket-price").value

        const URL = kinoUrlScreenings + document.querySelector("#input-choose-screening").value

        const options = {}
        options.method = "PATCH"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(editScreening)
        const updateScreening = await fetch(URL, options).then(handleHttpErrors)
        const updateStatus = document.querySelector("#update-status")
        updateStatus.style.display ="flex"
        updateStatus.style.justifyContent = "center"
        if(updateScreening){
            document.querySelector("#update-status").innerHTML = "show successfully updated"

        }
        else{
            document.querySelector("#update-status").innerHTML = "update failed"
        }
    }
}


async function getAllTheaters(){
    const theaters = await fetch(kinoUrlTheaters).then(handleHttpErrors)
    dropDownTheater(theaters, "input-choose-theater")
}

async function getAllMovies() {
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    dropDownData(movies, "input-choose-movie")
}

async function getAllScreenings() {
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)
    screeningDropDown(screenings, "input-choose-screening")
}

function dropDownTheater(data, elementId){
    const theaterArray = data.map(data =>
        `
        <option value="${data.name}">
        ${data.name}
        </option>`)
    const theaterDropDown= document.getElementById(elementId).innerHTML = theaterArray
}


function screeningDropDown(data, elementId) {
    const dataArray = data.map(data =>
        `<option value="${data.id}" >
        ${data.screeningStartTime} ${data.theaterName}
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
        setSelectedMovie(movies,data.movieId)
        setSelectedTheater(theater,data.theaterName)
        setSelectedDateTime(data.screeningStartTime)
        setSelectedPrice(data.price)
        })

}

async function setSelectedMovie(data, id) {
    var dataArray ="";
    for(let i = 0; i<data.length; i++){
        if(data[i].id == id){
            dataArray += "<option value=\"" + data[i].id +"\" selected = \"selected\" >"+data[i].name+ "</option>"
        }
        else{
            dataArray +="<option value=\"" + data[i].id+"\">"+data[i].name+" </option>"
        }

    }
    document.getElementById("input-choose-movie").innerHTML = dataArray
}

async function setSelectedTheater(data, id) {
    var dataArray ="";
    for(let i = 0; i<data.length; i++){
        if(data[i].name == id){
            dataArray += "<option value=\"" + data[i].name +"\" selected = \"selected\" >"+data[i].name+ "</option>"
        }
        else{
            dataArray +="<option value=\"" + data[i].name+"\">"+data[i].name+" </option>"
        }
    }
    document.getElementById("input-choose-theater").innerHTML = dataArray
}

async function setSelectedDateTime(data) {
    document.getElementById("input-choose-start-time").value = data
}
async function setSelectedPrice(data) {
    document.getElementById("input-ticket-price").value = data
}


async function getScreeningById(id) {
    const screening = await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
    return screening;
}
