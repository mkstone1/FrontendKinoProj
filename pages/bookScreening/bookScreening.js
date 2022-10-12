import { handleHttpErrors, kinoUrlMovies, kinoUrlScreenings, kinoUrlTheaters } from "../../utils.js";

let listOfSelectedSeats = [];
let listOfTickets = [];

export function initBookScreening() {
    createDisplay(20, 12);
    getObjects();
    createNewTicket();

    document.querySelector("#book-ticket").addEventListener("click", async function () {
        if (listOfSelectedSeats.length !== 0) {
            await postTickets(convertListOfSeatsToTicket());
        }
    });

    getAllTicketsFromScreening(getScreeningIdFromUrl()).then(function (tickets) {
        tickets.forEach((ticket) => {
            const seat = document.getElementById(ticket.rowNumber + " " + ticket.seatNumber);
            if (seat !== null) {
                seat.classList.add("taken");
            }
        });
    });
}

function convertListOfSeatsToTicket() {
    listOfSelectedSeats.forEach((seat) => {
        const seatNumber = seat.split(" ");
        const ticket = {
            rowNumber: seatNumber[0],
            seatNumber: seatNumber[1],
            screeningId: getScreeningIdFromUrl(),
        };
        listOfTickets.push(ticket);
    });
    return listOfTickets;
}

async function postTickets(tickets) {
    console.log(tickets);
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        console.log(ticket);
        await makeNewTicket(ticket);
    }
    async function makeNewTicket(newTicket) {
        const options = {};
        options.method = "POST";
        options.headers = { "Content-type": "application/json" };
        options.body = JSON.stringify(newTicket);
        console.log(options);
        await fetch("http://localhost:8080/api/tickets/", options).then(handleHttpErrors);
    }
}

async function getObjects() {
    const screeningId = getScreeningIdFromUrl();
    const screening = await getScreeningFromId(screeningId);
    const theaterId = screening.theaterId;
    const movie = await getMovieFromScreeningId(screeningId);
    const theater = await getTheaterFromScreeningId(theaterId);

    document.getElementById("screeningId").value = screeningId;
    document.getElementById("movie-name").innerText = movie.name;
    document.getElementById("screening-start-time").innerText = screening.screeningStartTime;
    document.getElementById("screening-price").innerText = screening.price + " kr.";

    const rowsSize = theater.rows;
    const seatsSize = theater.seatsPrRow;

    createRows(rowsSize);
    createSeats(seatsSize);
}

function createRows(size) {
    const rows = document.getElementById("screeningRows");
    let rowNum;
    for (let i = 0; i < size; i++) {
        const option = document.createElement("option");
        rowNum = i + 1;
        option.value = rowNum;
        option.innerText = rowNum;
        rows.appendChild(option);
    }
}

function createSeats(size) {
    const seats = document.getElementById("screeningSeats");
    let seatNum;
    for (let i = 0; i < size; i++) {
        const option = document.createElement("option");
        seatNum = i + 1;
        option.value = seatNum;
        option.innerText = seatNum;
        seats.appendChild(option);
    }
}

async function createNewTicket() {
    document.querySelector("#createTicket").onclick = makeNewTicket;

    async function makeNewTicket() {
        const ticket = {};
        ticket.rowNumber = document.querySelector("#screeningRows").value;
        ticket.seatNumber = document.querySelector("#screeningSeats").value;
        ticket.screeningId = document.querySelector("#screeningId").value;

        const options = {};
        options.method = "POST";
        options.headers = { "Content-type": "application/json" };
        options.body = JSON.stringify(ticket);
        console.log(ticket);
        const addTicket = await fetch("http://localhost:8080/api/tickets/", options).then(handleHttpErrors);
        window.location.href = "";
    }
}

function getScreeningIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const screeningId = splitUrl[1];
    return screeningId;
}

async function getScreeningFromId(id) {
    return await fetch(kinoUrlScreenings + id).then(handleHttpErrors);
}

async function getMovieFromScreeningId(screeningId) {
    const screening = await fetch(kinoUrlScreenings + screeningId).then(handleHttpErrors);
    const movieId = screening.movieId;
    return getMovieById(movieId);
}

async function getMovieById(id) {
    return await fetch(kinoUrlMovies + id).then(handleHttpErrors);
}

async function getTheaterFromScreeningId(theaterId) {
    return await fetch(kinoUrlTheaters + theaterId).then(handleHttpErrors);
}

async function createDisplay(seats, rows) {
    const wrapper = document.querySelector("#seats-display");
    wrapper.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let n = 0; n < seats; n++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.id = i + 1 + " " + (n + 1);
            wrapper.appendChild(box);

            box.addEventListener("click", function () {
                if (listOfSelectedSeats.includes(box.id)) {
                    console.log(listOfSelectedSeats);
                    listOfSelectedSeats.splice(listOfSelectedSeats.indexOf(box.id), 1);
                    box.classList.remove("selected");
                } else {
                    if (box.classList.contains("taken")) {
                        alert("Seat is taken");
                    } else {
                        listOfSelectedSeats.push(box.id);
                        box.classList.add("selected");
                        console.log(listOfSelectedSeats);
                    }
                }
            });
        }
    }
}

async function getAllTicketsFromScreening(screeningId) {
    const tickets = await fetch("http://localhost:8080/api/tickets/" + "screening/" + screeningId).then(handleHttpErrors);
    return tickets;
}
