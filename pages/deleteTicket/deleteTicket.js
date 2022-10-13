import {handleHttpErrors} from "../../utils.js";
import {kinoUrlTickets} from "../../utils.js";



export function initDeleteTicket(){
    window.addEventListener("load", deleteTicket())
}


function getTicketIdFromUrl() {
    const url = window.location.href;
    const ticketId = url.split("=")[1];
    return ticketId;
}

async function deleteTicket(){
    const ticketId = getTicketIdFromUrl();
    const options = {}
    options.method = "DELETE"
    options.headers = {"Content-type": "application/json"}
    await fetch(kinoUrlTickets + ticketId, options).then(handleHttpErrors)
    //update to user page. 
    window.location.href = "/#/seeTickets";
}