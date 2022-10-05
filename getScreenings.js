import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies } from "./utils.js";

window.addEventListener("load", init());

function init() {
    getAllScreenings();
}

export async function getAllScreenings() {
    try {
        const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors);
        console.log(screenings);
        const uniqueMovieIds = uniqueScreeningMovies(screenings);
        const movies = await getMoviesForScreening(uniqueMovieIds);
        showMovies(movies);
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
function showMovies(movies) {
    const wrapper = document.getElementById("movie-wrapper");
    let nodes = movies.map((movie) => {
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

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(movieTime);
        wrapper.appendChild(div);
    });
}
