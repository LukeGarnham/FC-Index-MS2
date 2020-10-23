// ----------------------------------------------------------------------------------------------------------Event listeners for buttons
// ------------------------------------------------Club Search Button
// Add shadow effect on mouse over
document.getElementById("club-search-button").addEventListener("mouseover", function getElement() {
    let el = document.getElementById("club-search-button");
    addShadow(el);
});

// Add shadow effect on mouse off
document.getElementById("club-search-button").addEventListener("mouseout", function getElement() {
    let el = document.getElementById("club-search-button");
    removeShadow(el);
});

// Search for club and call the API via the teamSearch function
document.getElementById("club-search-button").addEventListener("click", clubSearch);

// ------------------------------------------------Report Bug Button in footer
// Add shadow effect on mouse over
document.getElementById("report-bug-button").addEventListener("mouseover", function getElement() {
    let el = document.getElementById("report-bug-button");
    addShadow(el);
});

// Add shadow effect on mouse off
document.getElementById("report-bug-button").addEventListener("mouseout", function getElement() {
    let el = document.getElementById("report-bug-button");
    removeShadow(el);
});

// Change button to grey when clicked
// This will also need to launch modal to email query - TO BE BUILT - once done the button will return to blue
document.getElementById("report-bug-button").addEventListener("click", function getElement() {
    let el = document.getElementById("report-bug-button");
    el.classList.remove("blue");
    el.classList.add("grey");
});

function addShadow(button) {
    button.classList.add("shadow-effect");
};

function removeShadow(button) {
    button.classList.remove("shadow-effect");
};




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
function clubSearch() {
    // Get the search string from the search input box
    let searchString = document.getElementById("club-search").value;
    // Replace any spaces with underscores and make string all lower case
    searchString = searchString.replace(/ /g, "_").toLowerCase();
    // Enter the search string into the getAPIData function and create another function to do something with the results.
    getAPIData(searchString, function(apiResults) {
        // Reset the error message and results table body to be empty

        document.getElementById("error-message").innerHTML = "";
        document.getElementById("results-table-body").innerHTML = "";

        // Check if the API results are empty
        if (apiResults.api.results == 0) {
            // If so, display an error message
            document.getElementById("error-message").innerHTML = "Sorry, no teams found.  Please check the spelling or try searching for a different team.";
            // Hide the results table and unhide the error message
            document.getElementById("error-message").classList.remove("hide");
            document.getElementById("results-table").classList.add("hide");
        } else {
            // Otherwise build the results table body
            let resultsTableBody = document.getElementById("results-table-body");
            let clubs = apiResults.api.teams;
            // Create a new table row for each club returned by the API.
            for (i=0; i<clubs.length; i++) {
                resultsTableBody.innerHTML += `
                    <tr>
                        <td class="align-middle">${nullDataCheck(clubs[i].name)}</td>
                        <td class="align-middle">${nullDataCheck(clubs[i].country)}</td>
                        <td class="align-middle"><img src="${clubs[i].logo}" alt="Club badge"></td>
                    </tr>
                `;
            };

            // Hide the error message and unhide the results table
            document.getElementById("error-message").classList.add("hide");
            document.getElementById("results-table").classList.remove("hide");
        };

        // Unhide the search-results section.
        document.getElementById("search-results").classList.remove("hide");
    });
};

// This function checks if the data returned by the API is null and returns a statement if it is
function nullDataCheck(data) {
    if (data == null) {
        return "Sorry, no data found.";
    } else {
        return data;
    };
};