// ----------------------------------------------------------------------------------------------------------EmailJS functions
// ------------------------------------------------Report a Bug
function sendMail(reportBugForm) {
    emailjs.send("gmail","fc-index-report-a-bug", {
        "name": reportBugForm.name.value,
        "email": reportBugForm.email.value,
        "error_type": errorType(reportBugForm.reportBugErrorType.value),
        "club_name": clubName(reportBugForm.clubName.value),
        "bug_details": reportBugForm.bugDescription.value
    })
    .then(document.getElementById("report-bug-modal-content").classList.add("hide"))
    .then(document.getElementById("report-loading").classList.remove("hide"))
    .then(
        function(response) {
            document.getElementById("report-bug-form").reset();
            document.getElementById("report-loading").classList.add("hide");
            document.getElementById("report-bug-success").classList.remove("hide");
        },
        function(error) {
            document.getElementById("report-loading").classList.add("hide");
            document.getElementById("report-bug-failure").classList.remove("hide");
        }
    );    
    return false;    
}