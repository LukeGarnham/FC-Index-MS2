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
        },
        function(error) {
            console.log("Failed", error);
        }
    );    
    closeModal();
    return false;    
};
