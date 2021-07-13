// document.addEventListener('DOMContentLoaded', function () {
const searchBar = document.getElementById('input-search')
const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInputHTML = encodeURIComponent(searchBar.value)
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=" + searchInputHTML, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "30caeee35amsh028fb26bb6a6d1fp10bee7jsne480b16660b8",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
        .then(response => {
            // console.log(response);
            return response.json()
        })
        .then((data) => {
            // console.log(data.data)
            cards.innerHTML = renderMusic(data.data)
        })
        .catch(err => {
            console.error(err);
        });

    function renderMusic(musicArray) {
        let songsHtmlArray = musicArray.map((result) => {
            return `
                    <div class="card-img-top" style="width: 18rem;">
                    <img src="${result.picture_medium}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 id="artist-name"class="card-title">${result.name}</h5>
                        <p id="artist-bio" class="card-text">${result.type}</p>
                        <a id="eventButton" data-id="${result.id}" data-name="${result.name}" href="./results.html" class="btn btn-primary eventButton">Artist Page</a>
                    </div>
                </div>`
        })

        console.log(songsHtmlArray.join(''))
        return songsHtmlArray.join('')
    }
    const cards = document.getElementById('artist-container')
});

// render albums

// deezer api

// can't get play buttons to play individual song. only plays first song that pops up on every button.