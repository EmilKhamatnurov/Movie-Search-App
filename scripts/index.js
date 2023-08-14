// _____ КОНСТАНТЫ
const API_KEY = 'd0fbae7e';
// _____ ССЫЛКИ
// Ссылка на элемент поля ввода фильмов
const movieInputFieldNode = document.querySelector('#movieInputField');
// Ссылка на кнопку поиска фильмов. "Search"
const movieSearchButtonNode = document.querySelector('#movieSearchButton');
// Ссылки на кнопки "next" и "previous"
const previousButtonNode = document.querySelector('#previousButton');
const nextButtonNode = document.querySelector('#nextButton');
// Ссылка на объект, в который выводится список фильмов 
const pageQuantityNode = document.querySelector('#pageQuantity');
const pageMinusNode = document.querySelector('#pageMinus');
const pagePlusNode = document.querySelector('#pagePlus');
const pageNumberFromStorage = localStorage.getItem('pageNumberStorage', '1');
// Ссылка на элемент вывода списка фильмов
const movieListOutputNode = document.querySelector('#movieListOutput');
// Ссылка на заголовок в Local Storage, по которому искали фильмы
const movieTitleFromStorage = localStorage.getItem('movieTitleStorage');

const errorOutputNode = document.querySelector('#errorOutput');
const pageInformationNode = document.querySelector('#pageInformation');

// _____ FUNCTIONS _____
const init = () => {
	if(movieTitleFromStorage) {
		movieInputFieldNode.value = localStorage.getItem('movieTitleStorage');
		pageQuantityNode.value = localStorage.getItem('pageNumberStorage');
		searchMovieByTitle();
		return;
	};
	pageQuantityNode.value = '1';
	movieListOutputNode.innerText = "The list is currently empty";
}

const checkInput = () => (!movieInputFieldNode.value.trim()) ? false : true;

const changeLocation = (movieID) => window.location.href = `movieInfo.html?id=${movieID}`;

const clearMovieInput = () => movieInputFieldNode.value = '';

const switchFocusToMovieInput = () => movieInputFieldNode.focus();

const pageCounter = (totalResults) => Math.ceil(totalResults/10);

const resetCounter = () => pageQuantityNode.value = 1;

const savePageNumberToStorage = () => localStorage.setItem('pageNumberStorage',`${pageNumber}`);

const plusQuantityInput = () => {
	if (!movieInputFieldNode.value.trim()) {
		return
	}
	pageQuantityNode.value = parseInt(pageQuantityNode.value) + 1; 
	changeMoviePage();
	window.scrollTo(0, 0)
}

const minusQuantityInput = () => {
	if (!movieInputFieldNode.value.trim()) {
		return
	}
	if (pageQuantityNode.value > 0) {
	 pageQuantityNode.value = parseInt(pageQuantityNode.value) - 1;
	 changeMoviePage(); 
	 window.scrollTo(0, 0)
	}	
}

const renderError = (message_error) => {
	errorOutputNode.innerText =  `${message_error}`;
	errorOutputNode.classList.toggle('visible');
	clearMovieInput();
	switchFocusToMovieInput();
} 

const getTitleFromUser = () => {
	if (checkInput()) { 
	localStorage.setItem('movieTitleStorage',`${movieInputFieldNode.value}`);
	return movieInputFieldNode.value 
	}
	renderError("Incorrectly filled field");
}

const getPageNumberFromUser = () => pageQuantityNode.value;

const renderSearchResult = (searchResult) => {
	pageNumber = pageCounter(searchResult.totalResults);
	pageInformationNode.innerText = `Found ${searchResult.totalResults} movies. ${pageNumber} pages available`
	let searchResultMarkup = '';
	searchResult.Search.forEach(movie => {
		let movieImage = movie["Poster"];
		(movieImage === 'N/A') ? 
			movieImage = 'resources/Movie & Film Poster.jpg' :
			movieImage = movie["Poster"]
			searchResultMarkup += `
			<a id='${movie["imdbID"]}' href="movieInfo.html" class="item">
				<img class='item-image' src='${movieImage}' alt='${movie["Title"]} movie cover'>
				<div class='item-info'>
					<h2 class='item-name'>${movie["Title"]}</h2>
					<p class='item-release-date'>${movie["Year"]}</p>
					<p class='item-type'>${movie["Type"]}</p>
				</div>
			</a>
		`;
	});
	movieListOutputNode.innerHTML = searchResultMarkup;
}		

const sendRequestForMovies = (movieTitle, page) => {
	fetch(`https://omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}&page=${page}`)
	.then(response => response.json())
	.then(movie => (movie.Response === "True") ? 
		renderSearchResult(movie) :
		movieListOutputNode.innerText = 'There are no such films.') 
	.catch(error =>console.log(error))
}

const searchMovieByTitle = () => {
	const movieTitle = getTitleFromUser();
	if(!movieTitle){
		return
	}
	const pageNumber = getPageNumberFromUser();
	sendRequestForMovies(movieTitle, pageNumber);
};

const changeMoviePage = () => {
	pageNumber = pageQuantityNode.value;
	movieTitle = getTitleFromUser();
	savePageNumberToStorage()
	sendRequestForMovies(movieTitle, pageNumber)
}

const showMovieInformation = (element) => {
	element.preventDefault();
	if (element.target.closest('.item').id) {
		movieID = element.target.closest('.item').id
		changeLocation(movieID);
	}
}

init();
// _____ ОТРАБОТЧИКИ КНОПОК _____
movieSearchButtonNode.addEventListener('click', searchMovieByTitle);
movieSearchButtonNode.addEventListener('mouseup', resetCounter);
movieListOutputNode.addEventListener('click', (e) => showMovieInformation(e));
pageQuantityNode.addEventListener('input', changeMoviePage)
pageMinusNode.addEventListener('click', minusQuantityInput);
pagePlusNode.addEventListener('click', plusQuantityInput);
previousButtonNode.addEventListener('click', minusQuantityInput)
nextButtonNode.addEventListener('click', plusQuantityInput)

