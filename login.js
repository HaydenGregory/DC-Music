// Log in info
var username = document.getElementById("login-username")
//var password = document.getElementById("login-password")

// sign up info
var inputUsername = document.getElementById("username")
const inputEmail = document.getElementById("email")

//sign up function
document.addEventListener('click', (event) => {
    if (event.target.id == 'sign-up') {
        event.preventDefault();
        localStorage.setItem("username", inputUsername.value)
        localStorage.setItem("loggedin", "true")
        window.location = "./index.html";
    }
})

//log in function
document.addEventListener('click', (event) => {
    if (event.target.id == 'log-in') {
        event.preventDefault();
        if ( username.value == localStorage.getItem("username") || username.value == localStorage.getItem("email") ){
            localStorage.setItem("loggedin", "true")
            window.location = "./index.html";
        }
    }
})

