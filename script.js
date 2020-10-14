$(document).ready(function(){
//console.log("hello world");
var fiveDay = $("#fiveDay");
var searchButton = $("#searchBtn");
var tempEL = $("#temp");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var uv = $("#uv");
var searchHistory = JSON.parse(localStorage.getItem("search-form"));
var searchCity = $("#user-input");
var cityName = $("#city-display");
var UV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=463f975999cf525570e7695cc31f504d";

function getWeather(cityName) {
   // console.log(cityName);
    var apiKey = "463f975999cf525570e7695cc31f504d";
    var searchCity = $("#user-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
   
$.ajax({
    url: queryURL, 
    method: "GET",
}).then(function(response){
    console.log(response);
 fiveDay.html("");

    for (var i = 0; i < response.length; i + 8){
    fiveDay.append("<div>");
        var weather = $("<h3>");
        weather.text(response.list.main[0].temp);
        $("#fiveDay").append(weather);   
    }

});
}
 

 $("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchCity = $("#user-input").val();
    //console.log(searchCity);
     getWeather(searchCity);
     //localStorage.setItem("search", JSON.stringify("search-form"));
     //getCities();
     
 })

});
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key
// current weather of that city populates
//5 day forecast  