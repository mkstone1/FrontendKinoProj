import {handleHttpErrors, kinoUrlMovies, kinoUrlScreenings, kinoUrlTicketsUsername} from "../../utils.js";


export async function initSeeTickets() {
    await showTickets(getTickets());
}


async function getTickets() {
    const username = getUsernameFromUrl();
    return await fetch(kinoUrlTicketsUsername + username).then(handleHttpErrors);
}

function getUsernameFromUrl(){
    const url = window.location.href;
    const username = url.split('=')[1];
    return username;
}

 function getScreeningFromId(screeningId){
    return  fetch(kinoUrlScreenings + screeningId).then(handleHttpErrors);
}

async function getMovieFromId(movieId){
    return await fetch(kinoUrlMovies + movieId).then(handleHttpErrors);
}

async function showTickets() {
    const tickets = await getTickets();
    const div = document.getElementById("tickets");
    const table = document.getElementById("ticket-table");

    tickets.forEach(ticket => {
        const tr = document.createElement("tr");

        const td2 = document.createElement("td");
        td2.innerHTML = ticket.rowNumber;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.innerHTML = ticket.seatNumber;
        tr.appendChild(td3);

        const screeningId = ticket.screeningId;
        const screening = getScreeningFromId(screeningId);
        screening.then(async (screening) => {
            const screeningDate = new Date(screening.screeningStartTime)
            console.log(screeningDate);


            const td6 = document.createElement("td");
            td6.innerHTML = screeningDate.toLocaleDateString();
            tr.appendChild(td6);


            const td4 = document.createElement("td");
            td4.innerHTML = screeningDate.toLocaleTimeString();
            tr.appendChild(td4);


            const movieId = screening.movieId;
            const movie = await getMovieFromId(movieId);
            const td5 = document.createElement("td");
            td5.innerHTML = movie.name;
            tr.appendChild(td5);



            if(screeningDate > new Date()){
                const td1 = document.createElement("td");
                td1.innerHTML = "<a href= '#/deleteTicket?ticketId=" + ticket.id + "'><div style='height: 100%; width: 100% padding: 0; margin:0;'>Cancel</div></a>";
                tr.appendChild(td1);
            }else {
                const td1 = document.createElement("td");
                td1.innerHTML = "Too late to cancel";
                tr.appendChild(td1);
            }


        })
        table.appendChild(tr);

    });
    div.appendChild(table)
}