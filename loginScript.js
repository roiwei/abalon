firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	
	document.getElementById("user_div").style.display= "block";
	document.getElementById("lodin_div").style.display= "none";
	window.location ='first.html';  
	var user = firebase.auth().currentUser;
	
	if(user != null){
		
		var email_id = user.email;
		
		document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
	}
	  
  } else {
    // No user is signed in.
	
	document.getElementById("user_div").style.display= "none";
	document.getElementById("lodin_div").style.display= "block";
  }
});


var userEmail;
function login(){
	
	userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : "+ errorMessage);
  // ...
});
	
}

function logout(){
	firebase.auth().signOut();
	
}

function create_acc()
{
	var signup_userEmail = document.getElementById("signup_email_field").value;
	var signup_userPass = document.getElementById("signup_password_field").value;	
	
	firebase.auth().createUserWithEmailAndPassword(signup_userEmail,signup_userPass).catch(function(error){
	 // Handle Errors here.
 	 var errorCode = error.code;
	 var errorMessage = error.message;
         window.alert("Error : "+ errorMessage);
	  // ...
	})

}











	
	
