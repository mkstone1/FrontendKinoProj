import {handleHttpErrors, kinoUrlMovies} from "../../utils.js";

export function initSearchMovies(){
    window.addEventListener("load", getAllMovies())
}


async function getAllMovies() {
    console.log("test")
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    makeTableRows(movies)
    filterMovies(movies)
    clearFilter(movies)
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
    document.getElementById("tbody").innerHTML = tableRows
}

function filterMovies(movies) {
    document.getElementById("btn-filter-movies").onclick = () => {
        console.log("test")
        const searchStr = document.getElementById("filter-movies").value
        const filteredMovies = movies.filter(movie => movie.name.includes(searchStr))
        makeTableRows(filteredMovies)
    }
}

function clearFilter(movies) {
    document.getElementById("btn-clear-filter").onclick = () => {
        makeTableRows(movies)
    }
}
