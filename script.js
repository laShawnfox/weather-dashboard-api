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
   console.log(response.list.main.temp);
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
function getCurrent(cityDisplay) {
var cityDisplay = $("#city-display");
var city = $("#user-input").val();    
var apiKey = "463f975999cf525570e7695cc31f504d";
var queryURLcurrent = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

$.ajax({
    url: queryURLcurrent, 
    method: "GET",
}).then(function(response){
    console.log(response);

$("#display-name").text(response.name);
$("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");

});
}

var city = $("#user-input").val();    
var apiKey = "463f975999cf525570e7695cc31f504d";
var queryURLcurrent = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

$.ajax({
    url: queryURLcurrent, 
    method: "GET",
}).then(function(response){
    //console.log(response);
    $("#temp").text("Temperture" + response.list.main.temp);
    $("#humidity").text("Humidity" + response.list.main.humidity);
    $("#wind-speed").text("Wind Speed" + response.list.main.wind.speed);
    

 $("#searchBtn").on("click", function(){
   //getWeather(city);
    city = $("#user-input").val();
   // getCurrent(cityDisplay);
    console.log(city);
    console.log(cityDisplay);
   // localStorage.getItem(city);
    //currentWeather(city);
   
     //localStorage.setItem("search", JSON.stringify("search-form"));
     //getCities();
     
 })



});