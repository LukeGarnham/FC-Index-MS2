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
    .then(
        function(response) {
            console.log("Success", response);
            document.getElementById("report-bug-modal-content").classList.add("hide");
            document.getElementById("report-bug-success").classList.remove("hide");
        },
        function(error) {
            console.log("Failed", error);
        }
    );    
    return false;    
};