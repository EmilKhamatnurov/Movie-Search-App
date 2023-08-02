// ССЫЛКИ НА ЭЛЕМЕНТЫ
//Ссылка на главную фоновую картинку
const movieMainImage = document.querySelector('#mainImageWrapper');

// Ссылка на элементы с данными о фильмах
const informationPageElements = {
	'Title': document.querySelector('#movieName'),
	'Rated': document.querySelector('#movieRated'),
	'Released': document.querySelector('#movieReleased'),
	'Runtime': document.querySelector('#movieRuntime'),
	'Genre': document.querySelector('#movieGenre'),
	'Director': document.querySelector('#movieDirector'),
	'Actors': document.querySelector('#movieActors'),
	'imdbRating': document.querySelector('#movieName'),
}

// ФУНКЦИИ
const renderMainImage = (image) => 
	movieMainImage.style.background = `url(${image}) center center / contain no-repeat`;

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
}


// ОТРАБОТЧИКИ
window.addEventListener('load', renderMovieInformation);