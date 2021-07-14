//! The Audio DB API 
fetch("https://theaudiodb.p.rapidapi.com/trending.php?country=us&type=itunes&format=singles", {
    "method": "GET",
    "headers": {
		"x-rapidapi-key": "768ec53e87msh5c7325f02e043cbp19ea52jsnba76d5ab383a",
		"x-rapidapi-host": "theaudiodb.p.rapidapi.com"
    }
})
    .then(response => {
        return response.json();
    }).then(data => {
        let top5 = data.trending.splice(1,5)
        console.log(top5)
        let carouselInner = document.getElementById('carousel-inner')
        let active = "active"
        const HTMLInsert = top5.map(info => {
            const HTMLReturn = (`<div class="carousel-item ${active}">
                <img src="${info.strTrackThumb}"
                class="d-block w-100 h-50" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h5>#${info.intChartPlace}: ${info.strTrack}</h5>
                <p>${info.strArtist}</p>
                </div>
                </div>`)
            active = ""
            return HTMLReturn
        })
        carouselInner.innerHTML = HTMLInsert.join('')
    })
    .catch(err => {
        console.error(err);
    });


//! Event listener to store clicked artist into local storage
document.addEventListener('click', (event) => {
    if (event.target.id == 'eventButton') {
        let clickedArtistJSON = localStorage.getItem('clickedArtist');
        let clickedArtist = JSON.parse(clickedArtistJSON);
        if (clickedArtist == null) {
            clickedArtist = []
        }
        clickedArtist.splice(0, 1, event.target.dataset.name)
        clickedArtistJSON = JSON.stringify(clickedArtist)
        localStorage.setItem('clickedArtist', clickedArtistJSON)
    }
})

//! Event listener to store artist ID in local storage
document.addEventListener('click', (event) => {
    if (event.target.id == 'eventButton') {
        let artistIdJSON = localStorage.getItem('artistId');
        let artistId = JSON.parse(artistIdJSON);
        if (artistId == null) {
            artistId = []
        }
        artistId.splice(0, 1, event.target.dataset.id)
        artistIdJSON = JSON.stringify(artistId)
        localStorage.setItem('artistId', artistIdJSON)
    }
})

//! Profile pic drop down on click
document.getElementById('profile-pic').addEventListener('click', () => {
    document.querySelector('.menu').setAttribute('style', 'visibility: visible')
})

//login functions
var username = localStorage.getItem("username")
var loggedin = localStorage.getItem("loggedin")
if (loggedin === "true") { 
    let loginId = document.getElementById("profile-name")
    loginId.innerHTML="Hi, "+username
    let loggin = document.getElementById("loggin")
    const profile = document.getElementById("profile")
    const profileLinks = document.getElementById("profile-links")
    profile.style.display = "block"
    profileLinks.style.display = "block"
    loggin.style.display = "none"

    document.addEventListener('click', (event) => {
        if (event.target.id == 'logout') {
            localStorage.setItem("loggedin", "false")
            profile.style.display = "none"
            profileLinks.style.display = "none"
            loggin.style.display = "block"
        }
        console.log(localStorage.getItem("username"))
    })
}


