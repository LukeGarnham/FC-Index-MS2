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
        }
    };
}

// ------------------------------------------------teamSearch (triggered by clicking the club-search-button)
function clubSearch(searchString) {
    if (searchString.length < 4) {
        
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
                // Hide the club info section
                document.getElementById("club-info").classList.add("hide");
            } else {
                // Otherwise set the api results to variable "clubs"
                let clubs = apiResults.api.teams;
                // Store the API results in the local storage so we can access them from other functions.
                localStorage.setItem("clubs", JSON.stringify(clubs));
                // Reset and store the API position index i to 0
                localStorage.setItem("i", 0);
                //  Display a message informing users that the search results can be clicked.
                document.getElementById("message").innerHTML = "Click on one of the clubs below to find out more information:";
                // Call the resultsOutput function which builds the output to screen.
                resultsOutput();
                // Unhide the results table
                document.getElementById("results-table").classList.remove("hide");
            }
            // Unhide the search-results section.
            document.getElementById("search-results").classList.remove("hide");
        });
    }
}


// Create a new table row for each club returned by the API.
function resultsOutput() {
    // Assign the table body to a variable and clear any existing data.
    let resultsTableBody = document.getElementById("results-table-body");
    resultsTableBody.innerHTML = "";
    // Retrieve the results of the API  and position index from the local storage.
    let clubs = JSON.parse(localStorage.getItem("clubs"));
    let i = parseInt(localStorage.getItem("i"));
    // Set an upper limit for the number of results we want to display on screen.
    // Call the findLimit function.
    // If the remaining number of clubs is less than 10 more, the upper limit needs to be the remainder.
    let upperLimit = findLimit(i, clubs);
    // Build the results table body
    for (i; i<upperLimit; i++) {
        resultsTableBody.innerHTML += `
            <tr class="club-list clickable-row">
                <td class="align-middle">${nullDataCheck(clubs[i].name)}</td>
                <td class="align-middle">${nullDataCheck(clubs[i].country)}</td>
                <td class="align-middle"><img class="small-img" src="${clubs[i].logo}" alt="Club badge"></td>
            </tr>
        `;
    }
    // Reset i back to the local storage value.
    i = parseInt(localStorage.getItem("i"));

    // If there is an array element 10 more than the current position, we need to allow the user to click to the next 10 by unhiding the Next button.
    if (clubs[(i+10)]) {
        document.getElementById("next-results-button").classList.remove("hide");
    } else {
        document.getElementById("next-results-button").classList.add("hide");
    }
    // If there is an array element 10 before the current position, we need to allow the user to click to the previous 10 by unhiding the Previous button.
    if (clubs[(i-10)]) {
        document.getElementById("previous-results-button").classList.remove("hide");
    } else {
        document.getElementById("previous-results-button").classList.add("hide");
    }
    // Call the resultsLinks function which creates the output in the club information section.
    // This is to create links on each table row but they must line up with the correct data in the clubs array.
    resultsLinks(clubs, i);
}

// If the remaining number of clubs is less than 10 more, the upper limit needs to be the remainder.
function findLimit(i, clubs) {
    if (i+10>clubs.length) {
        return clubs.length;
    } else {
        return i + 10;
    }
}


// Create a function which adds link to every table array and passes the array information through
function resultsLinks(clubs, index) {
    // Need to create onclick events for all of the club-list table rows
    let clubList = document.getElementsByClassName("club-list");
    // Create a second for loop which iterates over all club-list class names and runs a function on click
    // Solved by referencing the third method explained on this website:  http://www.howtocreate.co.uk/referencedvariables.html
    for (let i=0; i<clubList.length; i++, index++) {
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
                // Call the clubLocationSearch() function to pass club data to Maps.  This function is in dataValidation.js.
                clubLocationSearch(clubResults);
            };
        })(clubs[index]);
    }    
}