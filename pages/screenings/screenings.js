import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "../../utils.js";

export function initScreenings() {
    getAllScreenings();
    createButtons();
}

export async function getAllScreenings() {
    try {
        const date = getDateFromUrl();
        const screenings = await fetch(kinoUrlScreenings + "date/" + date).then(handleHttpErrors);
        const uniqueMovieIds = uniqueScreeningMovies(screenings);
        const movies = await getMoviesForScreening(uniqueMovieIds);
        showMovies(movies, screenings);
    } catch (err) {
        console.log(err);
    }
}

// returnerer unikke filmID fra screenings, så flere af de samme film ikke bliver displayet
function uniqueScreeningMovies(screenings) {
    const uniqueMovieIds = [];
    const wrapper = document.getElementById("movie-wrapper");

    for (let i = 0; i < screenings.length; i++) {
        if (uniqueMovieIds.indexOf(screenings[i].movieId) === -1) {
            uniqueMovieIds.push(screenings[i].movieId);
        }
    }
    return uniqueMovieIds;
}

async function getMoviesForScreening(uniqueMovieIds) {
    const listOfMovies = [];
    for (let i = 0; i < uniqueMovieIds.length; i++) {
        const movie = await getMovieById(uniqueMovieIds[i]);
        listOfMovies.push(movie);
    }
    return listOfMovies;
}

async function getMovieById(id) {
    const movie = await fetch(kinoUrlMovies + id).then(handleHttpErrors);
    return movie;
}

// Viser unikke film
async function showMovies(movies, screenings) {
    const wrapper = document.querySelector(".template");
    const screeningsWrapper = document.querySelector("#screenings-wrapper");
    screeningsWrapper.innerHTML = "";
    let nodes = movies.map(async (movie) => {
        const img = document.createElement("img");
        img.src = "./images/halloween-ends.jpg";

        const div = document.createElement("div");
        div.classList.add("movie-object");

        const name = document.createElement("h2");
        name.classList.add("movie-name");
        name.innerText = movie.name;

        const playtime = "Spilletid: ";
        const movieTime = document.createElement("p");
        movieTime.classList.add("movieTime");
        movieTime.innerText = playtime + movie.runTime;

        const ul = document.createElement("ul");
        for (let i = 0; i < screenings.length; i++) {
            if (movie.id === screenings[i].movieId) {
                const a = document.createElement("a");
                const li = document.createElement("li");
                let string = screenings[i].screeningStartTime;
                string = string.substring(string.indexOf("T") + 1);
                // li.innerText = string;
                a.textContent = string;
                a.setAttribute("href", "#/screening?screeningId=" + screenings[i].id);
                li.appendChild(a);
                ul.appendChild(li);
            }
        }

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(movieTime);
        div.appendChild(ul);
        screeningsWrapper.appendChild(div);
        wrapper.appendChild(screeningsWrapper);
    });
}

function createButtons() {
    const wrapper = document.querySelector("#buttons-wrapper");
    wrapper.innerHTML = "";
    let today = new Date();

    const listOfDates = [];

    for (let i = 0; i < 8; i++) {
        const a = document.createElement("a");
        let newDate = new Date();
        newDate.setDate(today.getDate() + i);
        newDate = newDate.toISOString().split("T")[0];
        a.innerText = newDate;

        a.setAttribute("href", "#/?screeningDate=" + newDate);
        // a.addEventListener("mouseup", getScreeningsForDate);
        a.addEventListener("click", (e) => {
            const date = e.target.innerText;
            getScreeningsForDate(date);
        });
        wrapper.appendChild(a);
        listOfDates.push(newDate);
    }
}

async function getScreeningsForDate(date) {
    if (date != undefined) {
        try {
            const screeningsForDate = await fetch(kinoUrlScreenings + "date/" + date).then(handleHttpErrors);
            const uniqueMovieIds = uniqueScreeningMovies(screeningsForDate);
            const movies = await getMoviesForScreening(uniqueMovieIds);
            showMovies(movies, screeningsForDate);
        } catch (err) {
            console.log(err);
        }
    }
}

function getDateFromUrl() {
    const splitUrl = window.location.href.split("=");
    const screeningId = splitUrl[1];
    return screeningId;
}

// til at hente dato til en specifik dag
// let date = new Date();
//     date = date.toISOString().split("T")[0];
//     const getDate = await fetch(kinoUrlScreenings + "date/" + date).then(handleHttpErrors);
//     console.log(getDate);
