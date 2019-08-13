

    // Initialize Firebase App
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
    console.log("click work")
    frequency=$("#Frequency").val().trim();
    trainName = $("#train-name").val().trim();
    destination=$("#destination").val().trim();
     firstTrainTime=$("#firstTrain-time").val().trim();
    frequency=$("#Frequency").val().trim();


 //push to firebase
   database.ref().push({
        trainName:trainName,
        destination:destination,
        firstTrainTime:firstTrainTime,
        frequance:frequency,
          
    });  
//clear form 
    $("#Frequency").val("");
    $("#train-name").val("");
    $("#destination").val("");
    $("#firstTrain-time").val("");
    $("#Frequency").val(" ");
    
});

database.ref().on("child_added", function(childSnapshot){

    var tfrequance = childSnapshot.val(). frequance;
    var trainName = childSnapshot.val().trainName;
    var firstTrainTime=childSnapshot.val().firstTrainTime;
    var destination=childSnapshot.val().destination;

    var timeRemainder =( moment().diff(moment(firstTrainTime,"HH:mm"), "m")) % tfrequance ;

    var tminutes= tfrequance - timeRemainder;

    console.log(timeRemainder+"timeremainder");

    var nextArrival = moment().add(tminutes, "minutes").format('hh:mm'); 
       
    $("#td-add").append("<tr><td>"+trainName +"<td>"+destination +"<td>"+tfrequance+"<td>"+nextArrival+"<td>"+tminutes+"</td></tr>");

});

  //Clock display function 
function showTime(){
    var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    var s = date.getSeconds(); 
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
