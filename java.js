var config = {
    apiKey: "AIzaSyA2YOjeSN-xM_Y-Yu-U2mApSbO83cmRRMU",
    authDomain: "project-dd3be.firebaseapp.com",
    databaseURL: "https://project-dd3be.firebaseio.com",
    projectId: "project-dd3be",
    storageBucket: "project-dd3be.appspot.com",
    messagingSenderId: "805867762408"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName ="";
var destination = "";
var firstTrainTime = "";
var frequency = "";

var minutesAway = "";


$("#submit-button").on("click", function(event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});
    
    database.ref().on("child_added", function(snapshot) {
        
        var sv = snapshot.val();
  
        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.firstTrainTime);
        console.log(sv.frequency);
        
        // console.log(moment().format("DD/MM/YY hh:mm A"));
    
        var firstTimeConverted = moment(snapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        var tFrequency = parseInt(sv.frequency);
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var minutesAway = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minutesAway);

         // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        var nextArival = moment(nextTrain).format('LT');
        var tr = $('<tr>')
        .append($('<td>'+sv.trainName+'</td>'))
        .append($('<td>'+sv.destination+'</td>'))
        .append($('<td>'+sv.frequency+'</td>'))
        .append($('<td>'+nextArival+'</td>'))
        .append($('<td>'+minutesAway+'</td>'))
        $('tbody').append(tr); 
    },function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });