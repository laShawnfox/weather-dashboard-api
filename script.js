$(document).ready(function(){
//console.log("hello world");
var fiveDay = $("#fiveDay");
var searchButton = $("#searchBtn");
var tempEL = $("#temp");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var uv = $("#uv");
var searchHistory = JSON.parse(localStorage.getItem("search-form"));
var city = $("#user-input");
var cityDisplay = $("#city-display");
var currentDay = moment().format("HH");
var UV = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=463f975999cf525570e7695cc31f504d";
// var lat = response.city.coord.lat;
// var lon = response.city.coord.lon;

// Function search city
function getWeather(city) {
   //console.log(cityName);
    var apiKey = "463f975999cf525570e7695cc31f504d";
    var city = $("#user-input").val();
   
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
   
$.ajax({
    url: queryURL, 
    method: "GET",
}).then(function(response){
    console.log(response);
   console.log(response.name);
   fiveDay.html("");

 //Five Day Forecast
     for (var i = 0; i < response.length; i + 8){
     fiveDay.append("<div>");
        var weather = $("<h3>");
        weather.text(response.list.main[0].temp);
        $("#fiveDay").append(weather);   
     }
    
});
}
 
//Current weather
function getCurrent(){
var queryURLcurrent = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
var apiKey = "463f975999cf525570e7695cc31f504d";

$.ajax({
    url: queryURLcurrent, 
    method: "GET",
}).then(function(response){
    console.log(response);

}

$("#display-name").text(response.name);
$("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");

 $("#searchBtn").on("click", function(){
   getWeather(city);
    city = $("#user-input").val();
    console.log(city);
    console.log(cityDisplay);
    localStorage.getItem(city);
    //currentWeather(city);
   
     //localStorage.setItem("search", JSON.stringify("search-form"));
     //getCities();
     
 })



});