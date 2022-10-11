import { handleHttpErrors, kinoUrlMovies} from "../../utils.js";

export function initCreateMovie(){
    window.addEventListener("load", createMovie())
}

async function createMovie(){
    document.querySelector("#btn-add-movie").onclick = makeNewMovie

    async function makeNewMovie(){
        const newMovie = {}
        newMovie.name = document.querySelector("#input-movie-title").value
        newMovie.genre = document.querySelector("#input-movie-genre").value
        newMovie.minAge = document.querySelector("#input-movie-min-age").value
        newMovie.actors = document.querySelector("#input-movie-actors").value
        newMovie.runTime = document.querySelector("#input-movie-run-time").value

        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(newMovie)
        const addMovie = await fetch(kinoUrlMovies, options).then(handleHttpErrors)
        const createStatus = document.querySelector("#update-status")
        createStatus.style.display ="flex"
        createStatus.style.justifyContent = "center"
        if(addMovie){
            document.querySelector("#update-status").innerHTML = "Film oprettet"
        }
        else{
            document.querySelector("#update-status").innerHTML = "Fejl ved oprettelse"
        }
    }
}