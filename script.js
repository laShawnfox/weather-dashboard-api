
var apiKey = "af82d5a25061873accbbaaf6cb52f8c5";
var cities = [];
cities.reverse();

function loadFromStore() {
  cities = JSON.parse(localStorage.getItem("cities")) || [];
}

function saveToStore() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

$(document).ready(function () {
  loadFromStore();
  if (cities[0]) {
    getCity(cities[cities.length - 1]);
  }

  citiesDisplay();
  //sample for city and date
  $(".btn").on("click", function (event) {
    event.preventDefault();

    var input = $(".form-control");
    var city = input.val();
    if (!cities.includes(city)) {
      cities.push(city);
      saveToStore();
    }
    citiesDisplay();
    getCity(city);
  });
  //code for Uv index
});

function citiesDisplay() {
  var limit;

  if (cities.length < 10) {
    limit = cities.length;
  } else {
    limit = 10;
  }
  $("#cityViewed").html("");
  for (var c = 0; c < limit; c++) {
    var cityViewed = $("<div>");
    cityViewed.addClass("row").css({
      textAlign: "center",
      border: "1px solid silver",
      height: "50px",
      lineHeight: "50px",
      paddingLeft: "40px",
    });
    cityViewed.html(cities[c]);
    $("#cityViewed").prepend(cityViewed);

    //OnClick event on each city
    cityViewed.attr("id", `${cities[c]}`);
    $(`#${cities[c]}`).on("click", function () {
      getCity($(this).text());
    });
  }
}

function getCity(city) {
  var currentDate = moment().format("LL");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  //get API data

  $.ajax({ url: queryURL, type: "GET" }).then(function (response) {
    //icon url var, url and element

    var iconLoc = response.weather[0].icon;

    var iconSrc = "https://openweathermap.org/img/wn/" + iconLoc + "@2x.png";
    var iconImage = $("<img>");
    iconImage.attr("src", iconSrc);

    $(".current-city").text(response.name + " (" + currentDate + ")");
    $(".current-city").append(iconImage);
    $("#temp").text("Tempeture : " + response.main.temp + " °F");
    $("#hum").text("Humidity : " + response.main.humidity + " %");
    $("#windy").text("Wind Speed : " + response.wind.speed + " MPH");
    // Converts the temp to Kelvin with the below formula
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(".tempF").text("Temperature (Kelvin) " + tempF);
    getUV(response.coord.lat, response.coord.lon);
    forecast(city);
    input.val("");
  });
}

function getUV(lat, lon) {
  var uvIndexURL =
    "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
    apiKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&cnt=1";
  $.ajax({ url: uvIndexURL, type: "GET" }).then(function (response) {
    $("#uv").text("UV-index : " + response[0].value);
  });
}
// 5 days forecast codes

function forecast(city) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  $.ajax({ url: forecastURL, type: "GET" }).then(function (response) {
    var list = response.list;
    console.log(response);
    // for each iteration of our loop
    $("#forecast").html("");
    for (var i = 39; i >= 0; i = i - 8) {
      var temp = ((list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);
      var iconId = list[i].weather[0].icon;
      var humidity = list[i].main.humidity;
      var date = new Date(list[i].dt_txt);

      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();

      var formatedDate = `${month + 1}/${day}/${year}`;
      // Creating and storing a div tag
      var col = $("<div>");
      col.addClass("col");
      var mycard = $("<div>");
      mycard.addClass("card");
      col.append(mycard);

      // Creating a paragraph tag with the response item
      var p = $("<p>").text(formatedDate);
      // Creating and storing an image tag

      var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";

      var weatherImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      weatherImage.attr("src", iconUrl);

      var p1 = $("<p>").text("Temp: " + temp + "°F");
      var p2 = $("<p>").text("Humidity: " + humidity + "%");

      // Appending the paragraph and image tag to mycard
      mycard.append(p);
      mycard.append(weatherImage);
      mycard.append(p1);
      mycard.append(p2);

      // Prependng the col to the HTML page in the "#forecast" div

      $("#forecast").prepend(col);
    }
  });
}

