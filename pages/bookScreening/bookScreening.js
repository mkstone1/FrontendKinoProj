import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings, kinoUrlTheaters} from "../../utils.js";


export function initBookScreening(){
    getObjects();
    createNewTicket();
}

async function getObjects(){
    const screeningId = getScreeningIdFromUrl();
    const screening = await getScreeningFromId(screeningId);
    const movie = await getMovieFromScreeningId(screeningId)
    const theater = await getTheaterFromScreeningId(screeningId);

    document.getElementById("screeningId").value = screeningId;
    document.getElementById("movie-name").innerText = movie.name;
    document.getElementById("screening-start-time").innerText = screening.screeningStartTime;
    document.getElementById("screening-price").innerText = screening.price + " kr.";

    const rowsSize = theater.rows;
    const seatsSize = theater.seatsPrRow;

    createRows(rowsSize);
    createSeats(seatsSize)
}

function createRows(size){
    const rows = document.getElementById("screeningRows");
    let rowNum;
    for (let i = 0; i < size; i++) {
        const option = document.createElement("option");
        rowNum = i+1;
        option.value = rowNum;
        option.innerText = rowNum;
        rows.appendChild(option);
    }
}

function createSeats(size){
    const seats = document.getElementById("screeningSeats")
    let seatNum;
    for (let i = 0; i < size; i++) {
        const option = document.createElement("option");
        seatNum = i+1;
        option.value = seatNum;
        option.innerText = seatNum;
        seats.appendChild(option);
    }
}

async function createNewTicket(){
    document.querySelector("#createTicket").onclick = makeNewTicket;

        async function makeNewTicket(){
            const ticket = {};
            ticket.rowNumber = document.querySelector("#screeningRows").value;
            ticket.seatNumber = document.querySelector("#screeningSeats").value;
            ticket.screeningId = document.querySelector("#screeningId").value;

            const options = {}
            options.method = "POST"
            options.headers = {"Content-type": "application/json"}
            options.body = JSON.stringify(ticket);
            console.log(ticket);
            const addTicket = await fetch("http://localhost:8080/api/tickets/", options).then(handleHttpErrors)
            window.location.href = "";
        }
}


function getScreeningIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    return splitUrl[1];
}

async function getScreeningFromId(id){
    return await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
}

async function getMovieFromScreeningId(screeningId){
    const screening = await fetch(kinoUrlScreenings + screeningId).then(handleHttpErrors);
    const movieId= screening.movieId;
    return getMovieById(movieId);
}

async function getMovieById(id) {
    return await fetch(kinoUrlMovies + id).then(handleHttpErrors);
}

async function getTheaterFromScreeningId(theaterId){
    return await fetch(kinoUrlTheaters + theaterId).then(handleHttpErrors);
}






