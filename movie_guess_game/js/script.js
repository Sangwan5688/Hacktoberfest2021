const movieList = [
	"Inception",
	"Interstellar",
	"Shutter Island",
	"Fight Club",
	"Se7en",
	"Prisoners",
	"Arrival",
	"The Prestige",
	"The Dark Knight",
	"Baby Driver",
	"Whiplash",
	"Blade Runner 2049",
	"Mad Max: Fury Road",
	"Drive",
	"Ex Machina",
	"Looper",
	"Nightcrawler",
	"Avengers: Infinity War",
	"Avengers: Endgame",
	"Captain America: Civil War",
	"Black Panther",
	"Kill Bill: Vol. 1",
	"Frozen",
	"Finding Nemo",
	"Up",
	"Inside Out",
	"Ratatouille",
	"Kung Fu Panda",
	"Avatar",
	"Titanic",
	"Star Wars: Episode IV - A New Hope",
	"Spider-man",
	"Forrest Gump",
	"Back to the Future",
	"Jurassic Park",
	"Jaws",
	"Alien",
	"The Matrix",
	"Transformers",
	"Saw",
	"The Shining",
	"Nope",
]
var chosenMovie = randomMovie();

// Return random movie from movieList
function randomMovie() {
	const randomIndex = Math.floor(Math.random() * movieList.length);
	return movieList[randomIndex];
}

// XMLHttpRequest
const xhr = new XMLHttpRequest();
const baseURL = 'http://www.omdbapi.com/';
const query = '?t=' + chosenMovie + "&apikey=15ece450";
console.log(query);
const url = baseURL + query;


var movie_obj;

xhr.open("GET", url, true);
xhr.send(null)
xhr.onload = function () {
	if (xhr.status === 200) {
		movie_obj = JSON.parse(xhr.responseText);
		console.log(movie_obj);
		createMovie();
	}
}

//Gamepage creation
function createMovie() {
	const gamepage = $("#gamepage");
	gamepage.html(
		"<p>" + movie_obj.Plot + "</p>" +
		"<label for='movie-select'>The Movie:</label>" +
		"<select id='movie-select'>" +
		movieList.map(movie => "<option value='" + movie + "'>" + movie + "</option>").join("") +
		"</select>" +
		"<br>" +
		"<button id='submit-btn'>Submit</button>"
	);

	$("#gamepage").append(gamepage);
}

// Determines if answer is correct or not and which page to show
function createResult(correct) {
	const resultpage = $("#resultpage");
	if (correct === true) {
		resultpage.html(
			"<h1> CORRECT! </h1>" +
			"<p> The movie was " + chosenMovie + "</p>" +
			"<button id='next-btn'>Next Movie</button>"
		);
	} else {
		resultpage.html(
			"<h1> WRONG! </h1>" +
			"<p> The movie was " + chosenMovie + "</p>" +
			"<button id='quit-btn'>Quit</button>"
		);
	}

	$("#resultpage").append(resultpage);

}



//Jquery controls
$("#gamepage").hide();
$("#resultpage").hide();

// Starting game
$(document).ready(function () {
	$("#start-btn").click(function () {
		$("#homepage").hide();
		$("#gamepage").show();
	});
});

// Quitting game
$(document).ready(function () {
    $("#quit-btn").click(function () {
        console.log("Quit");
        $("#resultpage").hide();
        $("#homepage").show();
    });
});

// Submitting answer
$("#gamepage").on("click", "#submit-btn", function () {
	const selectedMovie = $("#movie-select").val();
	if (selectedMovie === chosenMovie) {
		console.log("CORRECT!");
		createResult(true);
	} else {
		console.log("WRONG!");
		createResult(false);
	}
	$("#resultpage").show();
	$("#gamepage").hide();
});