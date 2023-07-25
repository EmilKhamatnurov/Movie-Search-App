// _____ КОНСТАНТЫ
const API_KEY = 'd0fbae7e';
// _____ ССЫЛКИ
// Ссылка на элемент поля ввода фильмов
const movieInputFieldNode = document.querySelector('#movieInputField');
// Ссылка на кнопку поиска фильмов. "Search"
const movieSearchButtonNode = document.querySelector('#movieSearchButton');
// Ссылка на объект, в окторый выводится список фильмов 
const movieListOutputNode = document.querySelector('#movieListOutput');
// ?
const errorOutputNode = document.querySelector('#errorOutput');

// _____ FUNCTIONS _____
const init = () => movieListOutputNode.innerText = "Поиск пока пуст";

const checkInput = () => (!movieInputFieldNode.value.trim()) ? false : true;

const renderError = (message_error) => {
	errorOutputNode.innerText =  `${message_error}`;
	errorOutputNode.classList.toggle('visible');
	clearMovieInput();
	switchFocusToMovieInput();
} 
const clearMovieInput = () => movieInputFieldNode.value = '';
const switchFocusToMovieInput = () => movieInputFieldNode.focus();

const getTitleFromUser = () => (checkInput()) ? 
	movieInputFieldNode.value :
	renderError("Неправильно заполненное поле");

const renderSearchResult = (moviesList) => {
	movieListOutputNode.innerText = JSON.stringify(moviesList);
}

const searchMovieByTitle = () => {
	const movieTitle = getTitleFromUser();
	if(!movieTitle){
		return
	}
	fetch(`https://omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
		.then(response => response.json())
		.then(movie => (movie.Response) ? 
			renderSearchResult(movie) :
			movieListOutputNode.innerText = 'Таких фильмов у нас нет') 
		.catch(error => alert(error.message))
};




// _____ ОТРАБОТЧИКИ КНОПОК _____
init();
// 
movieSearchButtonNode.addEventListener('click', searchMovieByTitle);