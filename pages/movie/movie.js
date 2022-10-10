import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings} from "../../utils.js";


export function initMovie() {
    window.addEventListener("load", createDateSelect())
    window.addEventListener("load",getMovieInfo())
    setImage()
    var selected = document.querySelector("#movie-select-screening-date")
    selected.addEventListener("change", function () {
        document.querySelector("#screenings-for-movie").innerHTML = ""
        getMovieInfo()})
}

async function getMovieInfo(){
    const id =  getMovieIdFromUrl()
    const movie = await fetch(kinoUrlMovies+id).then(handleHttpErrors)
    const allScreenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)
    const date = document.querySelector("#movie-select-screening-date").value
    createMovieInfo(movie)
    getScreeningsForMovie(movie, allScreenings, date)
    
    
}

async function getScreeningsForDay() {
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)

}

function createMovieInfo(movie){
    document.querySelector("#movie-runtime").innerText = movie.runTime
    document.querySelector("#movie-genre").innerText = movie.genre
    document.querySelector("#movie-min-age").innerText = movie.minAge
    document.querySelector("#movie-title").innerText = movie.name
    document.querySelector("#movie-actors").innerText = movie.actors
}

function setImage(){
    document.querySelector("#movie-image").innerText = ""
    const img = document.createElement("img");
        img.src = "./images/halloween-ends.jpg";
        document.querySelector("#movie-image").appendChild(img)
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
    document.querySelector("#movie-select-screening-date").innerHTML = selectDates

}

function getMovieIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const movieId = splitUrl[1];
    return movieId;
}

async function getScreeningsForMovie(movie, allScreenings, date){
    document.getElementById("screenings-for-movie").innerText = ""
    const screeningsForMovie = allScreenings.filter(screening => screening.movieId == movie.id)
    .map(screening => screening.screeningStartTime.substring(screening.screeningStartTime.split("T")))
    .filter(screening => screening.substring(0,screening.indexOf("T"))==date)


    const divForScreenings = document.getElementById("screenings-for-movie")
    
    for (let i = 0; i < screeningsForMovie.length; i++) {
    
            const button = document.createElement("button");
            button.className = "selects"
            let string = screeningsForMovie[i].substring(screeningsForMovie[i].indexOf("T")+1)
            button.textContent = string;
            divForScreenings.appendChild(button)
    
    }
   
}