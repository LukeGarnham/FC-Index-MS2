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
// Used the solution on this website to help build the two functions below: https://masteringjs.io/tutorials/fundamentals/capitalize-first-letter#:~:text=Capitalizing%20the%20first%20letter%20of,the%20string%20slice()%20method.&text=The%20first%20part%20converts%20the,the%20rest%20of%20the%20string.

function errorType(errorString) {
    errorString = errorString.replace(/_/g, " ");
    capatilisedString = errorString.split(" ").map(capitalizeFirstLetter).join(" ");
    return capatilisedString;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}