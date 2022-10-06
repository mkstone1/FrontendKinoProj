import "https://unpkg.com/navigo";
import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "./utils.js";
import { adjustForMissingHash, renderTemplate, loadHtml } from "./utils.js";

import { initScreenings } from "./pages/screenings/screenings.js";

window.addEventListener("load", init());

async function init() {
    const templateScreenings = await loadHtml("./pages/screenings/screenings.html");

    const router = new Navigo("/", { hash: true });
    window.router = router;

    router
        .on({
            //For very simple "templates", you can just insert your HTML directly like below
            "/": () => {
                renderTemplate(templateScreenings, "content");
                initScreenings();
            },
        })
        .notFound(() => {
            renderTemplate(templateNotFound, "content");
        })
        .resolve();
}
