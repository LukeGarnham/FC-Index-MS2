// ----------------------------------------------------------------------------------------------------------Validate the data returned by the API

// ------------------------------------------------Null Data check
// This function checks if the data returned by the API is null and returns a statement if it is
function nullDataCheck(data) {
    if (data == null) {
        return "Sorry, no data found.";
    } else {
        return data;
    };
};

// ------------------------------------------------Null City Data check
// This function checks if there is a city value returned in the API.  If so, it adds the country, otherwise just the country is returned
function clubLocation(city, country) {
    if (city == null) {
        return country;
    } else {
        return city + ", " + country;
    };
};

// ----------------------------------------------------------------------------------------------------------Validate/clean the data input into the Report a Bug form
// ------------------------------------------------Check if the club name field has data.
function clubName(name) {
    if (name == "") {
        return "Not applicable";
    } else {
        return name;
    };
};

// ------------------------------------------------Tidy the error type input
// Used the solution on this website to help build the below function: https://www.w3resource.com/javascript-exercises/javascript-string-exercise-11.php
function errorType(errorString) {
    return errorString;
}
