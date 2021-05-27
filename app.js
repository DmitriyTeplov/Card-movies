const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52&language=en-US&page=1&include_adult=false';
const API_KEY = 'f4ecb1fb8bfb1422c9eb54f8bf56eb52';
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const MoonPhase_URL = `http://api.farmsense.net/v1/moonphases/?d=`;

const form = document.querySelector('.form_movies');
const input = document.querySelector('.form_movies-input');
const button = document.querySelector('.form_movies-btn');
const main = document.querySelector('.main');

button.onclick = function(event) {
  event.preventDefault();
  const value = input.value;
  main.innerHTML = "";
  const newUrl = API_URL + '&query=' + value;
  getMovies(newUrl)
}
function getMovies(url) {
  fetch(url)
    .then((response => response.json()))
    .then((data) =>{
      showMovies(data)
    })
    .catch((err)=>{
      alert(err + " Something went wrong..!");
    })
}
    
function showMovies(data) {
  data.results.forEach(element => {
      
    const mainCard = document.createElement('div');
    mainCard.classList.add('main-card');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    title.classList.add('main-title');
    const release = document.createElement('p');
    release.classList.add('main-release');
    const timeMoonSec = Date.parse(`${element.release_date}`);
    getMoonPhase(timeMoonSec,mainCard);

    title.innerHTML = `${element.title}`;
    release.innerHTML = 'Release: ' + `${element.release_date}`;
    image.src = IMGPATH + element.poster_path;
    mainCard.appendChild(image);
    mainCard.appendChild(title);
    mainCard.appendChild(release);
    main.appendChild(mainCard); 
  });
} 
function getMoonPhase(timeMoonSec,mainCard) {
  fetch(`http://api.farmsense.net/v1/moonphases/?d=${timeMoonSec}`)
  .then((response => response.json()))
  .then((data) =>{
     showMoonPhase(data,mainCard)
    })
    .catch((err)=>{
      alert(err + " Something went wrong..!");
    })
  }
function showMoonPhase (data,mainCard) {
  data.forEach(element =>{
    
    const moonPhase = document.createElement('p');
    moonPhase.innerHTML = 'Phase Moon: ' + `${element.Phase}`;
    mainCard.appendChild(moonPhase);
  })
}


