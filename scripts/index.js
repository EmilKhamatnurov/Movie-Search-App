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
const init = () => {
	const url = new URL(window.location.href);
	(!url.searchParams.get('movieTitle')) ? 
		movieListOutputNode.innerText = "Поиск пока пуст" :
		""

}

const checkInput = () => (!movieInputFieldNode.value.trim()) ? false : true;

const changeLocation = (movieID) => window.location.href = `movieInfo.html?id=${movieID}`;

const clearMovieInput = () => movieInputFieldNode.value = '';

const switchFocusToMovieInput = () => movieInputFieldNode.focus();


const renderError = (message_error) => {
	errorOutputNode.innerText =  `${message_error}`;
	errorOutputNode.classList.toggle('visible');
	clearMovieInput();
	switchFocusToMovieInput();
} 
const getTitleFromUser = () => (checkInput()) ? 
	movieInputFieldNode.value :
	renderError("Неправильно заполненное поле");


const renderSearchResult = (searchResult) => {

	let searchResultMarkup = '';
	searchResult.Search.forEach(movie => {
		let movieImage = movie["Poster"];
		(movieImage === 'N/A') ? 
			movieImage = 'resources/Movie & Film Poster.jpg' :
			movieImage = movie["Poster"]

			searchResultMarkup += `
			<a id='${movie["imdbID"]}' href="movieInfo.html" class="item">
				<img class='item-image' src='${movieImage}' alt='Обложка фильма ${movie["Title"]}'>
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

const searchMovieByTitle = () => {
	const movieTitle = getTitleFromUser();
	if(!movieTitle){
		return
	}
	fetch(`https://omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
		.then(response => response.json())
		.then(movie => (movie.Response === "True") ? 
			renderSearchResult(movie) :
			movieListOutputNode.innerText = 'Таких фильмов у нас нет') 
		.catch(error =>console.log(error))
};

// _____ ОТРАБОТЧИКИ КНОПОК _____
init();
// 
movieSearchButtonNode.addEventListener('click', searchMovieByTitle);
movieListOutputNode.addEventListener('click', function(e) {
	e.preventDefault();
	if (e.target.closest('.item').id) {
		movieID = e.target.closest('.item').id
		changeLocation(movieID);
	}
});
