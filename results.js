let clickedArtistJSON = localStorage.getItem('clickedArtist');
let clickedArtist = JSON.parse(clickedArtistJSON);

fetch(`https://rest.bandsintown.com/artists/${clickedArtist}/events?app_id=0c3d7989425512a2b6dea2004f6cdd51&date=upcoming`).then(res => {
    return res.json()
}).then(data => {
    const featuredArtist = `${data[0].lineup[0]} upcoming shows`
    insertHTML = data.map(currentEvent => {
        return `<li class="list-group-item"><b>Artist:</b> ${currentEvent.lineup.join(', ')} <br><b>Date:</b> ${currentEvent.datetime}<br><b>Venue:</b> ${currentEvent.venue.name}, ${currentEvent.venue.location}</li>`
    })
    let eventList = document.getElementById('event-list')
    eventList.innerHTML = insertHTML.join('')
    document.getElementById('event-header').innerText = featuredArtist
}).catch(err => {
    console.error(err);
})


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
        console.log(data)
        document.getElementById('artist-info').innerHTML = `<p>${data.artists[0].strBiographyEN} </p>`
        
        if (data) {
            document.getElementById('img-insert').innerHTML = `<p>No artist information available</p>`
        }
        if (data.artists[0].strArtistThumb) {
            document.getElementById('img-insert').innerHTML = `<img src=${data.artists[0].strArtistThumb} width='100%' class='img-responsive'>`
        }})
    .catch(err => {
        console.error(err);
    });
