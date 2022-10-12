import { handleHttpErrors, kinoUrlScreenings } from "../../utils.js";
let listOfSelectedSeats = [];
let listOfTickets = [];
window.addEventListener("load", init());

document.querySelector("#book-ticket").addEventListener("click", async function () {
    if (listOfSelectedSeats.length !== 0) {
        await postTickets(convertListOfSeatsToTicket());
    }
});

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

function init() {
    const seats = 20;
    const rows = 12;
    createDisplay(seats, rows);

    getAllTicketsFromScreening(getScreeningIdFromUrl()).then(function (tickets) {
        tickets.forEach((ticket) => {
            const seat = document.getElementById(ticket.rowNumber + " " + ticket.seatNumber);
            if (seat !== null) {
                seat.classList.add("taken");
            }
        });
    });
}

async function getAllTicketsFromScreening(screeningId) {
    const tickets = await fetch("http://localhost:8080/api/tickets/" + "screening/" + screeningId).then(handleHttpErrors);
    return tickets;
}

function getScreeningIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const screeningId = splitUrl[1];
    return screeningId;
}

async function createDisplay(seats, rows) {
    const wrapper = document.querySelector("#wrapper");
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

//get price from screenings by screening id and display the total price of the tickets
async function getPriceFromScreening(screeningId) {
    const screening = await fetch("http://localhost:8080/api/screenings/" + screeningId).then(handleHttpErrors);
    return screening.price;
}

async function showTotalTicketPrice() {
    const totalPrice = document.querySelector("#total-price");
    const price = await getPriceFromScreening(getScreeningIdFromUrl());

    totalPrice.innerHTML = "Total price: " + price * listOfSelectedSeats.length + " DKK";
}
