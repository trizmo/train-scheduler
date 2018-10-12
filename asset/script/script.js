

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
  var trnFirst = moment($("#first-input").val().trim(), "HHmm");
  var trnFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trnName,
    destination: trndDestination,
    firstTrain: trnFirst,
    frequency: trnFreq
  };

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);



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
  var trndDestination = childSnapshot.val().destination;
  var trnFirst = childSnapshot.val().firstTrain;
  var trnFreq = childSnapshot.val().frequency;

  var formatMil = moment(trnFirst, "HHmm").format("hh:mm a")

  var timeNow = moment();
  console.log("time now: " + timeNow.format("hh:mm a"));

  var toNow = moment(formatMil).toNow();

  // Employee Info
  console.log(trnName);
  console.log(trndDestination);
  console.log(formatMil);
  console.log(toNow);
  console.log(trnFreq);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trnName),
    $("<td>").text(trndDestination),
    $("<td>").text(trnFreq + " minutes"),
    $("<td>").text(toNow),
    $("<td>").text(trnFreq),
    $("<td>").text(trnFreq)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
