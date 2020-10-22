document.getElementById("report-bug-button").addEventListener("mouseover", function getElement() {
    let el = document.getElementById("report-bug-button");
    buttonHoverOn(el);
});

document.getElementById("report-bug-button").addEventListener("mouseout", function getElement() {
    let el = document.getElementById("report-bug-button");
    buttonHoverOff(el);
});

function buttonHoverOn(button) {
    button.classList.remove("grey");
    button.classList.add("blue");
}

function buttonHoverOff(button) {
    button.classList.remove("blue");
    button.classList.add("grey");   
}
