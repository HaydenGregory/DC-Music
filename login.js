//import json data
var loginData = JSON.parse(data);
// alert(loginData[0].name);
// alert(loginData[0].age);
// alert(loginData[1].name);
// alert(loginData[1].age);

// Log in info
var username = document.getElementById("username")
var password = document.getElementById("password")


// sign up info
var inputUsername = document.getElementById("password")
const inputEmail = document.getElementById("email")
var inputPassword = document.getElementById("password")
var confirmPass = document.getElementById("confirm-password")

//sign up function
document.addEventListener('click', (event) => {
    if (event.target.id == 'sign-up') {
        localStorage.setItem("email", inputEmail.value)
        localStorage.setItem("password",inputPassword.value)
        localStorage.setItem("username", inputUsername.value)
    }
})

//log in function
document.addEventListener('click', (event) => {
    if (event.target.id == 'log-in') {
        if ( username == username.value || username == email.value) {
            if (password == password.value) {
                //log in functionality here
            }
        }
    }
})


