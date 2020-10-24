// ----------------------------------------------------------------------------------------------------------Event listeners for hover on/off styling elements
// ------------------------------------------------Results table rows

// Utilised the solution provided here to write this listener:  https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
function tableRowEffect () {
    document.querySelectorAll(".club-list").forEach(item => {
        item.addEventListener("mouseover", event => {
            item.classList.add("shadow-effect", "highlight-table-row");
        });
        item.addEventListener("mouseout", event => {
            item.classList.remove("shadow-effect", "highlight-table-row");
        });
    });
};

// ------------------------------------------------Buttons

document.querySelectorAll(".button-border").forEach(item => {
    item.addEventListener("mouseover", event => {
        item.classList.add("shadow-effect");
    });
    item.addEventListener("mouseout", event => {
        item.classList.remove("shadow-effect");
    });
});

// ----------------------------------------------------------------------------------------------------------Event listeners for events
// ------------------------------------------------Club Search

// Search when user clicks search button
document.getElementById("club-search-button").addEventListener("click", function() {
    // Get the search string from the search input box
    let input = document.getElementById("club-search").value;
    // Search for club and call the API via the clubSearch function
    clubSearch(input);
});

// Search when user presses Enter
document.getElementById("form-test").addEventListener("submit", function(event) {
    event.preventDefault();
    // Get the search string from the search input box
    let input = document.getElementById("club-search").value;
    // Search for club and call the API via the clubSearch function
    clubSearch(input);
});

// ------------------------------------------------New Search Button

document.getElementById("new-search-button").addEventListener("click", function returnToResults() {
    document.getElementById("search-results").classList.add("hide");
    document.getElementById("club-info").classList.add("hide");
    document.getElementById("club-search").value=null;
});

// ------------------------------------------------Return to Search Results Button

document.getElementById("view-results-button").addEventListener("click", function returnToResults() {
    document.getElementById("club-info").classList.add("hide");
    document.getElementById("search-results").classList.remove("hide");
});

// ------------------------------------------------Report Bug Button in footer
// Change button to grey when clicked
// This will also need to launch modal to email query - TO BE BUILT - once done the button
document.getElementById("report-bug-button").addEventListener("click", function getElement() {
    // let el = document.getElementById("report-bug-button");
    // el.classList.remove("blue");
    // el.classList.add("grey");
});
// ----------------------------------------------------------------------------------------------------------Extract API data
// The below xhr request was orginally copied from the API documentation but then amended for the purposes of this project:
// https://rapidapi.com/api-sports/api/api-football/endpoints

function getAPIData(clubName, cb) {

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://rapidapi.p.rapidapi.com/v2/teams/search/" + clubName);
    xhr.setRequestHeader("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "03db490835mshd5eaf0436ca3429p1687b6jsnf4663d1db28c");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        };
    };
};

// ------------------------------------------------teamSearch (triggered by clicking the club-search-button)
function clubSearch(searchString) {
    if (searchString.length < 4) {
        alert("Your search string must be at least 4 characters long.  Please try again.")
    } else {
        // Replace any spaces with underscores and make string all lower case
        searchString = searchString.replace(/ /g, "_").toLowerCase();
        // Enter the search string into the getAPIData function and create another function to do something with the results.
        getAPIData(searchString, function(apiResults) {
            // Reset the message and results table body to be empty
            document.getElementById("message").innerHTML = "";
            document.getElementById("results-table-body").innerHTML = "";
            // Check if the API results are empty
            if (apiResults.api.results == 0) {
                // If so, display an error message
                document.getElementById("message").innerHTML = "Sorry, no teams found.  Please check the spelling or try searching for a different team.";
                // Hide the results table
                document.getElementById("results-table").classList.add("hide");
            } else {
                // Otherwise display a message and build the results table body
                document.getElementById("message").innerHTML = "Click on one of the clubs below to find out more information:";
                let resultsTableBody = document.getElementById("results-table-body");
                let clubs = apiResults.api.teams;
                // Create a new table row for each club returned by the API.
                for (let i=0; i<clubs.length; i++) {
                    resultsTableBody.innerHTML += `
                        <tr class="club-list">
                            <td class="align-middle">${nullDataCheck(clubs[i].name)}</td>
                            <td class="align-middle">${nullDataCheck(clubs[i].country)}</td>
                            <td class="align-middle"><img src="${clubs[i].logo}" alt="Club badge"></td>
                        </tr>
                    `;
                };
                // Need to create onclick events for all of the club-list table rows
                let clubList = document.getElementsByClassName("club-list");
                // Create a second for loop which iterates over all club-list class names and runs a function on click
                // Solved by referencing the third method explained on this website:  http://www.howtocreate.co.uk/referencedvariables.html            
                for (let i=0; i<clubList.length; i++) {
                    clubList[i].onclick = (function(clubResults) {
                        return function() {
                            // Populate the club-info section
                            document.getElementById("club-logo").innerHTML=`<img src="${clubResults.logo}" aria-label="Club badge.">`;
                            document.getElementById("club-name").innerHTML=`${nullDataCheck(clubResults.name)}`;
                            document.getElementById("club-location").innerHTML=`${clubLocation(clubResults.venue_city, clubResults.country)}`;
                            document.getElementById("club-founded").innerHTML=`${nullDataCheck(clubResults.founded)}`;
                            document.getElementById("club-stadium-name").innerHTML=`${nullDataCheck(clubResults.venue_name)}`;
                            document.getElementById("club-stadium-capacity").innerHTML=`${nullDataCheck(clubResults.venue_capacity)}`;
                            // Hide the search results section and unhide the club-info section
                            document.getElementById("search-results").classList.add("hide");
                            document.getElementById("club-info").classList.remove("hide");
                        };
                    })(clubs[i]);
                };
                tableRowEffect();
                // Unhide the results table
                document.getElementById("results-table").classList.remove("hide");
            };
            // Unhide the search-results section.
            document.getElementById("search-results").classList.remove("hide");
        });
    };
};


// ------------------------------------------------API Data checks
// This function checks if the data returned by the API is null and returns a statement if it is
function nullDataCheck(data) {
    if (data == null) {
        return "Sorry, no data found.";
    } else {
        return data;
    };
};

// This function checks if there is a city value returned in the API.  If so, it adds the country, otherwise just the country is returned
function clubLocation(city, country) {
    if (city == null) {
        return country;
    } else {
        return city + ", " + country;
    };
};