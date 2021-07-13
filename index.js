//! Apple Api (not functional yet)

// fetch("https://api.music.apple.com/v1/catalog/us/charts?types=songs,albums,playlists&genre=20&limit=1", {
//     headers: {

//         'Content-Type': 'application/json'
//     }
// })
//         .then(response => {
//             return response.json();
//         }).then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.error(err);
//         });

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
        let carouselInner = document.getElementById('carousel-inner')
        let active = "active"
        let index = 1
        const HTMLInsert = data.trending.map(info => {
            const HTMLReturn = (`<div class="carousel-item ${active}">
                <img src="${info.strTrackThumb}"
                class="d-block w-100 h-50" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h5>#${info.intChartPlace}: ${info.strTrack}</h5>
                <p>${info.strArtist}</p>
                </div>
                </div>`)
            active = ""
            index += 1
            return HTMLReturn
        })
        carouselInner.innerHTML = HTMLInsert.join('')
    })
    .catch(err => {
        console.error(err);
    });



//! Bands In Town API 

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

document.getElementById('profile-pic').addEventListener('click', () => {
    document.querySelector('.menu').setAttribute('style', 'visibility: visible')
    
})
