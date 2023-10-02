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
var searchCounter = 0;



// Add a click event listener to the search button
searchBtn.on("click", function () {
    // Get the user's search input
    var citySearch = userInput.val();

    // Generate a unique key for this search
    var searchKey = "search_" + searchCounter;

    // Save the search data to local storage with the unique key
    localStorage.setItem(searchKey, citySearch);


    searchCounter++;

    console.log("user input", citySearch);
    console.log("Saved with key", searchKey);

    convertToCoord(citySearch);

});

function renderLastCity() {
    // Clear the existing search history if any
    $("#search-hist").empty();

    // Iterate through local storage to retrieve search data
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        // Check if the key starts with "search_" to filter search data
        if (key.startsWith("search_")) {
            // Create a button to display the search
            var listItem = $("<button>").text(value);
            listItem.addClass("city-history");

            //after you click on the button, it will display that city's weather
            (function (cityName) {
                listItem.on("click", function () {
                    convertToCoord(cityName);
                });
            })(value);

            // Append the button to the search history
            $("#search-hist").append(listItem);
        }
    }
}




// putting it all together, fetching the data from the weather api
var convertToCoord = function (city) {
    console.log("parameter", city)
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=4b6fcde070c0b9b25bca1edc64948080";

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

                // getting handles on data I need from api
                var condition = data.list[0].weather[0].description;
                var icon = data.list[0].weather[0].icon;
                var humid = data.list[0].main.humidity;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;
                var cityName = data.city.name;

                // adding html content for current weather card
                tempElMain.html("Temperature: ", temp, "°F");
                humidityElMain.html("Humidity: ", humid, "%");
                windElMain.html("Wind Speed: ", wind, "mph");


                $(cityNameEl).html(cityName);
                $(descriptionMain).html(condition);

                var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                iconMain.attr("src", iconUrl);

                var today = dayjs();

                // Display the current date
                $('#todays-date').text(today.format('dddd, MMMM D YYYY'));

                // Display the dates for the next 5 days
                for (var i = 1; i <= 5; i++) {
                    var nextDay = today.add(i, 'day');
                    //gets a handle on the future-date id tags
                    var dateElementId = '#future-date-' + i;

                    // Display the formatted date in each of the cards
                    $(dateElementId).text(nextDay.format('dddd, MMMM D YYYY'));
                }
                // loops through the list array from the api and chooses next 5
                // days from list
                for (var i = 7; i < 36; i += 7) {

                    var iconId = "#future-icon-" + (i / 7);
                    var tempId = "#future-temp-" + (i / 7);
                    var humidId = "#future-humid-" + (i / 7);
                    var windId = "#future-wind-" + (i / 7);
                    var conditionId = "#future-condition-" + (i / 7);

                    // Get the data for this iteration
                    var conditionFuture = data.list[i].weather[0].description;
                    var iconFuture = data.list[i].weather[0].icon;
                    var humidFuture = data.list[i].main.humidity;
                    var tempFuture = data.list[i].main.temp;
                    var windFuture = data.list[i].wind.speed;


                    // Update the HTML elements with the data

                    $(conditionId).text(conditionFuture);

                    var futureIconUrl = "https://openweathermap.org/img/wn/" + iconFuture + "@2x.png";
                    $(iconId).attr("src", futureIconUrl);
                    $(tempId).text("temp: " + tempFuture + "°F");
                    $(humidId).text("humidity: " + humidFuture + "%");
                    $(windId).text("wind speed: " + windFuture + "mph");

                    $("#page-container").css("display", "block")
                    renderLastCity();

                }

            }



            )
        }
    })


}