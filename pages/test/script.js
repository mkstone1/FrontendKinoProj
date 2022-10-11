import {handleHttpErrors} from "../../utils.js";

window.addEventListener("load", init());

let listOfSelectedSeats = [];

function init() {
    const seats = 20;
    const rows = 12;
    createDisplay(seats, rows);

    getAllTicketsFromScreening(getScreeningIdFromUrl()).then(function(tickets) {
        tickets.forEach(ticket => {
            console.log(ticket);
            console.log(ticket.seatNumber);
            const seat = document.getElementById(ticket.rowNumber + " " + ticket.seatNumber);
            if(seat !== null) {
                console.log("seat is not null");
                seat.classList.add("taken");
            }
        });
    }
    )
}

async function getAllTicketsFromScreening(screeningId){
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


            //create a list of all selected seats and add eventlistener to each box to add or remove seats from the list when clicked on and add a ticket object to the list of selected seats when clicked on and remove it when clicked on again
            box.addEventListener("click", function() {
                if (listOfSelectedSeats.includes(box.id)) {
                    listOfSelectedSeats.splice(listOfSelectedSeats.indexOf(box.id), 1);
                    box.classList.remove("selected");

                } else {
                    if(box.classList.contains("taken")) {
                        alert("Seat is taken");
                    }else {
                        listOfSelectedSeats.push(box.id);
                        box.classList.add("selected");
                    }
                }

                //create a ticket object and add it to the list of selected seats
                const ticket = {
                    row: box.id.split(" ")[0],
                    seat: box.id.split(" ")[1],
                    screeningId: getScreeningIdFromUrl(),
                    }
                if (listOfSelectedSeats.includes(box.id)) {
                    listOfSelectedSeats.push(ticket);
                    console.log(listOfSelectedSeats);

                } else {
                    listOfSelectedSeats.splice(listOfSelectedSeats.indexOf(ticket), 1);
                    console.log(listOfSelectedSeats);
                }
            }
            )
        }


    }

}


