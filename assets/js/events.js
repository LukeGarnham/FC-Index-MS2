// ----------------------------------------------------------------------------------------------------------Event listeners for key input
// ------------------------------------------------Club Search
// This will display a warning message on screen if the user types a string less than 3 characters.
// Searching for a string of less than 3 characters will not work as per if statement in footballAPI.js
document.getElementById("club-search").addEventListener("keyup", function() {
    let searchString = document.getElementById("club-search").value;
    // The search string is passed to the searchStringCheck function to remove any trailing spaces.
    if (searchStringCheck(searchString).length > 0 && searchStringCheck(searchString).length < 3) {
        document.getElementById("search-string-message").innerHTML = "Your search string must be at least 3 characters long.";
    // The below checks the search string for any non-alphanumeric characters and warns the user if they have.
    // The solution for this check was sourced from: https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
    //  Searching for a string containing any non-alphanumeric characters will not work as per if statement in footballAPI.js
    } else if (/[^a-zA-Z0-9 ]/.test(searchString)) {
        document.getElementById("search-string-message").innerHTML = "Your search string must only contain letters or numbers.";
    } else {
        document.getElementById("search-string-message").innerHTML = "";
    }
});

// ----------------------------------------------------------------------------------------------------------Event listeners for clicks
// ------------------------------------------------Club Search

// Searches when user clicks search button
document.getElementById("club-search-button").addEventListener("click", function() {
    // Get the search string from the search input box
    let input = document.getElementById("club-search").value;
    // Pass the input into the searchStringCheck to remove any trailing spaces from the search string.
    input = searchStringCheck(input);
    // Pass the input string into the clubSearch function to call the API.
    clubSearch(input);
});

// Searches when user presses Enter
document.getElementById("club-search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Get the search string from the search input box
    let input = document.getElementById("club-search").value;
    // Pass the input into the searchStringCheck to remove any trailing spaces from the search string.
    input = searchStringCheck(input);
    // Pass the input string into the clubSearch function to call the API.
    clubSearch(input);
});

// ------------------------------------------------New Search Button
// In the club info section, this button will hide the search results and club info sections and clear the previous search value allowing them to perform another search.
document.getElementById("new-search-button").addEventListener("click", function returnToResults() {
    document.getElementById("search-results").classList.add("hide");
    document.getElementById("club-info").classList.add("hide");
    document.getElementById("club-search").value=null;
});

// ------------------------------------------------Return to Search Results Button
// In the club info section, this button will hide the club info section and unhide the search results section.
document.getElementById("view-results-button").addEventListener("click", function returnToResults() {
    document.getElementById("club-info").classList.add("hide");
    document.getElementById("search-results").classList.remove("hide");
});

// ------------------------------------------------Pagination Button - Next Results
// In the search results section, if there are another 10 results, add a next button.
// To do this, we increase the index i in the local storage and call the resultsOutput function
document.getElementById("next-results-button").addEventListener("click", function () {
    let i = parseInt(localStorage.getItem("i"));
    i = i + 10;
    localStorage.setItem("i", i);
    resultsOutput();
});

// ------------------------------------------------Pagination Button - Previous Results
// In the search results section, if there are 10 previous results, add a previous button.
// To do this, we decrease the index i in the local storage and call the resultsOutput function
document.getElementById("previous-results-button").addEventListener("click", function () {
    let i = parseInt(localStorage.getItem("i"));
    i = i - 10;
    localStorage.setItem("i", i);
    resultsOutput();
});

// ------------------------------------------------Report Bug Button in footer
// This button in the footer will launch the Report a Bug modal
document.getElementById("report-bug-button").addEventListener("click", function getElement() {
    document.getElementById("report-bug-modal").classList.remove("hide");
});

// ------------------------------------------------Report Bug Button - Modal
// This button on the modal will submit the form using EmailJS.  See the emailJS.js file for details.
document.getElementById("report-bug-form").addEventListener("submit", function(event) {
    event.preventDefault();
    sendMail(this);
});

// ------------------------------------------------Close Modal
// This button is in the top right of the modal.  The function will prevent the button default and call the close modal function.
document.getElementById("close-modal-icon").addEventListener("click", function(event) {
    event.preventDefault();
    closeModal();
});

// This button is in the bottom right of the modal.  The function will prevent the button default and call the close modal function.
document.getElementById("close-modal-button").addEventListener("click", function(event) {
    event.preventDefault();
    closeModal();
});

// This function closes the modal window.  It ensures that the content visible in the modal returns to default.
// It hides the report bug success content and unhides the report bug modal (form) content.
// Finally it hides the modal windown entirely.
function closeModal() {
    document.getElementById("report-bug-success").classList.add("hide");
    document.getElementById("report-bug-failure").classList.add("hide");
    document.getElementById("report-bug-modal-content").classList.remove("hide");
    document.getElementById("report-bug-modal").classList.add("hide");
}

// ------------------------------------------------Error Type - Modal
document.getElementById("reportBugErrorType").addEventListener("change", function() {
    let formValue = document.getElementById("reportBugErrorType").value;
    if (formValue === "club_data_error") {
        document.getElementById("report-bug-club-name").classList.remove("hide");
        document.getElementById("form-clubName").required=true;
    } else {
        document.getElementById("report-bug-club-name").classList.add("hide");
        document.getElementById("form-clubName").required=false;
    }
});

// ------------------------------------------------Report a Bug Success Button
// If the Report Bug is successful, a pop-up will notify the user.  This button calls the close modal function.
document.getElementById("report-bug-success").addEventListener("click",  function() {
    closeModal();
});

// ------------------------------------------------Report a Bug Failure Button
// If the Report Bug is unsuccessful, a pop-up will notify the user.  This button returns the user to the Report a Bug form modal.
document.getElementById("report-bug-failure").addEventListener("click",  function() {
    document.getElementById("report-bug-failure").classList.add("hide");
    document.getElementById("report-bug-modal-content").classList.remove("hide");
});

