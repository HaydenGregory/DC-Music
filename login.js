
// Log in info
var username = document.getElementById("login-username")
var password = document.getElementById("login-password")

// sign up info
var inputUsername = document.getElementById("username")
const inputEmail = document.getElementById("email")

//sign up function
document.addEventListener('click', (event) => {
    if (event.target.id == 'sign-up') {
        event.preventDefault();
        localStorage.setItem("email", inputEmail.value)
        //localStorage.setItem("password",inputPassword.value)
        localStorage.setItem("username", inputUsername.value)
    }
    console.log(localStorage.getItem("username"))
    console.log(localStorage.getItem("email"))
})

//log in function
document.addEventListener('click', (event) => {
    if (event.target.id == 'log-in') {
        event.preventDefault();
        if ( username.value == localStorage.getItem("username") || username.value == localStorage.getItem("email") ){
            window.location = "index.html";
            var name = document.getElementById("profile-name")
            name.innerHTML(username.value)
        }
    }
})






//import json data
//var loginData = JSON.parse(data);
// alert(loginData[0].name);
// alert(loginData[0].age);
// alert(loginData[1].name);
// alert(loginData[1].age);

// var inputPassword = document.getElementById("password")
//var confirmPass = document.getElementById("confirm-password")
//save sign up info
// function writeToFile(form) {
//     let fso = createObject("Scripting.FileSystemObject");
//     let s = fso.createTextFile("users.txt",True);
//     s.writeline("User: " + inputUsername +" "+inputEmail+" "+inputPassword)
//     s.writeline("------------")
//     s.Close();
// }
