const API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52&language=en-US&page=1&include_adult=false";
const API_KEY = "f4ecb1fb8bfb1422c9eb54f8bf56eb52";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const MoonPhase_URL = `http://api.farmsense.net/v1/moonphases/?d=`;

const form = document.querySelector(".form_movies");
const input = document.querySelector(".form_movies-input");
const button = document.querySelector(".form_movies-btn");
const main = document.querySelector(".main");

button.onclick = function (event) {
  event.preventDefault();
  const value = input.value;
  main.innerHTML = "";
  const newUrl = API_URL + "&query=" + value;
  getMovies(newUrl);
};
async function getMovies(url) {
  const moviesResponse = await fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      alert(err + " Something went wrong..!");
    });

  const movies = moviesResponse.results;

  const moonPhasesRequests = movies.map((film) => {
    const timeMoonSec = Date.parse(`${film.release_date}`);
    return fetch(`http://api.farmsense.net/v1/moonphases/?d=${timeMoonSec}`)
      .then((response) => response.json())
      .catch((err) => {
        alert(err + " Something went wrong..!");
      });
  });

  Promise.all(moonPhasesRequests).then((moonResponse) => {
    const data = [];

    for (let i = 0; i < moonResponse.length; i++) {
      const newMovieObj = { ...movies[i], phase: moonResponse[i][0].Phase };
      data.push(newMovieObj);
    };

    showMovies(data);
  });
}
function showMovies(res) {
  res.forEach((element) => {
    const mainCard = document.createElement("div");
    mainCard.classList.add("main-card");
    const image = document.createElement("img");
    image.classList.add("main-image");
    const title = document.createElement("h2");
    title.classList.add("main-title");
    const release = document.createElement("p");
    release.classList.add("main-release");
    const moonPhase = document.createElement("p");
    moonPhase.classList.add("main-moon_phase");
    
    title.innerHTML = `${element.title}`;
    release.innerHTML = "Release: " + `${element.release_date}`;
    moonPhase.innerHTML = "Phase Moon: " + `${element.phase}`;
    image.src = IMGPATH + element.poster_path;
    
    mainCard.appendChild(image);
    mainCard.appendChild(title);
    mainCard.appendChild(release);
    mainCard.appendChild(moonPhase);
    main.appendChild(mainCard);
  });
};


