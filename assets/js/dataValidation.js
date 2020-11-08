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
    } else if (country == null){
        return city;
    } else {
        return city + ", " + country;
    };
};
// ------------------------------------------------Validate Map Location Data
// Validate and tidy the data that's passed to the createMap function.  If no stadium name and no venue city, don't display the map.
function clubLocationSearch(club) {
    let stadium = club.venue_name;
    let city = club.venue_city;
    let country = club.country;
    if (stadium == null && city == null) {
        // If no stadium name of city provided, don't show the map.
        document.getElementById("club-location-map").classList.add("hide");
    } else {
        // Otherwise, show the map.  Build string containing stadium name (if provided), city and country.
        document.getElementById("club-location-map").classList.remove("hide");
        let clubLocationstring;
        if (stadium !== null) {
            clubLocationstring = stadium + " Stadium, "
        }
        clubLocationstring += clubLocation(city, country);
        console.log(clubLocationstring);
        // Call createMap function and pass in the string we've built above.
        // club array is not used in this function but is passed through to be used in building the marker on the map.
        createMap(clubLocationstring, club);
    }

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