$(document).ready(function(){
//console.log("hello world");
function getWeather(searchCity) {
    var apiKey = "570e7463f975999cf525695cc31f504d";
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey,
    method: "GET",
}).then(function(response){
    console.log(response.list);
});
}

 $("#searchBtn").on("click", function(event){
    event.preventDefault();
    var searchCity = $("#user-input").val();
    console.log(searchCity);
     getWeather(searchCity);
 })

});
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//need city to be stored in local storage and name of city populates
// current weather of that city populates
//5 day forecast  