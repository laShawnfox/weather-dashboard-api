$(document).ready(function(){
    //console.log("hello world");
   $.ajax({
       url: 
       "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=570e7463f975999cf525695cc31f504d",
       
       method: "GET",
   });
   //console.log("api");


})