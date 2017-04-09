// "Trains" homework JS
firebase.initializeApp(config);

var database = firebase.database();

// User sign-in button.
$(".signUp").on("click", function() {
    alert("Sign-in function not yet working! Ignore this for now.");
});

$("#add").on("click", function() {
    var Name = $('#Name').val().trim();
    var Destination = $('#destination').val().trim();
    var First = moment($('#First').val().trim(), "HH:mm").format("X");
    var Frequency = $('#frequency').val().trim();
    if (Name != "" && Destination != "" && First != "" && Frequency != "") {
        database.ref().push({
            name: Name,
            dest: Destination,
            first: First,
            freq: Frequency,
        });
        alert("Success - New Train Added");

        // Note to self: If time, add sound effect of train whistle. See for reference http://stackoverflow.com/questions/29992822/having-audio-play-on-click?rq=1
    } else {
        alert("Complete all fields.");
    };

    // Clears all of the text-boxes
    // $("#train-name-input").val("");
    // $("#train-des-input").val("");
    // $("#train-start-input").val("");
    // $("#train-freq-input").val("");

    $('#Name').val("");
    $('#destination').val("");
    $('#First').val("");
    $('#frequency').val("");

    return false;
});

database.ref().on("child_added", function(snapshot) {

    var Name = snapshot.val().name;
    var Destination = snapshot.val().dest;
    var trainFirst = snapshot.val().first;
    var trainFrequency = snapshot.val().freq;
    var currentTime = moment();
    var currentTimeConverted = moment(currentTime).format("X");
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    var firstTimePushed = moment(trainFirst, "X").subtract(1, "years");
    var diffTime = moment(currentTimeConverted, "X").diff(moment(firstTimePushed, "X"), "minutes");
    var trainRem = diffTime % trainFrequency;
    var trainWait = trainFrequency - trainRem;
    var nextTrain = moment().add(trainWait, "minutes");
    if (currentTimeConverted > trainFirst) {
        $("#table > tbody").append("<tr><td>" + Name + "</td><td>" +
            Destination + "</td><td>" +
            trainFrequency + "</td><td>" +
            moment(nextTrain).format("hh:mm A") + "</td><td>" +
            trainWait + "</td></tr>");

    } else {

        $("#table > tbody").append("<tr><td>" + Name + "</td><td>" +
            Destination + "</td><td>" +
            trainFrequency + "</td><td>" +
            moment(trainFirst, "X").format("hh:mm A") + "</td><td>" +
            trainWait + "</td></tr>");
    }
}, function(errorObject) {

    console.log("Errors handled: " + errorObject.code)
})

// Note to self: If time, convert minutes of nextTrain to hours and minutes, if applicable. See for reference https://stackoverflow.com/questions/36035598/how-to-convert-minutes-to-hours-using-moment-js
