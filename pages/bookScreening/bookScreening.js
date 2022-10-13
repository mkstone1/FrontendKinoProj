import { handleHttpErrors, kinoUrlMovies, kinoUrlScreenings, kinoUrlTheaters, kinoUrlTickets } from "../../utils.js";

let listOfSelectedSeats = [];
let listOfTickets = [];

export function initBookScreening() {
    getObjects();

    document.querySelector("#book-ticket").addEventListener("click", async function () {
        if (listOfSelectedSeats.length !== 0) {
            await postTickets(convertListOfSeatsToTicket());
        }
    });
}

function convertListOfSeatsToTicket() {
    listOfSelectedSeats.forEach((seat) => {
        const seatNumber = seat.split(" ");
        const ticket = {
            rowNumber: seatNumber[0],
            seatNumber: seatNumber[1],
            screeningId: getScreeningIdFromUrl(),
            username: localStorage.getItem("username"),
        };
        listOfTickets.push(ticket);
    });
    return listOfTickets;
}

async function postTickets(tickets) {

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        await makeNewTicket(ticket);
        const successMessage = document.querySelector("#success")
        successMessage.removeAttribute("hidden");
        //when array is looped through, clear the array
        if (i === tickets.length - 1) {
            listOfSelectedSeats = [];
            listOfTickets = [];

        }
    }
    async function makeNewTicket(newTicket) {
        const options = {};
        options.method = "POST";
        options.headers = { "Content-type": "application/json" };
        options.body = JSON.stringify(newTicket);
        await fetch(kinoUrlTickets, options).then(handleHttpErrors);
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

    createDisplay(seatsSize, rowsSize);
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

function createDisplay(seats, rows) {
    const wrapper = document.querySelector("#seats-display");
    wrapper.innerHTML = "";

    getAllTicketsFromScreening(getScreeningIdFromUrl()).then(function (tickets) {
        tickets.forEach((ticket) => {
            const seat = document.getElementById(ticket.rowNumber + " " + ticket.seatNumber);
            if (seat !== null) {
                seat.classList.add("taken");
            }
        });
    });

    if (rows == 25) {
        wrapper.classList.remove("seats-display-small");
        wrapper.classList.add("seats-display-big");
    } else {
        wrapper.classList.remove("seats-display-big");
        wrapper.classList.add("seats-display-small");
    }

    for (let i = 0; i < rows; i++) {
        for (let n = 0; n < seats; n++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.id = i + 1 + " " + (n + 1);
            wrapper.appendChild(box);

            box.addEventListener("click", function () {
                showTotalTicketPrice();
                if (listOfSelectedSeats.includes(box.id)) {
                
                    listOfSelectedSeats.splice(listOfSelectedSeats.indexOf(box.id), 1);
                    box.classList.remove("selected");
                } else {
                    if (box.classList.contains("taken")) {
                        alert("Seat is taken");
                    } else {
                        listOfSelectedSeats.push(box.id);
                        box.classList.add("selected");
                
                    }
                }
            });
        }
    }
}

async function getAllTicketsFromScreening(screeningId) {
    const tickets = await fetch(kinoUrlTickets + "screening/" + screeningId).then(handleHttpErrors);
    return tickets;
}

//get price from screenings by screening id and display the total price of the tickets
async function getPriceFromScreening(screeningId) {
    const screening = await fetch("kinoUrlScreenings" + screeningId).then(handleHttpErrors);
    return screening.price;
}

async function showTotalTicketPrice() {
    const totalPrice = document.querySelector("#total-price");
    totalPrice.innerHTML = "";
    const price = await getPriceFromScreening(getScreeningIdFromUrl());

    totalPrice.innerHTML = "Total price: " + price * listOfSelectedSeats.length + " DKK";
}
