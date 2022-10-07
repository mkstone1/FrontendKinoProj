import "https://unpkg.com/navigo";
import { handleHttpErrors, kinoUrlScreenings, kinoUrlMovies, kinoUrlScreeningsToday } from "./utils.js";
import { adjustForMissingHash, renderTemplate, loadHtml } from "./utils.js";

import { initScreenings } from "./pages/screenings/screenings.js";
import { initScreening } from "./pages/screening/screening.js";
import { initBookScreening } from "./pages/bookScreening/bookScreening.js";

window.addEventListener("load", init());

async function init() {
    const templateScreenings = await loadHtml("./pages/screenings/screenings.html");
    const templateScreening = await loadHtml("./pages/screening/screening.html");
    const templateBookScreening = await loadHtml("./pages/bookScreening/bookScreening.html")
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
            "/screening": () => {
                renderTemplate(templateScreening, "content");
                initScreening();
            },
            "/bookScreening": () => {
                renderTemplate(templateBookScreening, "content")
                initBookScreening();

            }
        })
        .resolve();
}
