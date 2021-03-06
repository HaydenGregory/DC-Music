//! Creating Local Storage 
// Storing the artist name after click
let clickedArtistJSON = localStorage.getItem('clickedArtist');
let clickedArtist = JSON.parse(clickedArtistJSON);

// Storing the artist ID after click 
let artistIdJSON = localStorage.getItem('artistId');
let artistId = JSON.parse(artistIdJSON);

// Storing the clicked song YouTube url
let clickedSongJSON = localStorage.getItem('clickedSong');
let clickedSong = JSON.parse(clickedSongJSON);


//! Script for Upcoming Shows To Display on Results HTML
fetch(`https://rest.bandsintown.com/artists/${clickedArtist}/events?app_id=0c3d7989425512a2b6dea2004f6cdd51&date=upcoming`).then(res => {
    return res.json()
}).then(data => {
    const featuredArtist = `${data[0].lineup[0]} upcoming shows`
    insertHTML = data.map(currentEvent => {
        let date = currentEvent.datetime.slice(0,10)
        return `<div class="upcoming-shows-list"><li class="list-group-item upcoming-show-item"><b>Artist:</b> ${currentEvent.lineup.join(', ')} <br><b>Date:</b> ${date}<br><b>Venue:</b> ${currentEvent.venue.name}, ${currentEvent.venue.location}</li><a href="${currentEvent.offers[0].url}"><button type="button" class="btn btn-outline-primary">Tickets ${currentEvent.offers[0].status}</button></a></div>`
    })
    let eventList = document.getElementById('event-list')
    eventList.innerHTML = insertHTML.join('')
    document.getElementById('event-header').innerText = featuredArtist
}).catch(err => {
    console.error(err);
})

//! Script For Artist Photo and Bio To Display on Results HTML

fetch(`https://theaudiodb.p.rapidapi.com/search.php?s=${clickedArtist}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "768ec53e87msh5c7325f02e043cbp19ea52jsnba76d5ab383a",
        "x-rapidapi-host": "theaudiodb.p.rapidapi.com"
    }
})
    .then(response => {
        return response.json();
    }).then(data => {
        document.getElementById('artist-info').innerHTML = "<p style='text-align: center'><b>No artist information available.</b></p>"
        document.getElementById('img-insert').innerHTML = `<img id="artimage" src="./noimage.png" width='300px' height="300px" class='img-responsive border border-3 border-success'>`
        document.getElementById('artist-info').innerHTML = `<p>${data.artists[0].strBiographyEN} </p>`
        if (data.artists[0].strArtistThumb) {
            document.getElementById('img-insert').innerHTML = `<img id="artimage" src=${data.artists[0].strArtistThumb} width='100%' class='img-responsive border border-3 border-success'>`
        }
    })
    .catch(err => {
        console.error(err);
    });

//! Script For Top Songs and YouTube Videos by Artist To Display on Results HTML

fetch(`https://theaudiodb.p.rapidapi.com/track-top10.php?s=${clickedArtist}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "768ec53e87msh5c7325f02e043cbp19ea52jsnba76d5ab383a",
        "x-rapidapi-host": "theaudiodb.p.rapidapi.com"
    }
})
    .then(res => {
        return res.json();
    }).then(data => {
        document.getElementById('top-songs').innerHTML = '<p style="text-align: center; padding-top: 12px"><b>No Popular Song Data</b></p>'
        let topSongsHTML = data.track.map(item => {
            if (item.strMusicVid) {
                const youtubeREGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i; // Regular expression to grab the ID at the end of YouTube links
                const youtubeId = item.strMusicVid.match(youtubeREGEX)
                const embedUrl = 'https://www.youtube.com/embed/' + youtubeId[1] // Creating the correct youtube embed url for the page and then returning the html for top songs below
                return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto album-title-sub">
                <div class="fw-bold song-title-top">${item.strTrack}</div>
                ${item.strAlbum}
                </div>
                <button data-name="${embedUrl}" type="submit" class="play-button btn btn-outline-success rounded-pill">WATCH</button>
                </li>`
            }
            else {
                return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto album-title-sub">
                <div class="fw-bold song-title-top">${item.strTrack}</div>
                ${item.strAlbum}
                </div>
                <button type="submit" class="play-button btn btn-danger rounded-pill disabled">Unavailable</button>
                </li>`
            }
        })
        document.getElementById('top-songs').innerHTML = topSongsHTML.join('')
    })
    .catch(err => {
        console.error(err);
    });


//! Render Albums

fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/albums`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "30caeee35amsh028fb26bb6a6d1fp10bee7jsne480b16660b8",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
})
    .then(response => {
        return response.json()
    })
    .then(data => {
        return Promise.all(data.data.map((album) => {
            return fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${album.id}/tracks`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "30caeee35amsh028fb26bb6a6d1fp10bee7jsne480b16660b8",
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
                }
            })
                .then(res => res.json())
                .then(trackData => {
                    return {
                        ...album,
                        tracks: trackData.data
                    }
                })
        }))
    })
    .then(data => {
        cordion.innerHTML = renderAlbums(data)
    })
    .catch(err => {
        console.error(err);
    })
function renderSongs(songsArray) {
    let songsHtmlArray = songsArray.map((song) => {
        // let minutes = song.duration / 60
        let minutes = Math.floor(song.duration / 60)
        let remainder = song.duration % 60
        if (remainder < 10) {
            remainder = ('0' + remainder)
        }
        return `<li class="list-group-item d-flex flex-wrap align-items-start">&nbsp${song.title}&nbsp<p id="grayColor">${minutes}:${remainder}</p><div class="d-flex flex-row-reverse ms-auto"><audio style="max-width: 100%" src="${song.preview}" controls preload="none"></audio></div></li>`
    })
    return songsHtmlArray.join('')
}

function renderAlbums(albumArray) {
    let albumsHtmlArray = albumArray.map((album) => {
        return `<div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button style="height: 110px;" class="accordion-button collapsed fw-bold song-title-top" type="button" data-bs-toggle="collapse"
                data-bs-target="#accordion-${album.id}" aria-expanded="false" aria-controls="accordion-${album.id}">
                <img class="h-100"src="${album.cover_medium}">&nbsp
                ${album.title}<p class="mt-auto mb-auto" id="grayColor">&nbsp&nbsp${album.record_type}&nbsp${album.release_date.substring(0,4)}</p>
            </button>
        </h2>
        <div id="accordion-${album.id}" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <ol class="list-group list-group-numbered ">
                ${renderSongs(album.tracks)}
                </ol>
            </div>
        </div>
    </div>`
    })
    return albumsHtmlArray.join('')
}
const cordion = document.getElementById('accordionExample')

//! Storing Clicked Song YouTube Link In Local Storage To Use For IFrame

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('play-button')) {
        if (clickedSong == null) {
            clickedSong = []
        }
        clickedSong.splice(0, 1, event.target.dataset.name)
        document.getElementById('youtube-vid').setAttribute('src', clickedSong)
        clickedSongJSON = JSON.stringify(clickedSong)
        localStorage.setItem('clickedSong', clickedSongJSON)
    }
})

//! Profile pic drop down on click
document.getElementById('profile-pic').addEventListener('click', () => {
    document.querySelector('.menu').setAttribute('style', 'visibility: visible')
    
    if (document.querySelector('.menu').classList.contains('visible')) {
        document.querySelector('.menu').setAttribute('style', 'visibility: hidden')    
    }
    document.querySelector('.menu').classList.toggle('visible')
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
    }
)}