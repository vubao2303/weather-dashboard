// current location, date, and weather 
// search history store in local storage ?
// 5 days for cast

var searchBtn= $(".search-button")



// search history 
var searchHistory= "";
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
localStorage.getItem('searchHistory');
// if the local storage is empty then...? 
if (localStorage.getItem('searchHistory') !==null){
    history=localStorage.getItem('searchHistory')
    // this here append the table with the new value of history
    $('.searchHistory').text(history);
};
// maybe I should do it in an array? 



// working with search button 
$(".search-button").on("click", function (){
    
});
// when the search button is clicked, the funtion will be showing current condition of that city
// and 5 days forecast, and that searched city is added to the search history 
// if there in nothing in the search box when the search button is clicked, return 




// I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index