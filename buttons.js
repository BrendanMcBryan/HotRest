// Question: What does this code do?
$("#add-btn").on("click", function (event) {
    event.preventDefault();
    let newReservation = {
        name: $("#name")
            .val()
            .trim(),
        phoneNumber: $("#phone")
            .val()
            .trim(),
        email: $("#email")
            .val()
            .trim(),
        uniqueID: $("#UniqueID")
            .val()
            .trim()
    };​
    $.post("/api/reservations", newReservation).then(function (data) {
        console.log("makeres.html", data);
        alert("Adding reservation...");
    });
});