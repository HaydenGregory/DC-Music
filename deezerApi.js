// document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('input-search')
    const searchForm = document.getElementById('search-form')
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInputHTML = encodeURIComponent(searchBar.value)
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchInputHTML, {
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
                cards.innerHTML = renderMusic(data.data)
            })
            .catch(err => {
                console.error(err);
            });
    
            function renderMusic(musicArray) {
                let songsHtmlArray = musicArray.map((result) => {
                    return `
                    <div class="card-img-top" style="width: 18rem;">
                    <img src="${result.artist.picture_medium}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 id="artist-name"class="card-title">${result.artist.name}</h5>
                        <p id="artist-bio" class="card-text">${result.title}</p>
                        <a id="eventButton" data-name="${result.artist.name}" href="./results.html" class="btn btn-primary">Events</a>
                    </div>
                </div>`
                })
                return songsHtmlArray.join('')
            }
            const cards = document.getElementById('artist-container')
    });

// })
