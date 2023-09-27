var searchBtn = $("#search-btn");
var searchHistory= $("#search-hist");
var userInput = $("#search-bar");



searchBtn.on("click", searchCity);

function searchCity() {
    var citySearch = userInput.val();
    console.log("user input", citySearch);
    localStorage.setItem("city", citySearch);
    // need to figure out how to save multiple searches
    // under different key terms
    convertToCoord(citySearch);
    
}

function renderLastCity() {
    // need to create a list item
    // append it to the ul("#city-list")
    // get from local storageoko
    // inner HTML is local storage city value

}

//TODO need to pull in a weather API to access 
// weather from different cities

var convertToCoord = function (city) {
    console.log("parameter", city)
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=4b6fcde070c0b9b25bca1edc64948080";

    fetch(apiUrl).then(function(result) {
        if (result.ok) {
            result.json().then(function(data) {
                console.log('data', data)
                var searchLat = data[0].lat;
                var searchLon = data[0].lon;
                console.log(searchLat);
                getWeather(searchLat, searchLon);
            });
        }
    })
}
    


var getWeather = function(latitude, longitude) {
    console.log(latitude, longitude);
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude+"&lon="+ longitude +"&appid=4b6fcde070c0b9b25bca1edc64948080";

    fetch(apiUrl).then(function(result) {
        if (result.ok) {
            result.json().then(function(data) {
                console.log("data", data);
                var humidity =  data.list[0].main.humidity;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;

                console.log("wind speed", data.list[0].wind.speed);
            })
        }
    })

}