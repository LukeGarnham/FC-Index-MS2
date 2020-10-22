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
// This will also need to launch modal to email query - TO BE BUILT
document.getElementById("report-bug-button").addEventListener("click", function getElement() {
    let el = document.getElementById("report-bug-button");
    button.classList.remove("blue");
    button.classList.add("grey");
});

function addShadow(button) {
    button.classList.add("button-shadow");
};

function removeShadow(button) {
    button.classList.remove("button-shadow");
};