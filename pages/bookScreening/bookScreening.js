import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "../../utils.js";

function getScreeningIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const screeningId = splitUrl[1];
    return screeningId;
}

document.getElementById("input-screening-id").innerText = getScreeningIdFromUrl();