// var cities = [];
// var apiKey = "570e7463f975999cf525695cc31f504d";
// cities.reverse();

// function loadFromStore() {
//     cities = JSON.parse(localStorage.getItem("cities")) || [];
// }
  
// function saveToStore() {
// localStorage.setItem("cities", JSON.stringify(cities));
// }

// $(document).ready(function () {
//     loadFromStore();
//     if (cities[0]) {
//       getCity(cities[cities.length - 1]);
//     }
  
//     citiesDisplay();
    //sample for city and date
    // $(".btn").on("click", function (event) {
    //   event.preventDefault();
  
    //   var input = $(".form-control");
    //   var city = input.val();
    //   if (!cities.includes(city)) {
    //     cities.push(city);
    //     saveToStore();
    //   }
    //   citiesDisplay();
    //   getCity(city);
    // });
    //code for Uv index
// });

// function citiesDisplay() {
//     var limit;
  
//     if (cities.length < 10) {
//       limit = cities.length;
//     } else {
//       limit = 10;
//     }
//     $("#search-history").html("");
//     for (var c = 0; c < limit; c++) {
//       var cityViewed = $("<div>");
//       cityViewed.addClass("row").css({
//         textAlign: "center",
//         border: "1px solid silver",
//         height: "50px",
//         lineHeight: "50px",
//         paddingLeft: "40px",
//       });
//       cityViewed.html(cities[c]);
//       $(".search-history").prepend(cityViewed);
  
      //OnClick event on each city
//       cityViewed.attr("id", `${cities[c]}`);
//       $(`#${cities[c]}`).on("click", function () {
//         getCity($(this).text());
//       });
//     }
// }

// function chickenSand (bread, chicken) {
//     let sand = (bread * 2) + chicken
// }

// chickenSand (6, 3)


// function getCity(city) {
//     var currentDate = moment().format("LL");
//     var queryURL =
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//       city +
//       "&units=imperial&appid=" +
//       apiKey;
  
    //get API data
  
//     $.ajax({ url: queryURL, type: "GET" }).then(function (response) {
//       //icon url var, url and element
//       console.log(response); 
//       var iconLoc = response.weather[0].icon;
  
//       var iconSrc = "https://openweathermap.org/img/wn/" + iconLoc + "@2x.png";
//       var iconImage = $("<img>");
//       iconImage.attr("src", iconSrc);
  
//       $(".current-city").text(response.name + " (" + currentDate + ")");
//       $(".current-city").append(iconImage);
//       $("#temp").text("Tempeture : " + response.main.temp + " °F");
//       $("#hum").text("Humidity : " + response.main.humidity + " %");
//       $("#windy").text("Wind Speed : " + response.wind.speed + " MPH");
//       // Converts the temp to Kelvin with the below formula
//       var tempF = (response.main.temp - 273.15) * 1.8 + 32;
//       $(".tempF").text("Temperature (Kelvin) " + tempF);
//       getUV(response.coord.lat, response.coord.lon);
//       forecast(city);
//       input.val("");
//     });
// }

//uv
// // function getUV(lat, lon) {
// // var uvIndexURL =
// //     "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
// //     apiKey +
// //     "&lat=" +
// //     lat +
// //     "&lon=" +
// //     lon +
// //     "&cnt=1";
// // $.ajax({ url: uvIndexURL, type: "GET" }).then(function (response) {
// //     $("#uv").text("UV-index : " + response[0].value);
// // });
// }

// function forecast(city) {
//     var forecastURL =
//       "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       city +
//       "&appid=" +
//       apiKey;
  
