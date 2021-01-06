function initPage() {
  const inputEl = document.getElementById("city-input");
  const searchEl = document.getElementById("search-button");
  const clearEl = document.getElementById("clear-history");
  const nameEl = document.getElementById("city-name");
  const currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");4
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  console.log(searchHistory);
  

  const APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";
//  When search button is clicked, read the city name typed by the user

  function getWeather(cityName) {
//  Using saved city name, execute a current condition get request from open weather map api
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
      axios.get(queryURL)
      .then(function(response){
          console.log(response);
//  Parse response to display current conditions
      //  Method for using "date" objects obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
          const currentDate = new Date(response.data.dt*1000);
          console.log(currentDate);
          const day = currentDate.getDate();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
          let weatherPic = response.data.weather[0].icon;
          currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
          currentPicEl.setAttribute("alt",response.data.weather[0].description);
          currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
          currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
          currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
      let lat = response.data.coord.lat;
      let lon = response.data.coord.lon;
      let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
      axios.get(UVQueryURL)
      .then(function(response){
          let UVIndex = document.createElement("span");
          UVIndex.setAttribute("class","badge badge-danger");
          UVIndex.innerHTML = response.data[0].value;
          currentUVEl.innerHTML = "UV Index: ";
          currentUVEl.append(UVIndex);
      });
//  Using saved city name, execute a 5-day forecast get request from open weather map api
      let cityID = response.data.id;
      let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
      axios.get(forecastQueryURL)
      .then(function(response){
//  Parse response to display forecast for next 5 days underneath current conditions
          console.log(response);
          const forecastEls = document.querySelectorAll(".forecast");
          for (i=0; i<forecastEls.length; i++) {
              forecastEls[i].innerHTML = "";
              const forecastIndex = i*8 + 4;
              const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
              const forecastDay = forecastDate.getDate();
              const forecastMonth = forecastDate.getMonth() + 1;
              const forecastYear = forecastDate.getFullYear();
              const forecastDateEl = document.createElement("p");
              forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
              forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
              forecastEls[i].append(forecastDateEl);
              const forecastWeatherEl = document.createElement("img");
              forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
              forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
              forecastEls[i].append(forecastWeatherEl);
              const forecastTempEl = document.createElement("p");
              forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
              forecastEls[i].append(forecastTempEl);
              const forecastHumidityEl = document.createElement("p");
              forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
              forecastEls[i].append(forecastHumidityEl);
              }
          })
      });  
  }

  searchEl.addEventListener("click",function() {
    //   const searchTerm = inputEl.value;
    //   getWeather(searchTerm);
    //   searchHistory.push(searchTerm);
      localStorage.setItem("search",JSON.stringify(searchHistory));
      renderSearchHistory();
  })

  clearEl.addEventListener("click",function() {
      searchHistory = [];
      renderSearchHistory();
  })

  function k2f(K) {
      return Math.floor((K - 273.15) *1.8 +32);
  }
  var searchHistory = JSON.parse(localStorage.getItem("city")) || []
//   when button is clicked 
searchHistory.push(citySearch);
localStorage.setItem("city",JSON.stringify(searchHistory));
renderSearchHistory();


  function renderSearchHistory(){
    // var historylist = [];
    for (var i = 0; i < searchHistory.length; i++) {
    var newSearch = $('<tr>');
    newSearch.attr("value",searchHistory[i]);
    // newSearch.on("click",function (){}) this is for when this is clicked info for that city will show
    }
    searchHistory.append(newSearch);
  }




  function renderSearchHistory() {
    //   historyEl.innerHTML = "";
    //   for (let i=0; i<searchHistory.length; i++) {
        //   const historyItem = document.createElement("input");
          // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
        //   historyItem.setAttribute("type","text");
        //   historyItem.setAttribute("readonly",true);
        //   historyItem.setAttribute("class", "form-control d-block bg-white");
        //   historyItem.setAttribute("value", searchHistory[i]);
        //   historyItem.addEventListener("click",function() {
        //       getWeather(historyItem.value);
        //   })
          historyEl.append(historyItem);
      }
  }

  renderSearchHistory();
  if (searchHistory.length > 0) {
      getWeather(searchHistory[searchHistory.length - 1]);
  }


