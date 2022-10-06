import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "./utils.js";

window.addEventListener("load", init());

function init() {
    getAllScreenings();
}

export async function getAllScreenings() {
    try {
        const screenings = await fetch(kinoUrlScreeningsToday).then(handleHttpErrors);
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
    console.log(screenings);
    const wrapper = document.getElementById("movie-wrapper");
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
                const li = document.createElement("li");
                let string = screenings[i].screeningStartTime;
                string = string.substring(string.indexOf("T") + 1);
                li.innerText = string;
                ul.appendChild(li);
            }
        }

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(movieTime);
        div.appendChild(ul);
        wrapper.appendChild(div);
    });
}

// til at hente dato til en specifik dag
// let date = new Date();
//     date = date.toISOString().split("T")[0];
//     const getDate = await fetch(kinoUrlScreenings + "date/" + date).then(handleHttpErrors);
//     console.log(getDate);
