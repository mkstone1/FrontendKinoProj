export const kinoUrlScreenings = "http://localhost:8080/api/screenings/";
export const kinoUrlTheaters = "http://localhost:8080/api/theaters/";
export const kinoUrlMovies = "http://localhost:8080/api/movies/";
export const kinoUrlScreeningsToday = "http://localhost:8080/api/screenings/today/";
export const kinoUrlTickets = "http://localhost:8080/api/tickets/";
export const kinoUrlTicketsUsername = "http://localhost:8080/api/tickets/username/"
export const kinoUrlLogin ="http://localhost:8080/api/users/login/";
export const kinoUrlUsers = "http://localhost:8080/api/users/";

export async function handleHttpErrors(res) {

    return res.json();
}

export function renderTemplate(template, contentId) {
    const content = document.getElementById(contentId);
    if (!content) {
        throw Error("No Element found for provided content id");
    }
    content.innerHTML = "";
    content.append(template);
}

export async function loadHtml(page) {
    const resHtml = await fetch(page).then((r) => {
        if (!r.ok) {
            throw new Error(`Failed to load the page: '${page}' `);
        }
        return r.text();
    });
    const parser = new DOMParser();
    const content = parser.parseFromString(resHtml, "text/html");
    const div = content.querySelector(".template");
    if (!div) {
        throw new Error(`No outer div with class 'template' found in file '${page}'`);
    }
    return div;
}

/**
 * Only meant for when Navigo is set to use Hash based routing (Always this semester)
 * If users try to enter your site with only "/", it will change this to "/#/" as required
 * for Hash based routing
 * Call it before you start using the router (add the specific routes)
 */
export function adjustForMissingHash() {
    let path = window.location.hash;
    if (path == "") {
        //Do this only for hash
        path = "#/";
        window.history.pushState({}, path, window.location.href + path);
    }
}

export function encode(str) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
  }


 export function setErrorMessage(response, successMessage){
    const updateStatus = document.querySelector("#update-status")
    updateStatus.style.display ="flex"
    updateStatus.style.justifyContent = "center"
    const errorMessage = response.message
    if(response == true){
        document.querySelector("#update-status").innerHTML = encode(successMessage)
        return true        
    }
    else{
        document.querySelector("#update-status").innerHTML = encode(errorMessage)
    }
    
}

export function setActiveLink(topnav, activeUrl) {
    const links = document.getElementById(topnav).querySelectorAll("a");
    links.forEach(child => {
      child.classList.remove("active")
      //remove leading '/' if any
      if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
        child.classList.add("active")
      }
    })
  }