//     $.ajax({ url: forecastURL, type: "GET" }).then(function (response) {
//       var list = response.list;
//       console.log(response);
      // for each iteration of our loop
    //   $("#forecast").html("");
    //   for (var i = 35; i >= 0; i = i - 8) {
    //     var temp = ((list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    //     var iconId = list[i].weather[0].icon;
    //     var humidity = list[i].main.humidity;
    //     var date = new Date(list[i].dt_txt);
  
    //     var day = date.getDate();
    //     var month = date.getMonth();
    //     var year = date.getFullYear();
  
        // var formatedDate = `${month + 1}/${day}/${year}`;
        // Creating and storing a div tag
        // var col = $("<div>");
        // col.addClass("col");
        // var mycard = $("<div>");
        // mycard.addClass("card");
        // col.append(mycard);
  
        // Creating a paragraph tag with the response item
        // var p = $("<p>").text(formatedDate);
        // Creating and storing an image tag
  
        // var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
  
//         var weatherImage = $("<img>");
//         // Setting the src attribute of the image to a property pulled off the result item
//         weatherImage.attr("src", iconUrl);
  
//         var p1 = $("<p>").text("Temp: " + temp + "°F");
//         var p2 = $("<p>").text("Humidity: " + humidity + "%");
  
//         // Appending the paragraph and image tag to mycard
//         mycard.append(p);
//         mycard.append(weatherImage);
//         mycard.append(p1);
//         mycard.append(p2);
  
//         // Prependng the col to the HTML page in the "#forecast" div
  
//         $("#forecast").prepend(col);
//       }
//     });
//   }



// $(document).ready(function(){
// //console.log("hello world");
// var fiveDay = $("#fiveDay");
// var searchButton = $("#searchBtn");
// var tempEL = $("#temp");
// var currentHumidity = $("#humidity");
// var currentWind = $("#wind-speed");
// var uv = $("#uv");
// var searchHistory = JSON.parse(localStorage.getItem("search-form"));
// var city = $("#user-input");
// var cityDisplay = $("#city-display");
// var currentDay = moment().format("HH");
// var UV = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=463f975999cf525570e7695cc31f504d";
// // var lat = response.city.coord.lat;
// // var lon = response.city.coord.lon;

// // Function search city
//  function getWeather(city) {
//    //console.log(cityName);
//     var apiKey = "463f975999cf525570e7695cc31f504d";
//     var city = $("#user-input").val();
   
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
   
// $.ajax({
//     url: queryURL, 
//     method: "GET"
// }).then(function(response){
//     console.log(response);
//    console.log(response.name);
//    console.log(response.list.main.temp);
//    fiveDay.html("");

//  //Five Day Forecast
//      for (var i = 0; i < response.length; i + 8){
//      fiveDay.append("<div>");
//         var weather = $("<h3>");
//         weather.text(response.list.main[0].temp);
//         $("#fiveDay").append(weather);   
//      }
    
// });
//  }
 
// //Current weather
// function getCurrent(cityDisplay) {
// var cityDisplay = $("#city-display");
// var city = $("#user-input").val();    
// var apiKey = "463f975999cf525570e7695cc31f504d";
// var queryURLcurrent = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

// $.ajax({
//     url: queryURLcurrent, 
//     method: "GET",
// }).then(function(response){
//     console.log(response);

// $("#display-name").text(response.name);
// $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");

// });
// }

// var city = $("#user-input").val();    
// var apiKey = "463f975999cf525570e7695cc31f504d";
// var queryURLcurrent = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

// $.ajax({
//     url: queryURLcurrent, 
//     method: "GET",
// }).then(function(response){
//     //console.log(response);
//     $("#temp").text("Temperture" + response.list.main.temp);
//     $("#humidity").text("Humidity" + response.list.main.humidity);
//     $("#wind-speed").text("Wind Speed" + response.list.main.wind.speed);

// });

//   $("#searchBtn").on("click", function(){
// //    //getWeather(city);
//     city = $("#user-input").val();
// //    // getCurrent(cityDisplay);
//     console.log(city);
//      console.log(cityDisplay);
//     localStorage.getItem(city);
//     //currentWeather(city);
   
//      //localStorage.setItem("search", JSON.stringify("search-form"));
//      //getCities();
     
//  })



// });