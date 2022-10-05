import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings} from "./utils.js";

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

async function showMovies(movies) {
    const wrapper = document.getElementById("movie-wrapper");

    let nodes = movies.map(async (movie) => {
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


        let screenings = []
        screenings = await getScreeningsFromMovie(movie.screeningIds);
        const ul = document.createElement("ul");
        for (let i = 0; i < screenings.length; i++) {
            const li = document.createElement("li");
            let s = screenings[i].screeningStartTime;
            s = s.substring(s.indexOf('T')+1);

            li.innerText = s;
            ul.appendChild(li);
        }
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(movieTime);
        div.appendChild(ul);
        wrapper.appendChild(div);
    });
}

async function getScreeningFromMovie(id) {
    const screening = await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
    return screening;
}

async function getScreeningsFromMovie(screeningIds){
    const screenings = [];
    for (let i = 0; i < screeningIds.length; i++) {
        const screening = await (getScreeningFromMovie(screeningIds[i]));
        screenings.push(screening);
    }
    return screenings;
}



