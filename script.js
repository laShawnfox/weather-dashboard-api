$(document).ready(function(){
//console.log("hello world");
var fiveDay = $("#fiveDay");
var searchButton = $("#searchBtn");
var tempEL = $("#temp");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var uv = $("#uv");
var searchHistory = JSON.parse(localStorage.getItem("search-form"));
var cityName = $("#user-input");
var cityDisplay = $("#city-display");
var currentDay = moment().format("HH");
var UV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=463f975999cf525570e7695cc31f504d";


// Function search city
function getWeather(cityName) {
   console.log(cityName);
    var apiKey = "463f975999cf525570e7695cc31f504d";
    var cityName = $("#user-input").val();
   
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
   
$.ajax({
    url: queryURL, 
    method: "GET",
}).then(function(response){
    console.log(response);
 //fiveDay.html("");

    // for (var i = 0; i < response.length; i + 8){
    // fiveDay.append("<div>");
    //     var weather = $("<h3>");
    //     weather.text(response.list.main[0].temp);
    //     $("#fiveDay").append(weather);   
    // }

});
}
 

 $("#searchBtn").on("click", function(event){
   
   // cityName = $("#user-input").val();
    console.log(cityName);
    // getWeather(cityName);
     //localStorage.setItem("search", JSON.stringify("search-form"));
     //getCities();
     
 })



});
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key
// current weather of that city populates
//5 day forecast  