//  Save user's search requests and display them underneath search form
//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for

}
initPage();







// CODE PRACTICE HERE 

// // current location, date, and weather 
// // search history store in local storage ?
// // 5 days for cast


// // API key =9fbba8bfea87cd371d313708e1beec24

// var queryURL= "api.openweathermap.org/data/2.5/weather?q=Santa+Rosa&appid=9fbba8bfea87cd371d313708e1beec24";

// // var currentWeather= api.openweathermap.org/data/2.5/weather?q={city name}&appid={9fbba8bfea87cd371d313708e1beec24}


// var searchBtn= $(".search-button")

// $(".search-button").on("click", function (){

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//   ​
//         // Create CODE HERE to Log the queryURL
//         console.log(queryURL);
//         // Create CODE HERE to log the resulting object
//         console.log(response);
//         // Create CODE HERE to calculate the temperature (converted from Kelvin)
//         var temp = (response.main.temp - 273.15) * 1.80 + 32
//         console.log(temp);
//         // Create CODE HERE to transfer content to HTML
//         $(".temp").text("Temperature: " + temp);
//         // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//         // Create CODE HERE to dump the temperature content into HTML
//         $(".city").text("City: " + response.name);
//         $(".wind").text("Wind: " + response.wind.speed);
//         $(".humidity").text("Humidity: " + response.main.humidity);
//   ​
//       });
//     });


// // $.ajax({
// //     url: queryURL,
// //     method: "GET"
// //   }).then(function(response) {
// //       console.log(response);
// //       $("#temperature").text(response)
// //   });

// // // search history 
// // var searchHistory=[];
// // localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
// // localStorage.getItem('searchHistory');
// // // if the local storage is empty then...? 
// // if (localStorage.getItem('searchHistory') !==null){
// //     history=localStorage.getItem('searchHistory')
// //     // this here append the table with the new value of history
// //     $('.searchHistory').text(history);
// // };
// // // maybe I should do it in an array? 

// // function 5days(){

// // }

// // function current(current){

// // }





// // // working with search button 
// // $(".search-button").on("click", function (){
// //     // will be showing current condition of that city


// //     5days()

// // });
// // // when the search button is clicked, the funtion will be showing current condition of that city
// // // and  
// // // if there in nothing in the search box when the search button is clicked, return 




// // // I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


//     // This is our API key. Add your own API key between the ""
//     var APIKey = "a479558350b81143a0cd27e30716cf87";
// ​
//     // Here we are building the URL we need to query the database
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
// ​
//     // We then created an AJAX call
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//   ​
//         // Create CODE HERE to Log the queryURL
//         console.log(queryURL);
//         // Create CODE HERE to log the resulting object
//         console.log(response);
//         // Create CODE HERE to calculate the temperature (converted from Kelvin)
//         var temp = (response.main.temp - 273.15) * 1.80 + 32
//         console.log(temp);
//         // Create CODE HERE to transfer content to HTML
//         $(".temp").text("Temperature: " + temp);
//         // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//         // Create CODE HERE to dump the temperature content into HTML
//         $(".city").text("City: " + response.name);
//         $(".wind").text("Wind: " + response.wind.speed);
//         $(".humidity").text("Humidity: " + response.main.humidity);
//   ​
//       });

// var city= $("#searchinput").val().trim();
// var queryURL= "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9fbba8bfea87cd371d313708e1beec24";
// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//       console.log(response)
//   });

var APIKey= "9fbba8bfea87cd371d313708e1beec24"

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "Bujumbura,Burundi";
// var city = "San Francisco"
// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    var windSpeed = response.wind.speed;
    $(".wind").html("<p>Wind Speed: " +  windSpeed + "</p>");
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
  });


//   search button 

// 3 events will happen 

// 1. city name goes to the history box 
// a) array of city names display out the the page, by saving it to local storage
// b) city names shoudl have all the info about it even when it is save 

// 2. current/search city's info displayed in the card 
// 2.1 display city name, get temp get, humi, widn and uv index 
//   for uv Index, need to add color coded 



// 3. 5 days forecast card is filled with future forecast 
// need to get date, icon, temp and hum 
$("#humility").text("humiduty:" + humidiyt )


$("#temperture").span.text(temperture)


