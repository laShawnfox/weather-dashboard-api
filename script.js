$(document).ready(function(){
//console.log("hello world");
function getWeather(event){
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=570e7463f975999cf525695cc31f504d",
    method: "GET",
}).then(function(response){
    console.log(response.city);
});
}

$("#search-form").on("submit", function(){
    event.preventDefault();
    getWeather();
})

});
//api.openweathermap.org/data/2.5/forecast?q={city name}