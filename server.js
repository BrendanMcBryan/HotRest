// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const uuidv4 = require('uuid/v4');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Reservations (DATA)
// =============================================================
var reservations = [{
    name: "Martin",
    phoneNumber: "610-333-5909",
    email: "martin.akram@gmail.com",
    uniqueID: uuidv4()
  },
  {
    name: "Ryan",
    phoneNumber: "ryan.ward@gmail.com",
    email: "123-456-789",
    uniqueID: uuidv4()
  },
];

var waitlist = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/viewres", function (req, res) {
  res.sendFile(path.join(__dirname, "viewres.html"));
});

app.get("/makeres", function (req, res) {
  res.sendFile(path.join(__dirname, "makeres.html"));
});


// Displays all reservations
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});



// Create New Reservation - takes in JSON input
app.post("/api/reservations", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  console.log(newReservation);
  if (reservations.length < 5) {
    reservations.push(newReservation);
    res.json(newReservation);
  } else {
    waitlist.push(newReservation)
    res.json({
      "message": "Can't accept anymore reservations"
    })
  }
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});