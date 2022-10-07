import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies } from "../../utils.js";

export function initScreening() {
    getScreening();
}

// refactor screenings.js til at gøre det samme
async function getScreening() {
    const id = getScreeningIdFromUrl();
    try {
        const screening = await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
        const movieId = screening.movieId;
        const movie = await fetch(kinoUrlMovies + movieId).then(handleHttpErrors);
        displayScreening(screening, movie);
    } catch (err) {
        console.log(err);
    }
}

function getScreeningIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const screeningId = splitUrl[1];
    return screeningId;
}

function displayScreening(screening, movie) {
    const movieName = document.querySelector(".single-screening-movie-name");
    const screeningTime = document.querySelector(".single-screening-time");

    const time = screening.screeningStartTime.split("T");

    movieName.innerHTML = movie.name;
    screeningTime.innerHTML = time[1];
}
