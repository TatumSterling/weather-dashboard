var searchBtn = $("#search-btn");
var searchHistory= $("#search-hist");



searchBtn.on("click", searchCity);

function searchCity() {
    var userInput = $("#search-bar").val();
    localStorage.setItem("city", userInput);
    // need to figure out how to save multiple searches
    // under different key terms
}

function renderLastCity() {
    // need to create a list item
    // append it to the ul("#city-list")
    // get from local storage
    // inner HTML is local storage city value

}

//TODO need to pull in a weather API to access 
// weather from different cities