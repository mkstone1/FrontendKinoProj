import { handleHttpErrors, kinoUrlMovies } from "./utils.js";

window.addEventListener("load", init());

function init() {
    getAllMovies();
}

async function getAllMovies() {
    try {
        const movies = await fetch(kinoUrlMovies).then(handleHttpErrors);
        showMovies(movies);
    } catch (err) {
        console.log(err);
    }
}

function showMovies(movies) {
    const wrapper = document.getElementById("movie-wrapper");
    let nodes = movies.map((movie) => {
        console.log(movie);
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
