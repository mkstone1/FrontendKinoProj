import "https://unpkg.com/navigo";
import {handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "./utils.js";
import { adjustForMissingHash, renderTemplate, loadHtml} from "./utils.js";

import { initScreenings } from "./pages/screenings/screenings.js";
import { initScreening } from "./pages/screening/screening.js";
import { initBookScreening } from "./pages/bookScreening/bookScreening.js";
import { initEditScreening } from "./pages/editScreening/editScreening.js";
import { initCreateScreening } from "./pages/createScreening/createScreening.js";
import { initSearchMovies } from "./pages/searchMovies/searchMovies.js";
import { initMovie} from "./pages/movie/movie.js";
import { initCreateMovie} from "./pages/createMovie/createMovie.js";
import {initDeleteTicket} from "./pages/deleteTicket/deleteTicket.js";
import {initSeeTickets} from "./pages/seeTickets/seeTickets.js";
import { initCreateUser} from "./pages/createUser/createUser.js";
import { initLogin} from "./pages/login/login.js"
import { initLogout} from "./pages/logout/logout.js"

window.addEventListener("load", init());

async function init() {
    const templateScreenings = await loadHtml("./pages/screenings/screenings.html");
    const templateScreening = await loadHtml("./pages/screening/screening.html");
    const templateEditScreening = await loadHtml("./pages/editScreening/editScreening.html");
    const templateCreateScreening = await loadHtml("./pages/createScreening/createScreening.html");
    const templateBookScreening = await loadHtml("./pages/bookScreening/bookScreening.html");
    const templateSearchMovies = await loadHtml("./pages/searchMovies/searchMovies.html");
    const templateDeleteTicket = await loadHtml("./pages/deleteTicket/deleteTicket.html");
    const templateSeeTickets = await loadHtml("./pages/seeTickets/seeTickets.html");
    const templateMovie = await loadHtml("./pages/movie/movie.html")
    const templateCreateMovie = await loadHtml("./pages/createMovie/createMovie.html")
    const templateCreateUser = await loadHtml("./pages/createUser/createUser.html")
    const templateLogin = await loadHtml("./pages/login/login.html")
    adjustForMissingHash();
    const router = new Navigo("/", { hash: true });
    window.router = router;

    await router
        .on({
            //For very simple "templates", you can just insert your HTML directly like below
            "/": () => {
                renderTemplate(templateScreenings, "content");
                initScreenings();
            },
            "/editScreening": () => {
                renderTemplate(templateEditScreening, "content");
                initEditScreening();
            },
            "/createScreening": () => {
                renderTemplate(templateCreateScreening, "content");
                initCreateScreening();
            },
            "/searchMovies": () => {
                renderTemplate(templateSearchMovies, "content");
                initSearchMovies();
            },
            "/screening": () => {
                renderTemplate(templateScreening, "content");
                initScreening();
            },
            "/movies": () => {
                renderTemplate(templateMovie, "content");
                initMovie();
            },
            "/bookScreening": () => {
                renderTemplate(templateBookScreening, "content");
                initBookScreening();
            },
            "/createMovie": () => {
                renderTemplate(templateCreateMovie, "content");
                initCreateMovie();
            },
            "/login": () => {
                renderTemplate(templateLogin, "content");
                initLogin();
            },
            "/createUser": () => {
                renderTemplate(templateCreateUser, "content");
                initCreateUser();
            },
            "/seeTickets": () => {
                renderTemplate(templateSeeTickets, "content");
                initSeeTickets();
            },
            "/deleteTicket": () => {
                renderTemplate(templateDeleteTicket, "content");
                initDeleteTicket();
            },
            "/logout": () => {
                initLogout();
            },
        })
        .resolve();
}


