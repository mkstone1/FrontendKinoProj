import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings} from "../../utils.js";


export function initMovie() {
    window.addEventListener("load", createDateSelect())
    window.addEventListener("load",getMovieInfo())
}

async function getMovieInfo(){
    const id =  getMovieIdFromUrl()
    console.log(id)
    const movie = await fetch(kinoUrlMovies+id).then(handleHttpErrors)
    createMovieInfo(movie)
}

async function getScreeningsForDay() {
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)

}

function createMovieInfo(movie){
    console.log(movie)
    document.querySelector("#movie-runtime").innerText = movie.runTime
    document.querySelector("#movie-genre").innerText = movie.genre
    document.querySelector("#movie-min-age").innerText = movie.minAge

}

function createDateSelect() {
    let today = new Date();

    const listOfDates = [];
    var selectDates = "";
    for (let i = 0; i < 8; i++) {
        let newDate = new Date();
        newDate.setDate(today.getDate() + i);
        newDate = newDate.toISOString().split("T")[0];
        if (i == 0) {
            selectDates += "<option selected=selected>" + newDate + "</option>"
        } else {
            selectDates += "<option>" + newDate + "</option>"

        }
    }
    document.querySelector("#movie-select-screening").innerHTML = selectDates

}

function getMovieIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    console.log(splitUrl)
    const movieId = splitUrl[1];
    return movieId;
}