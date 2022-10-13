

window.addEventListener("load",checkLoginStatus())


function checkLoginStatus(){
    console.log(localStorage.getItem("username"))




    if(localStorage.getItem("username") == null){
    createMenuNoLogin()}


}

async function createMenuNoLogin(){
    console.log("test")
    
    const ul = document.createElement("ul")
    const div = document.createElement("div")

    const aLogo = document.createElement("a")
    aLogo.setAttribute("href", "/")
    aLogo.setAttribute("data-navigo", true)
    aLogo.id ="logo"
    aLogo.textContent = "Kino xp"
    const liLogo = document.createElement("li")
    liLogo.append(aLogo)

    const aHome = document.createElement("a")
    aHome.setAttribute("href", "/")
    aHome.setAttribute("data-navigo", true)
    aHome.textContent = "Se forestillinger"
    const liHome = document.createElement("li")
    liHome.append(aHome)

    const aLogin = document.createElement("a")
    aLogin.setAttribute("href", "/login")
    aLogin.setAttribute("data-navigo", true)
    aLogin.textContent = "Login"
    const liLogin = document.createElement("li")
    liLogin.append(aLogin)


    const aFindMovie = document.createElement("a")
    aFindMovie.setAttribute("href", "/searchMovies")
    aFindMovie.setAttribute("data-navigo", true)
    aFindMovie.textContent = "Find film"
    const liFindFilm = document.createElement("li")
    liFindFilm.append(aFindMovie)

    const aCreateUser = document.createElement("a")
    aCreateUser.setAttribute("href" , "/createUser")
    aCreateUser.setAttribute("data-navigo", true)
    aCreateUser.textContent = "Opret bruger"
    const liCreatemovie = document.createElement("li")
    liCreatemovie.append(aCreateUser)


    ul.append(liLogo)
    ul.append(liHome)
    ul.append(liFindFilm)
    ul.append(liCreatemovie)
    ul.append(liLogin)
    
    ul.id = "menu"
    ul.className ="menu-horizontal"
    
    div.append(ul)
    document.querySelector("#topnav").append(div)
}
