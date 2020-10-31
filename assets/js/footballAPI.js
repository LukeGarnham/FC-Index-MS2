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
                // Otherwise display a message and build the results table body
                document.getElementById("message").innerHTML = "Click on one of the clubs below to find out more information:";
                let resultsTableBody = document.getElementById("results-table-body");
                let clubs = apiResults.api.teams;
                // Create a new table row for each club returned by the API.
                for (let i=0; i<clubs.length; i++) {
                    resultsTableBody.innerHTML += `
                        <tr class="club-list clickable-row">
                            <td class="align-middle">${nullDataCheck(clubs[i].name)}</td>
                            <td class="align-middle">${nullDataCheck(clubs[i].country)}</td>
                            <td class="align-middle"><img class="small-img" src="${clubs[i].logo}" alt="Club badge"></td>
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
                // Unhide the results table
                document.getElementById("results-table").classList.remove("hide");
            };
            // Unhide the search-results section.
            document.getElementById("search-results").classList.remove("hide");
        });
    };
};