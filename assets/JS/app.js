

    // Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCG0ki5t2lWD58geujSLRXMnzwtBSWWhdw",
    authDomain: "amen-8dc1b.firebaseapp.com",
    databaseURL: "https://amen-8dc1b.firebaseio.com",
    projectId: "amen-8dc1b",
    storageBucket: "",
    messagingSenderId: "980426164534",
    appId: "1:980426164534:web:de92cb84178981b6"
  };
  
  firebase.initializeApp(firebaseConfig);
//Capture a variable to reference the database.
var database=firebase.database();
 var trainName="";
 var destination="";
 var firstTrain="";
 var frequency=0;

//Capture button click
$("#add-train").on("click",function(event){
event.preventDefault();

    frequency=$("#Frequency").val().trim();
    trainName = $("#train-name").val().trim();
    destination=$("#destination").val().trim();
     firstTrainTime=$("#firstTrain-time").val().trim();
    frequency=$("#Frequency").val().trim();

    var timeConverted=moment(firstTrainTime,"HH:mm").subtract(1,"years");
    console.log(timeConverted)
    var diffTime = moment().diff(timeConverted, "m");
    console.log(diffTime)
    var timeRemainder =diffTime % frequency ;
    var tminutes= frequency - timeRemainder;
    console.log(timeRemainder+"timeremainder");
    var nextArriva = moment().add(tminutes, "m").format("hh:mm"); 

   database.ref().push(
    {
        trainName:trainName,
        destination:destination,
        firstTrainTime:firstTrainTime,
        frequance:frequency,
        nextArriva:nextArriva,
        minitsAway:tminutes,  
        
    });  
     
    $("form")[0].reset();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

});



       
database.ref().on("child_added", function(childSnapshot) {
    $("#td-add").append("<tr><td>"+childSnapshot.val().trainName
    +"<td>"+childSnapshot.val().destination
    +"<td>"+childSnapshot.val().frequance
    +"<td>"+childSnapshot.val().nextArriva
    +"<td>"+childSnapshot.val().minitsAway+"</td></tr>");
});


function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
   
}
 
showTime();