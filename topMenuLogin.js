

window.addEventListener("load",checkLoginStatus())


function checkLoginStatus(){


    const homeLink = {
        aLink: "/",
        aText: "Se forestillinger"
    }

    const createScreening = {
        aLink: "/createScreening",
        aText: "Opret forestilling"
    }

    const editScreening = {
        aLink: "/editScreening",
        aText: "Ret forestilling"
    }

    const searchMovies = {
        aLink: "/searchMovies",
        aText: "Find film"
    }

    const createMovie = {
        aLink: "/createMovie",
        aText: "Opret film"
    }

    const createUser = {
        aLink: "/createUser",
        aText: "Opret bruger"
    }

    
    const loginLink = {
        aLink: "/login",
        aText: "Login"
    }


    const seeTickets = {
        aLink: "/seeTickets",
        aText: "Se profil"
    }


    const logout = {
        aLink: "/logout",
        aText: "Log ud"
    }



    

 
    const noLogin = []
    const loggedInUser = []
    const adminLogin = []

    loggedInUser.push(homeLink)
    loggedInUser.push(searchMovies)
    loggedInUser.push(logout)

    noLogin.push(homeLink)
    noLogin.push(searchMovies)
    noLogin.push(createUser)
    noLogin.push(loginLink)


    adminLogin.push(homeLink)
    adminLogin.push(createScreening)
    adminLogin.push(editScreening)
    adminLogin.push(searchMovies)
    adminLogin.push(createMovie)
    adminLogin.push(createUser)
    adminLogin.push(seeTickets)
    adminLogin.push(logout)


    
    console.log(localStorage.getItem("role"))
    if(localStorage.getItem("role") == "USER"){
        createTopMenu(loggedInUser)
    }
    else if(localStorage.getItem("role") == "ADMIN" ){
        createTopMenu(adminLogin)
    }
    else{
        createTopMenu(noLogin)
    }





}



function createTopMenu(linksToCreate){
    const div = document.createElement("div")
    const ul = document.createElement("ul")
    ul.id = "menu"
    ul.className ="menu-horizontal"
   

    const aLogo = document.createElement("a")
    aLogo.setAttribute("href", "/")
    aLogo.setAttribute("data-navigo", true)
    aLogo.id ="logo"
    aLogo.textContent = "Kino xp"
    const liLogo = document.createElement("li")
    liLogo.append(aLogo)

    ul.append(liLogo)
    for(let i = 0 ; i < Object.keys(linksToCreate).length ; i ++){
        const a = document.createElement("a");
        const li = document.createElement("li");
    
        console.log("test")
        a.textContent = linksToCreate[i].aText;
        a.setAttribute("href", linksToCreate[i].aLink);
        a.setAttribute("data-navigo", true)
        li.appendChild(a);
        ul.appendChild(li);

        
    }
    div.append(ul)
    document.querySelector("#topnav").append(div)

}

