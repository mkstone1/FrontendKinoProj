import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings} from "../../utils.js";

export function initMovie(){
    window.addEventListener()
}



async function getScreeningsForDay(){
    const day = document.getElementById("movie-select-screening").value
    const screenings = await fetch(kinoUrlScreenings).then(handleHttpErrors)
    screenings.map()
}

function createDateSelect(){

}