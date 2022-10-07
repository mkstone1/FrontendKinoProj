import {handleHttpErrors, kinoUrlMovies} from "../../utils.js";

export function initSearchMovies(){

    window.addEventListener("load", getAllMovies())
}


async function getAllMovies() {
    console.log("test")
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    makeTableRows(movies)
}

function makeTableRows(movies){
    const tableRows = movies.map(movie => `
            <tr>
                <td>${movie.name}</td>
                <td>${movie.genre}</td>
                <td>${movie.minAge}</td>
                <td>${movie.actors}</td>
                <td>${movie.screeningIds}</td>
                <td>${movie.runTime}</td>
                </tr>
            `).join("")
    console.log(tableRows)
    document.getElementById("tbody").innerHTML = tableRows
}