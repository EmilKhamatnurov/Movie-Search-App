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

// ФУНКЦИИ
const renderMainImage = (image) => 
	movieImage.src = image;

const renderInformation = (Params) => {
	for (const key in informationPageElements) {
		informationPageElements[key].innerText = key + ": "+ Params[key];
	}
}
const takeGETParams = () => {
	// Получаем текущий URL
	const url = new URL(window.location.href);
	// Получаем объект URLSearchParams, содержащий все GET-параметры
	const searchParams = new URLSearchParams(url.search);
	// Получаем все параметры в виде объекта
	const paramsObject = {};
	for (const [key, value] of searchParams.entries()) {
	paramsObject[key] = value;
	}
	console.log(paramsObject);
	return paramsObject;
};

// Функция отображения информации на странице
const renderMovieInformation = () => {
	GETParams = takeGETParams();
	renderMainImage(GETParams.Poster);
	console.log(GETParams);
	renderInformation(GETParams);
}

// ОТРАБОТЧИКИ
window.addEventListener('load', renderMovieInformation);