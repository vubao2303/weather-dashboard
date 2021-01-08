var searchInput = $("#searchinput");
var searchBtn = $(".search-button");
var searchHistory = $(".search-history");
var currentCard = $(".current");
var cityName = $("#city-name");
var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var UV = $("#UV-index");
// var city= $("#searchinput").text();
var date = moment().format("DD/MM/YYYY");
var APIKey = "9fbba8bfea87cd371d313708e1beec24";
var searchHistory = JSON.parse(localStorage.getItem("city")) || [];


$(document).ready(function () {
	

	//  when the search button is click, 3 things happened: current display, 5 days forecast, and name to history
	$(".search-button").on("click", function (event) {
		event.preventDefault();
		// user input value 
		var citySearch = $('#searchinput').val().trim();
		// set the box back to empty 
		searchInput.val("");
		var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIKey;
		var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + APIKey;


		// Five days forcast 
		$.ajax({
			url: fiveQueryURL,
			method: 'GET'
		}).then(function (response) {
			console.log(response);
			$(".target").empty();
			for (let i = 0; i < response.list.length; i++) {
				// only look at forecasts around 3:00pm
				// console.log("looping");
				if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
					console.log(response.list[i])
					var forecastIcon = response.list[i].weather[0].icon
					var ficonimg = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";
					var card = `
					<div class=col-md-2>
						<div class="card forecast" id="day1">
						<p class="date">${response.list[i].dt_txt}</p>
						<div><img src=${ficonimg} alt="icon" ></img></div>
						<p class="temp">Temp: ${response.list[i].main.temp}</p>
						<p class="humidity"> Humidity:${response.list[i].main.humidity}%</p>
						</div>
					</div>
					`
					
					// console.log($(".target"));
					$(".target").append(card);
						
				}

				
				// else {$(".target").empty()};
			}

		});

		// current Weather 
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			// Log the queryURL
			console.log(queryURL);
			console.log(response);
			// icon
			var icon = response.weather[0].icon;
			var iconimg = "http://openweathermap.org/img/wn/" + icon + ".png";
			// var icondisplay = 
			$("#current-pic").attr("src", iconimg);
			// city name
			$("#city-name").html("<h2>" + response.name + " (" + date + ") " + "</h2>");
			// temperature
			temperature.text(" " + response.main.temp + " °F");
			// humidity 
			humidity.text(" " + response.main.humidity + "%");
			// windSpeed
			windSpeed.text("" + response.wind.speed + "MPH");

			// work on UV Index	
			var uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
			var lat = response.coord.lat;
			var lon = response.coord.lon;
			var uviQueryURL = uviAPI + lat + '&lon=' + lon + "&appid=" + APIKey;
			console.log(uviQueryURL);

			$.ajax({
				url: uviQueryURL,
				method: 'GET'
			}).then(function (response) {
				console.log(uviQueryURL);
				console.log(response);
				var result = response.value;
				UV.text(result);

				if (result < 3) {
					UV.css('background-color', 'green');
				} else if (result < 6) {
					UV.css('background-color', 'yellow');
				} else if (result < 8) {
					UV.css('background-color', 'orange');
				} else if (result < 11) {
					UV.css('background-color', 'red');
				} else {
					UV.css('background-color', 'purple');
				}
			});
			// done with index
			// done with ajax response for current weather
		});

		// when the button click create a new element 
		var newSearch = $("<tr>");
		newSearch.addClass("table-bordered");
		//  that new element is user input
		
		newSearch.text(citySearch);
		console.log(newSearch);
		$(".search-history").prepend(newSearch);
		if (!searchHistory.includes(citySearch)){
		searchHistory.push(citySearch);}

		// save userinput to local storage
		localStorage.setItem("city", JSON.stringify(searchHistory));
		// below marks the end of button clicked 
	});
	// keep the local storage on the page
	// for (var i=0; i<searchHistory.length; i++){

	var historyarr = JSON.parse(localStorage.getItem('city'))
	for (var i = 0; i < historyarr.length; i++) {
		if(historyarr[i]!== ""){
			// this is where it stay on the page after click refresh
		var newlist = $("<tr>");
		newlist.addClass("city-list table-bordered");
		newlist.text(historyarr[i]);
		console.log(JSON.parse(localStorage.getItem('city')));
		// go through if you find a comma, then split it into different words 
		// splice? split?
		
			$(".search-history").prepend(newlist);}
		$(".clear-button").on("click", function (){
			historyarr.empty();
		})
	}

});


function displaySearch (){
	
}
$(".clear-button").on("click", function (){
	$(".search-history").empty();
})
