let clickedArtistJSON = localStorage.getItem('clickedArtist');
let clickedArtist = JSON.parse(clickedArtistJSON);

fetch(`https://rest.bandsintown.com/artists/${clickedArtist}/events?app_id=0c3d7989425512a2b6dea2004f6cdd51&date=upcoming`).then(res => {
    return res.json()
}).then(data => {
    insertHTML = data.map(currentEvent => {
        return `<li class="list-group-item"><b>Artist:</b> ${currentEvent.lineup.join(', ')} <br><b>Date:</b> ${currentEvent.datetime}<br><b>Venue:</b> ${currentEvent.venue.name}, ${currentEvent.venue.location}</li>`
    })
    let eventList = document.getElementById('event-list')
    eventList.innerHTML = insertHTML.join('')
}).catch(err => {
    console.error(err);
})