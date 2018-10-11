

// Initialize Firebase
var config = {
  apiKey: "AIzaSyATx8HMtlq87sMcNMw555UlT28SmA5GxFk",
  authDomain: "train-sched-d70ff.firebaseapp.com",
  databaseURL: "https://train-sched-d70ff.firebaseio.com",
  projectId: "train-sched-d70ff",
  storageBucket: "",
  messagingSenderId: "365520654370"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trndDestination = $("#destination-input").val().trim();
  var trnFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trnFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trnName,
    destination: trndDestination,
    firstTrain: trnFirst,
    frequency: trnFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trndDestination = childSnapshot.val().role;
  var trnFirst = childSnapshot.val().start;
  var trnFreq = childSnapshot.val().rate;

  // Employee Info
  console.log(trnName);
  console.log(trndDestination);
  console.log(trnFirst);
  console.log(trnFreq);

  // Prettify the employee start
  var trnStartPretty = moment.unix(trnStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trnMonths = moment().diff(moment(trnStart, "X"), "months");
  console.log(trnMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(trnStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
