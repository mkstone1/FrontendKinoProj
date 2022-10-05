const URL = "http://localhost:8080/api/movies/"

window.addEventListener("load", init())

console.log("lol");
function init(){
    getAllMovies();
}

async function getAllMovies() {
    try {
        const movies = await fetch(URL)
            .then(res => res.json());
        showMovies(movies);
    } catch (err) {
        console.log(err);
    }

}

function showMovies(movies){
    console.log(movies)
    const wrapper = document.getElementById("movie-wrapper");
    let nodes = movies.map((movie) => {
        const div = document.createElement("div")
        div.classList.add("movie-object");

        const name = document.createElement("h2");
        name.classList.add("movie-name")
        name.innerText = movie.name;


        const playtime = "Spilletid: ";
        const movieTime = document.createElement("p")
        movieTime.classList.add("movieTime");
        movieTime.innerText = playtime + movie.runTime;

        div.appendChild(name);
        div.appendChild(movieTime);
        wrapper.appendChild(div);
    })
    console.log(nodes)
}

