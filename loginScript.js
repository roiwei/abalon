
 
firebase.auth().onAuthStateChanged(function(user) {
	var firebaseConfig = {
    apiKey: "AIzaSyDYFvTJAzB5PWCcVLqJz-ImVcLU8r1uj7Q",
    authDomain: "abalonfb1.firebaseapp.com",
    databaseURL: "https://abalonfb1.firebaseio.com",
    projectId: "abalonfb1",
    storageBucket: "abalonfb1.appspot.com",
    messagingSenderId: "296930691996",
    appId: "1:296930691996:web:3935ed42de1b94e5a19659",
    measurementId: "G-D71N1EYXSV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
	
	
  if (user) {
    // User is signed in.
	
	document.getElementById("user_div").style.display= "block";
	document.getElementById("lodin_div").style.display= "none";
  } else {
    // No user is signed in.
	
	document.getElementById("user_div").style.display= "none";
	document.getElementById("lodin_div").style.display= "block";
  }
});



function login(){
	
	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	
	firebase.auth().signInWithEmailAndPassword(uswrEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : "+ errorMessage);
  // ...
});
	
}
