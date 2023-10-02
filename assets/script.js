var searchBtn = $("#search-btn");
var searchHistory = $("#search-hist");
var userInput = $("#search-bar");
var cityNameEl = $("#current-city");
var today = $("#todays-date");
var twhMain = $("#temp-wind-humid");
var descriptionMain = $("#description");
var iconMain = $("#icon");
var futureForecastEL = $("#future-container");
var tempElMain = $("#temperature");
var humidityElMain = $("#humidity");
var windElMain = $("#wind-speed");




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



var convertToCoord = function (city) {
    console.log("parameter", city)
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=4b6fcde070c0b9b25bca1edc64948080";

    fetch(apiUrl).then(function (result) {
        if (result.ok) {
            result.json().then(function (data) {
                console.log('data', data)
                var searchLat = data[0].lat;
                var searchLon = data[0].lon;
                console.log(searchLat);
                getWeather(searchLat, searchLon);
            });
        }
    })
}



var getWeather = function (latitude, longitude) {
    console.log(latitude, longitude);
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=4b6fcde070c0b9b25bca1edc64948080&units=imperial";

    fetch(apiUrl).then(function (result) {
        if (result.ok) {
            result.json().then(function (data) {
                console.log("data", data);

                var condition = data.list[0].weather[0].description;
                var icon = data.list[0].weather[0].icon;
                var humid = data.list[0].main.humidity;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;
                var cityName = data.city.name;


                var weatherList = [
                    ["Temperature: ", temp, "F"],
                    ["Humidity: ", humid, "%"],
                    ["Wind Speed: ", wind, "MPH"]
                ]

                console.log(weatherList);

                tempElMain.html(weatherList[0]);
                humidityElMain.html(weatherList[1]);
                windElMain.html(weatherList[2]);


                $(cityNameEl).html(cityName);
                $(descriptionMain).html(condition);

                var iconUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
                iconMain.attr("src", iconUrl);

                for (var i = 7; i < 36; i += 7) {
                    // Construct the IDs for the HTML elements
                    var dateId = "future-date-" + (i / 7);
                    var iconId = "future-icon-" + (i / 7);
                    var tempId = "future-temp-" + (i / 7);
                    var humidId = "future-humid-" + (i / 7);
                  
                    // Get the data for this iteration
                    var conditionFuture = data.list[i].weather[0].description;
                    var iconFuture = data.list[i].weather[0].icon;
                    var humidFuture = data.list[i].main.humidity;
                    var tempFuture = data.list[i].main.temp;
                    var windFuture = data.list[i].wind.speed;
                  
                    // Update the HTML elements with the data
                    document.getElementById(dateId).textContent = conditionFuture;
                    var futureIconUrl = "https://openweathermap.org/img/wn/"+ iconFuture +"@2x.png"
                    document.getElementById(iconId).setAttribute("src", futureIconUrl);
                    // document.getElementById(iconId).src = iconFuture;
                    document.getElementById(tempId).textContent ="temp: "+ tempFuture, "F";
                    document.getElementById(humidId).textContent ="humidity: "+ humidFuture+ "%";

                // for (var i =7; i<36; i+=7) {
                    
                // var conditionFuture = data.list[i].weather[0].description;
                // var iconFuture = data.list[i].weather[0].icon;
                // var humidFuture = data.list[i].main.humidity;
                // var tempFuture = data.list[i].main.temp;
                // var windFuture = data.list[i].wind.speed;

                // console.log(conditionFuture);




                }

            }



            )
        }
    })

    var today = dayjs();
    $('#todays-date').text(today.format('dddd, MMMM D YYYY'));

}