// КОНСТАНТЫ
const API_KEY = 'd0fbae7e';
// ССЫЛКИ НА ЭЛЕМЕНТЫ
//Ссылка на главную фоновую картинку
const movieImage = document.querySelector('#movieImage');

// Ссылка на элементы с данными о фильмах
const informationPageElements = {
	'Title': document.querySelector('#movieName'),
	'Rated': document.querySelector('#movieRated'),
	'Released': document.querySelector('#movieReleased'),
	'Runtime': document.querySelector('#movieRuntime'),
	'Genre': document.querySelector('#movieGenre'),
	'Director': document.querySelector('#movieDirector'),
	'Actors': document.querySelector('#movieActors'),
	'imdbRating': document.querySelector('#imdbRating'),
}

const movieDescriptionNode = document.querySelector('#movieDescription');

// ФУНКЦИИ
const renderMainImage = (image) => 
	movieImage.src = image;

const renderInformation = (movieInfo) => {
	for (const key in informationPageElements) {
		informationPageElements[key].innerHTML = 
			`<span class='field-label'>${key}:</span> ${movieInfo[key]}`;
	}
}
const renderMovieDescription = (description) => movieDescriptionNode.innerText = description;

const getMovieID = () => {
	// Получаем текущий URL
	const url = new URL(window.location.href);
	// Получаем объект URLSearchParams, содержащий все GET-параметры
	const searchParams = new URLSearchParams(url.search);
	// Получаем все параметры в виде объекта
	const movieID = {};
	for (const [key, value] of searchParams.entries()) {
		movieID[key] = value;
	}
	// console.log(movieID);
	return movieID;
};

const formMovieData = (movie_data) => {
	console.log(movie_data);
	return {
		"Title": movie_data.Title,
		"Year": movie_data.Year,
		"Rated": movie_data.Rated,
		"Released": movie_data.Released,
		"Runtime": movie_data.Runtime,
		"Genre": movie_data.Genre,
		"Director": movie_data.Director,
		"Actors": movie_data.Actors,
		"Poster": movie_data.Poster,
		"imdbRating": movie_data.imdbRating,
		"Plot": movie_data.Plot,
	}
}


const showMovieInformation = (movieID) => {
	fetch(`https://omdbapi.com/?i=${movieID}&apikey=${API_KEY}`)
		.then(response => response.json())
		.then(movie_data => {
			const movie_info = formMovieData(movie_data);
			renderMainImage(movie_info.Poster);
			renderInformation(movie_info);
			renderMovieDescription(movie_info.Plot)
		})
		.catch(error => console.error(error))
}
// 


// Функция отображения информации на странице
const renderMovieInformation = () => {
	movieID = getMovieID();
	console.log(movieID);
	showMovieInformation(movieID.id);
}

// ОТРАБОТЧИКИ
window.addEventListener('load', renderMovieInformation);