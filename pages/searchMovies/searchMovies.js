import {handleHttpErrors, kinoUrlMovies} from "../../utils.js";

export function initSearchMovies() {
    window.addEventListener("load", getAllMovies())
}


async function getAllMovies() {
    const movies = await fetch(kinoUrlMovies).then(handleHttpErrors)
    makeTableRows(movies)
    filterMovies(movies)
    clearFilter(movies)
    makeTableRowsLinks(movies)
}

function makeTableRows(movies) {

    const tableRows = movies.map(movie => `
            <tr id = movie-id${movie.id} class="selects">
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

function makeTableRowsLinks(movies) {
    const link = "#/movies?movieId="
    const movieAmount = movies.length
    for (let i = 0; i < movieAmount; i++) {
        document.getElementById("movie-id" + movies[i].id).onclick = (event) =>{
            console.log("test")
            var j = i +1
            location.href = link+j
        }
    }
}

function filterMovies(movies) {
    document.getElementById("btn-filter-movies").onclick = () => {
        const searchStr = document.getElementById("filter-movies").value.toLowerCase()
        const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchStr))
        makeTableRows(filteredMovies)
        makeTableRowsLinks(filteredMovies)
    }
}

function clearFilter(movies) {
    document.getElementById("btn-clear-filter").onclick = () => {
        makeTableRows(movies)
        makeTableRowsLinks(movies)
    }
}
