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
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://rapidapi.p.rapidapi.com/v2/teams/search/real_m");
xhr.setRequestHeader("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "03db490835mshd5eaf0436ca3429p1687b6jsnf4663d1db28c");

xhr.send(data);