function displayHistory() {
    var getLocalSearchHistory = localStorage.getItem('searchHistory');
    var localSearchHistory = JSON.parse(getLocalSearchHistory);

    if (getLocalSearchHistory === null) {
      createHistory();
      getLocalSearchHistory = localStorage.getItem('searchHistory');
      localSearchHistory = JSON.parse(getLocalSearchHistory);
    }

    for (var i = 0; i < localSearchHistory.length; i++) {
      var historyLi = $('<li>');
      historyLi.addClass('list-group-item');
      historyLi.text(localSearchHistory[i].city);
      $('#search-history').prepend(historyLi);
      $('#search-history-container').show();
    }
    return (searchHistoryArr = localSearchHistory);
  }

  function createHistory() {
    searchHistoryArr.length = 0;
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  }


//   working with history 

  var historylist =[];
  localStorage.setItem('searchHistory', JSON.stringify(historylist));
  var pastSearch = localStorage.getItem('searchHistory');
  var localSearchHistory = JSON.parse(pastSearch);

  if (pastSearch=== null) {
    localStorage.setItem('searchHistory', JSON.stringify(historylist));
    pastSearch = localStorage.getItem('searchHistory');
    localSearchHistory = JSON.parse(pastSearch);
  }
  for (var i = 0; i < localSearchHistory.length; i++) {
    var newSearch = $('<tr>');
    newSearch.text(historylist[i].citySearch)
    console.log(newSearch);
	searchHistory.append(newSearch);
  }
  return (historylist = localSearchHistory);




	var pastSearch= localStorage.setItem("city", citySearch)
	for (var i=0; i < pastSearch.length; i++){
		var newSearch = $("<tr>");
		newSearch.text(historylist[i].pastSearch);
		console.log(newSearch);
		searchHistory.append(newSearch);
	}

// 	}

// working with history table 
// every user input will go in a table row 


// first try
// var historylist = localStorage.getItem('city');
// if (historylist === null) {
// 	historylist = [];
// }
// else {
// 	historylist = JSON.parse(historylist);
// }
// // var citySearch is user input, it was call in the golbal, but we will use it again here

// historylist.push(citySearch);
// localStorage.setItem('city', JSON.stringify(historylist));
// for (var i = 0; i < historylist.length; i++) {

// 	var newSearch = $('<tr>');
// 	newSearch.text(historylist[i].citySearch);
// 	searchHistory.append(newSearch);

// }


// second try
// var historylist =[];
// localStorage.setItem('city', JSON.stringify(historylist));
// var pastSearch = localStorage.getItem('city');
// var localSearchHistory = JSON.parse(pastSearch);

// if (pastSearch=== null) {
// 	localStorage.setItem('city', JSON.stringify(historylist));
// 	pastSearch = localStorage.getItem('city');
// 	localSearchHistory = JSON.parse(pastSearch);
// }
// for (var i = 0; i < localSearchHistory.length; i++) {
// 	var newSearch = $('<tr>');
// 	newSearch.text(historylist[i].citySearch)
// 	console.log(newSearch);
// searchHistory.append(newSearch);
// }
// return (historylist = localSearchHistory);


// third try

// function history (){
// var historylist = [];
// var pastSearch = localStorage.setItem("city", citySearch)
// for (var i = 0; i < pastSearch.length; i++) {
// 	var newSearch = $("<tr>");
// 	newSearch.text(historylist[i].pastSearch);
// 	console.log(newSearch);
// 	searchHistory.append(newSearch);
// }

// 	}




// function displayHistory() {
// 	var getLocalSearchHistory = localStorage.getItem('searchHistory');
// 	var localSearchHistory = JSON.parse(getLocalSearchHistory);

// 	if (getLocalSearchHistory === null) {
// 		createHistory();
// 		getLocalSearchHistory = localStorage.getItem('searchHistory');
// 		localSearchHistory = JSON.parse(getLocalSearchHistory);
// 	}

// 	for (var i = 0; i < localSearchHistory.length; i++) {
// 		var historyLi = $('<li>');
// 		historyLi.addClass('list-group-item');
// 		historyLi.text(localSearchHistory[i].city);
// 		searchHistory.prepend(historyLi);

// 	}
// 	return (searchHistoryArr = localSearchHistory);
// }



// });

// WORKING CODE