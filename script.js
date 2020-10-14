$(document).ready(function(){
//console.log("hello world");
var fiveDay = $("#fiveDay");


function getWeather(searchCity) {
    console.log(searchCity)
    var searchCity = $("#user-input").val();
    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=570e7463f975999cf525695cc31f504d";
    var apiKey = "570e7463f975999cf525695cc31f504d";
$.ajax({
    url: queryUrl, 
    method: "GET",
}).then(function(response){
    console.log(response);
 fiveDay.html("");

    for (var i = 0; i < response.list.length; i + 8){
    fiveDay.append("<div>");
        var weather = $("<h3>");
        weather.text(response.list[i].main.temp);
        $("#fiveDay").append(weather);   
    }
});
}
 

 $("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchCity = $("#user-input").val();
    console.log(searchCity);
     getWeather(searchCity);
     //getCities();
     //want 5 day forecast to populate 
 })

});
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//need city to be stored in local storage and name of city populates
// current weather of that city populates
//5 day forecast  