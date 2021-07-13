// Log in info
var username = document.getElementById("username")
var password = document.getElementById("password")


// sign up info
var inputUsername = document.getElementById("password")
const inputEmail = document.getElementById("email")
var inputPassword = document.getElementById("password")
var confirmPass = document.getElementById("confirm-password")

document.addEventListener('click', (event) => {
    if (event.target.id == 'signup') {
        localStorage.setItem("email", inputEmail.value)
        localStorage.setItem("password",inputPassword.value)
        localStorage.setItem("username", inputUsername.value)
    }
})

document.addEventListener('click', (event) => {
    if (event.target.id == 'login') {
        if ( username == username.value || username == email.value) {
            if (password == password.value) {
                //log in functionality here
            }
        }
    }
})


