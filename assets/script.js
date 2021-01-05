var searchInput= $("#searchinput");
var searchBtn=$(".search-button");
var searchHistory= $(".search-history");
var currentCard= $(".current");
var cityName=$("#city-name");
var temperature= $("#temperature");
var humidity= $("#humidity");
var windSpeed= $("#wind-speed");
var UV= $("#UV-index"); 
// var city= $("#searchinput").text();
var date= moment().format("DD/MM/YYYY");
var APIKey= "9fbba8bfea87cd371d313708e1beec24"
var icon= "http://openweathermap.org/img/wn/";
// http://openweathermap.org/img/wn/10d@2x.png

$(document).ready(function() {

//  when the search button is click, 3 things happened: current display, 5 days forecast, and name to history
	$(".search-button").on("click", function (){
		// user input value 
		var citySearch = $('#searchinput').val().trim();
		console.log(citySearch)
		var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIKey;
		// var date = new Date(results.dt * 1000).toLocaleDateString('en-US');
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			// Log the queryURL
			console.log(queryURL);
			console.log(response);
			var iconCurrent= response.weather[0].icon;
			var currentIcon= icon + iconCurrent + "@2x.png"; 
			$("#city-name").html("<h2>" + response.name + " ("+date + ") "+ currentIcon +"</h2>");


		});
	});
});