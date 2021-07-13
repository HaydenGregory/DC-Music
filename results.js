let clickedArtistJSON = localStorage.getItem('clickedArtist');
let clickedArtist = JSON.parse(clickedArtistJSON);


//! Script for Upcoming Shows

fetch(`https://rest.bandsintown.com/artists/${clickedArtist}/events?app_id=0c3d7989425512a2b6dea2004f6cdd51&date=upcoming`).then(res => {
    return res.json()
}).then(data => {
    console.log(data)
    const featuredArtist = `${data[0].lineup[0]} upcoming shows`
    insertHTML = data.map(currentEvent => {
        return `<div class="upcoming-shows-list"><li class="list-group-item upcoming-show-item"><b>Artist:</b> ${currentEvent.lineup.join(', ')} <br><b>Date:</b> ${currentEvent.datetime}<br><b>Venue:</b> ${currentEvent.venue.name}, ${currentEvent.venue.location}</li><a href="${currentEvent.offers[0].url}"><button type="button" class="btn btn-outline-primary">Tickets ${currentEvent.offers[0].status}</button></a></div>`
    })
    let eventList = document.getElementById('event-list')
    eventList.innerHTML = insertHTML.join('')
    document.getElementById('event-header').innerText = featuredArtist
}).catch(err => {
    console.error(err);
})


//! Script For Artist Photo and Bio

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
        document.getElementById('artist-info').innerHTML = `<p>${data.artists[0].strBiographyEN} </p>`
        if (data) {
            document.getElementById('img-insert').innerHTML = `<p>No artist information available</p>`
        }
        if (data.artists[0].strArtistThumb) {
            document.getElementById('img-insert').innerHTML = `<img src=${data.artists[0].strArtistThumb} width='100%' class='img-responsive'>`
        }
    })
    .catch(err => {
        console.error(err);
    });


//! Script For Top Songs and Albums by Artist

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
        console.log(data)
        const noSongInfo = '<h4>Sorry, no song information</h4>'
        let topSongsHTML = data.track.map(item => {
            return `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto album-title-sub">
            <div class="fw-bold song-title-top">${item.strTrack}</div>
            ${item.strAlbum}
            </div>
            <span class="badge bg-primary rounded-pill">PLAY</span>
            </li>`
        })
        document.getElementById('top-songs').innerHTML = topSongsHTML.join('')
        console.log(topSongsHTML)
    })
    .catch(err => {
        console.error(err);
    });