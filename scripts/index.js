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


const renderSearchResult = (searchResponse) => {
	let searchResultMarkup = '';
	searchResponse.Search.forEach(movie => {
		searchResultMarkup += `
			<a id='${movie["imdbID"]}' href="movieInfo.html" class="item">
				<img class='item-image' src='${movie["Poster"]}' alt='Обложка фильма ${movie["Title"]}'>
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
		.catch(error => alert(error.message))
};

const formMovieData = (movie_data) => {
	return {
		"Year": movie_data.Year,
		"Rated": movie_data.Rated,
		"Released": movie_data.Released,
		"Runtime": movie_data.Runtime,
		"Genre": movie_data.Genre,
		"Director": movie_data.Director,
		"Actors": movie_data.Actors,
		// Image
		// Rating
	}
}

const showMovieInformation = (movieID) => {
	fetch(`https://omdbapi.com/?i=${movieID}&apikey=${API_KEY}`)
		.then(response => response.json())
		.then(movie_data => {
			const movie_info = formMovieData(movie_data);
			console.log(movie_info);
			let getParams = new URLSearchParams();
			for (const key in movie_info) {
				getParams.append(key,movie_info[key]);
			}
			console.log(getParams);
			window.location.href = `movieInfo.html/?${getParams.toString()}`;
		})
}



// _____ ОТРАБОТЧИКИ КНОПОК _____
init();
// 
movieSearchButtonNode.addEventListener('click', searchMovieByTitle);
movieListOutputNode.addEventListener('click', function(e) {
	e.preventDefault();
	if (e.target.closest('.item').id) {
		movieID = e.target.closest('.item').id
		showMovieInformation(movieID);
	}
});

// const params = new URLSearchParams();
// params.append('param1', 'value1');
// params.append('param2', 'value2');

// const url = 'https://example.com/api?' + params;
