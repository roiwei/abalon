/* src="https://www.gstatic.com/firebasejs/6.3.4/firebase.js"
  // Your web app's Firebase configuration
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
  //firebase.analytics();
*/

var userEmail="";  
//var myDataEmail = document.getElementById('datah1');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
var user = firebase.auth().currentUser;	
console.log("MY USER IS " + user);
document.getElementById('datah1').innerHTML= "Your Email is: "+ user.email;
userEmail=user.email;
    // User is signed in.
  } else {
	  console.log("dont find user");
    // No user is signed in.
  }
});
 
var IDarray = new Array(); 
var nameArray = new Array();
var myRealColor = "";
var myNumColor =-1;
//var tblUsers = document.getElementById('tb1_users_list');
var databaseRef = firebase.database().ref('users/'); 
var rowIndex = 1;
databaseRef.once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
            IDarray[rowIndex]=childKey;  
	    var childData = childSnapshot.val();
	    nameArray[rowIndex]=childData.user_name;
		  console.log(nameArray[rowIndex]);
	    var row = document.getElementById('tb1_users_list').insertRow(rowIndex);
	   // var cellId = row.insertCell(0);
	    var cellName = row.insertCell(0);
            //cellId.appendChild(document.createTextNode(childKey));
	    cellName.appendChild(document.createTextNode(childData.user_name));
	    console.log("rowIndex after refresh is: " + rowIndex);   
	    rowIndex = rowIndex + 1; 
		  
		
	  });
	});
	
var hold=0;	
setInterval(frame, 5000);
 function frame() {
	databaseRef.once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
		   var childKey = childSnapshot.key;	
		   var childData = childSnapshot.val();
	           if(childData.user_Email==userEmail)
			{//chack if rival did anithing
			console.log("get into my user ");
			if(myRivalId=="" || childData.rivai_id=="stop_connecting")
			{myRivalId=childData.rivai_id;console.log("get first time to update my rival ID ");
				if(childData.rivai_id=="stop_connecting")
				{alert('You stop the connection with your rival, choos new one!');
				tempId= childData.user_id;
				firebase.database().ref('users/').child(tempId).update({rivai_id: ""});
				reload_page(); 
				}
			}
			if(myRivalId=="" || myRivalId=="stop_connecting")	
			{match_id.innerHTML= "wait for you to choose player to play with";}
			if(myRivalId!="" && myRivalId!="stop_connecting")
			{	
				//console.log("myRealColor befor if= "+myRealColor);	
			if(myRealColor=="")
			{
			myRealColor=childData.my_color;
				console.log("myRealColor if if= "+myRealColor);
				console.log(document.getElementById('yourColor_id').innerHTML);
			document.getElementById('yourColor_id').innerHTML= "Your color is "+myRealColor+"";
			if(myRealColor=="black"){myNumColor=1;}else{myNumColor=0;}
			}
			var userRef = firebase.database().ref('/users/' + myRivalId);
			console.log("myRivalId is: "+myRivalId);
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
			console.log("userData.user_name= "+userData.user_name);
			if(match_id.innerHTML!= "You have mach with "+userData.user_name+"! start play:)")
			match_id.innerHTML= "You have mach with "+userData.user_name+"! start play:)";});
				console.log("hold ="+hold);
				console.log("childData.new_game ="+childData.new_game);
				if (childData.new_game=="1")
				{console.log("new game!");
					var tempId=childData.user_id;
					putAllBallFromUser(placesStart);
					firebase.database().ref('users/').child(tempId).update({new_game: "0"});
					firebase.database().ref('users/').child(tempId).update({direction: ""});
					firebase.database().ref('users/').child(tempId).update({row: ""});
					firebase.database().ref('users/').child(tempId).update({column: ""})
				 	firebase.database().ref('users/').child(tempId).update({turn_color: "black"})
				 	reload_page();
					
				}
				else{
					console.log("childData.turn_color ="+childData.turn_color);
					console.log("childData.my_color ="+childData.my_color);
					if(childData.turn_color==childData.my_color)
					{console.log("its my turn");
				   		var dir = childData.direction;
				   		if(dir=="DR")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),0,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="DL")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),0,1);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="UR")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),1,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="UL")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),1,1);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="R")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),2,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="L")
				   		{console.log("its DR!!!!!!!!!!!!!");
						onRivalMove(parseInt(childData.row),parseInt(childData.column),2,1);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
				   
					}
					if (hold == 0)
					{
				         if( (ifNotEqualToStart(stringToArray(childData.placesAray))) && (!(ifNotEqualToStart(stringToArray(places)))) )                           
					  {
					  putAllBallFromUser(stringToArray(childData.placesAray));
					  }
			 	         else
					  {
					  myId=childData.user_id;
					  firebase.database().ref('users/').child(myId).update({placesAray: places.toString()});
					  }
				
					}	
			    }
			}
			}
          });
     });
			
 }


var myRivalId = "";
var myId="";
var rivalRef;
var userData;

function craeteRival(){
	var flag = 0;
	var rival_name = document.getElementById('rival_name').value;
	for(var i = 0; i<nameArray.length; i++){
	    if(rival_name===nameArray[i])
	    {
	    	myRivalId=IDarray[i];
		flag = 1;    
	    }
	}
	if(flag){
		console.log(rival_name + "id: " + myRivalId);
		var userRef = firebase.database().ref('/users/' + myRivalId);
		var myRef = firebase.database().ref('/users/' + myId);
		userRef.once('value').then(function(snapshot) {
		userData = snapshot.val();
	        console.log("THE USER STATAUS IS " + userData.status);

		console.log("the rival name is " + userData.user_name +"and the status is " +userData.status);
		if(userData.status)
			{
			myRivalId = userData.user_id;
			console.log("my rival_id is " + myRivalId);
			
			console.log("userData.rivai_id is " + userData.rivai_id);
			
			console.log("my id is: " + myId);
			firebase.database().ref('users/').child(myId).update({rivai_id: myRivalId});
			firebase.database().ref('users/').child(myRivalId).update({rivai_id: myId});
			firebase.database().ref('users/').child(myRivalId).update({my_color: 'black'});
			match_id.innerHTML= "You have mach with "+userData.user_name+"! start play:)";
			alert('You have mach! start play!');
			}
			else {alert('the user is busy :( try anthr one');}
		
			
		  });
		  }
	else{alert('the name you chose dont existing');}
	
	
}
function initUser(){
	console.log("get into init!!!");
	var flag =0;
	var initrowIndex=rowIndex;
	databaseRef.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    for (var i = 0; i < IDarray.length; i++) 
		{
			if(IDarray[i]===childKey)
			{flag = 1;}
		}
	    if(flag==0)
	    {
	    console.log("rowIndex is: " + initrowIndex);    
	    var row = document.getElementById('tb1_users_list').insertRow(initrowIndex);
	    var cellId = row.insertCell(0);
	    var cellName = row.insertCell(1);
	    var user_name = document.getElementById('user_name').value; 
	    if(childData.user_name === user_name){
            cellId.appendChild(document.createTextNode(childKey));
	    cellName.appendChild(document.createTextNode(childData.user_name));
		    rowIndex = rowIndex+1;
	    }
	    }  
	    
	    //initrowIndex = initrowIndex + 1;
	console.log("rowIndex after if is: " + rowIndex);
		  flag=0;  
		
	  });
	


}	

	
	
function save_user(){
	console.log("get into save_user!!");
	var myRef = firebase.database().ref('/users/' + myId);
	userRef.once('value').then(function(snapshot) {
		userData = snapshot.val();
	    var childKey = userData.key;
	    var childData = userData.val(); 
	    var str = childData.user_name;
		   console.log(str+"lama");
	if(str !== "            "){
		var flag=0;
		var user_name = document.getElementById('user_name').value; 
		console.log(user_name);
		for (var i = 0; i < nameArray.length; i++) 
		{
			if(nameArray[i]===user_name)
			{flag = 1;}
		} 
		if(flag == 0)
		{
		var uid = firebase.database().ref().child('users').push().key;
		myId = uid;
		var data = {
			user_id: uid,
			user_name: user_name,
			user_Email: userEmail,
			status: 1, //1 is avilable, 0 meen he olrady play with somone
			rivai_id: "",
			my_color: 'white',
			turn_color: 'black',
			direction: "",
			row: "",
			column: "",
			new_game: "0",
			placesAray: placesStart.toString()
		}
		var updates = {};
		updates['/users/' + uid] = data;
		firebase.database().ref().update(updates);
	console.log("rowIndex befor init is: " + rowIndex);
		initUser();
		//alert('the user is created successfuliy!');	
		}
		if(flag == 1){
			     alert('the user name allredy exist! please put diferent name');
			     flag=0;
			     }
	reload_page(); 
	}
	  else{alert('you all rady have a name');}
	  });
	});
}
function update_user(){
	var name = document.getElementById('user_name').value; 
	firebase.database().ref('users/').child(myRivalId).update({user_name: name})
	}
function stop_conecting_with_rival(){
	firebase.database().ref('users/').child(myId).update({rivai_id: "stop_connecting"});
	firebase.database().ref('users/').child(myRivalId).update({rivai_id: "stop_connecting"});
	firebase.database().ref('users/').child(myId).update({my_color: 'white'});
	firebase.database().ref('users/').child(myRivalId).update({my_color: 'white'});
	firebase.database().ref('users/').child(myId).update({status: 1});
	firebase.database().ref('users/').child(myRivalId).update({status: 1});
	firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
	firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
	firebase.database().ref('users/').child(myId).update({direction: ""});
	firebase.database().ref('users/').child(myRivalId).update({direction: ""});
	firebase.database().ref('users/').child(myId).update({row: ""});
	firebase.database().ref('users/').child(myRivalId).update({row: ""});
	firebase.database().ref('users/').child(myId).update({column: ""});
	firebase.database().ref('users/').child(myRivalId).update({column: ""});
	firebase.database().ref('users/').child(myId).update({new_game: "0"});
	firebase.database().ref('users/').child(myRivalId).update({new_game: "0"});
	firebase.database().ref('users/').child(myId).update({placesAray: placesStart.toString()});
	firebase.database().ref('users/').child(myRivalId).update({placesAray: placesStart.toString()});
	reload_page();
	
	}
function delete_user(){
		var user_id = document.getElementById('user_id').value; 
		firebase.database().ref().child('/users/' + user_id).remove();
		alert('the user is deleted successfuliy!');
		initUser();
	}
function reload_page(){
		window.location.reload();
	}
	
	
	


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////###############################################################################################################//////////
///////////###############################################################################################################//////////
///////////###############################################################################################################//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function logout(){
	window.location = 'index.html';
	firebase.auth().signOut();
	
}
//var db = firebase.firestore();

function storeData(){
	firebase.database().ref("user").set({
	name: document.getElementById("data_text_field").value,
	age: "18",
	county: "usa"
	})
	.then(function() {
		console.log("document successfull written");
	})
	.catch(function(error){
		console.error("Error writing document: ", error);
	});
	getData();
}

function getData(){
	firebase.database().ref("/").once('value',function(snapshot){
		snapshot.forEach(function(childSnapshot)
		{
		   var childKey = childSnapshot.key;
		   var childData = childSnapshot.val();	
		   //document.getElementById("datah1").innerHTML = childData["name"] + ", "+ childData["age"] 
		})
	})
	
}
function putAllBallFromUser(usrePlaces)
{ 
	for(i=0;i<11;i++)
	    {
		for(j=0;j<11;j++)
		   {
			if(usrePlaces[i][j]!=places[i][j])
			   {
				console.log("i isssssss: "+i+"j isssssss: "+j);
				places[i][j]=usrePlaces[i][j];					
				var BallId= document.getElementById(getIdBall(i,j));//////getIdBall()
				console.log(places);
				console.log("places"+i+" "+j+ "="+ places[i][j]);
				if(usrePlaces[i][j]==0)
				      {BallId.src="empty.png";}
				if(usrePlaces[i][j]==1)
				      {BallId.src="newBlackBall.jpg";}
				if(usrePlaces[i][j]==2)
				      {BallId.src="whiteBall.jpg";}
				
			     }
			}
		}
	
  putAllBallInPlace();
}
function stringToArray(str)
{//console.log("get in stringToArray");
     placeInArray=0;
     var myplaces = new Array(11);
     for (var i = 0; i < myplaces.length; i++) 
     {myplaces[i] = new Array(11);}
     s=str.toString();
     for (i=0; i<11; i++)
	{
	     for (j=0; j<11; j++)
		{//console.log("s[placeInArray]= "+s.charAt(placeInArray)+" placeInArray="+placeInArray);
		    if (s.charAt(placeInArray)=='-')
			  {myplaces[i][j]= -1;//console.log("-1,");
			   placeInArray=placeInArray+3}
		    else if (s.charAt(placeInArray)=='1')
			  {myplaces[i][j]= 1;//console.log("1,");
			   placeInArray=placeInArray+2}
		    else if (s.charAt(placeInArray)=='2')
			  {myplaces[i][j]= 2;//console.log("2,");
			   placeInArray=placeInArray+2}
		    else if (s.charAt(placeInArray)=='0')
			  {myplaces[i][j]= 0;//console.log("0,");
			   placeInArray=placeInArray+2}
		    else {console.log("problem hepned in stringToArray in place:"+placeInArray+"that the char is: "+s[placeInArray]);}
					
		}
		//console.log("next line:");
	}
 //arr=myplaces;
 console.log("myplaces issssssssssssssssssssssssss:");
 console.log(myplaces);
 return myplaces;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function init()
		{
		getData();
		the_h1.innerHTML= "shalom";
		putRealTopAndLeft();
		console.log("realTop="+realTop);
		
		}
		var blackOut=6;
		var whiteOut=6;
		var whiteNum=0;
		var blackNum=0;
		var whiteWin=0;
		var blackWin=0;
		function myMove(row,column,y,x,color) {
			//var id=getIdBall(row,column);
			//var elem = document.getElementById(id); 
			//console.log(elem);
			var posy = getBallTop(row,column);
			var posx = getBallLeft(row,column);
			console.log("posx= "+posx+" posy= "+posy);
			var distance=((x-posx)*(x-posx))+((y-posy)*(y-posy));
			var dx = ((x-posx)/distance)*8;
			var dy = ((y-posy)/distance)*8;console.log("dy="+dy);
			elem=document.getElementById("id_1");
			elem.style.top = posy + "%"; 
			elem.style.left = posx + "%"; 
			if(color==1)
			{
				 blackNum++;
				elem.src="newBlackBall.jpg";
				num=document.getElementById("id_whiteNum");
				var s="number"+blackNum+".jpg";
			}
			else{
				elem.src="whiteBall.jpg";
				whiteNum++;
				console.log("color is "+color);
				num=document.getElementById("id_blackNum");
				var s="number"+whiteNum+".jpg";
				}
			console.log("not get inside "+color);
			setInterval(frame, 5);
			function frame() {
			if (posx > x) {
		    	//elem.src="empty.png";
				//num.src=s;
				//console.log("!!!!!!!!!");
				clearInterval(elem);
				clearInterval(num);
			} else {
			posx=posx+dx;
			posy=posy+dy;
			elem.style.top = posy + "%"; 
			elem.style.left = posx + "%"; 
			if(posx > (x-0.5)) {
		    	elem.src="empty.png";
				num.src=s;
				if(blackNum==6)
				{
					blackWin=1;
					id_ifLigal.innerHTML="BLACK WIN!";
				}
				if(whiteNum==6)
				{
					whiteWin=1;
					id_ifLigal.innerHTML="WHITE WIN!";
				}
			}
		
		  }
		}
		}

		function onBtnName()
		{
			id_namebtn.onclick = oncheckName;
		}
		
		
		function oncheckName()
		{
			if((the_input.value== "roi")||(the_input.value== "Roi"))
			{
				id_name.innerHTML="good name";
			}
			else
			{
				id_name.innerHTML="not good name!!!";
			}
		}
		function sleep(milliseconds)
		{
			var start=new Date().getTime();
			for (var i=0;i<1e7;i++)
			{
				if((new Date().getTime()-start)>milliseconds)
				{
					break;
				}
			}
		}
		function abs(num)
		{
			if(num>0){return num;}
			else{return (num-num-num);}
		}
		var places = new Array(11);
		var placesStart = new Array(11);

		for (var i = 0; i < places.length; i++) 
		{
			places[i] = new Array(11);
			placesStart[i] = new Array(11);
		}
		
		for (var i = 0; i < places.length; i++) 
		{
			for (var j = 0; j < places.length; j++) 
				places[i][j] = 0;
		}	
		
		for (var j = 0; j < places.length; j++) 
				places[0][j] = -1;

		for (var j = 0; j < places.length; j++) 
				places[10][j] = -1;
		
		for (var j = 0; j < places.length; j++) 
				places[j][0] = -1;	
		
		for (var j = 0; j < places.length; j++) 
				places[j][10] = -1;	
		for (var i = 5; i < places.length; i++)
		{
			for (var j =15-i ; j < places.length; j++) 
				places[i][j] = -1;				
		}	
		for (var i = 0; i < 5; i++)
		{
			for (var j = 5+i; j < places.length; j++) 
				places[i][j] = -1;				
		}
		
	    for (var j =1; j < 6; j++) 
				places[1][j] = 1;	

		for (var j =1; j < 7; j++) 
				places[2][j] = 1;
			
		for (var j =3; j < 6; j++) 
				places[3][j] = 1;			
				
		 for (var j =1; j < 6; j++) 
				places[9][j] = 2;	

		for (var j =1; j < 7; j++) 
				places[8][j] = 2;
			
		for (var j =3; j < 6; j++) 
				places[7][j] = 2;			
				
		///////////////////////////////////////////////
		for (var i = 0; i < places.length; i++) 
		{
			for (var j = 0; j < places.length; j++) 
				placesStart[i][j]= places[i][j];
		}	
		console.log(places);
		console.log(placesStart);
function startNewGame()
{
	firebase.database().ref('users/').child(myId).update({direction: ""});
	firebase.database().ref('users/').child(myId).update({row: ""});
	firebase.database().ref('users/').child(myId).update({column: ""});
 	firebase.database().ref('users/').child(myId).update({new_game: "1"});
	firebase.database().ref('users/').child(myId).update({placesAray: placesStart.toString()});
	
	firebase.database().ref('users/').child(myRivalId).update({direction: ""});
	firebase.database().ref('users/').child(myRivalId).update({row: ""});
	firebase.database().ref('users/').child(myRivalId).update({column: ""});
 	firebase.database().ref('users/').child(myRivalId).update({new_game: "1"});
	firebase.database().ref('users/').child(myRivalId).update({placesAray: placesStart.toString()});
	
}
function ifNotEqualToStart(placesArrayToChack)
{
	for (var i = 0; i < places.length; i++) 
		{
			for (var j = 0; j < places.length; j++)
			{
				if(placesStart[i][j] != placesArrayToChack[i][j])
				{return 1;}//not equal	
				
			}
		}
	return 0;
}
		
		var firstIdClick;
		var firstClickRow =-1;
		var firstClickColumn=-1;
		var clickball=0;
		var placeX1;
		var placeY1;
		var placeX;
		var placeY;
		var rect;
		var finishMov=0;
		
		
		function onPlace(e)
		{
			placeX=e.clientX;
			placeY=e.clientY;//console.log(placeX+" "+placeY);
			rect = id_background.getBoundingClientRect();
			//console.log(rect.top, rect.right, rect.bottom, rect.left);
	
		}
		function getIdBall(row,column)
		{
			var s= "id_"+row+column;
			return s;
		}
		
		
		function getBallTop(row,column)
		{
			var s= "id_"+row+column;
			var BallId= document.getElementById(s);//////
			var s1 = BallId.style.top;
			var topp = s1.slice(0, -1);
			return Number(topp);
		}
		function getBallLeft(row,column)
		{
			var sl= "id_"+row+column;
			var BallIdl= document.getElementById(sl);//////
			var sl1 = BallIdl.style.left;
			var leftt = sl1.slice(0, -1);
			return Number(leftt);
		}
		var realTop= new Array(9);
		for (var i = 0; i < 9; i++) 
			realTop[i] = new Array(9);
		var realLeft= new Array(9);
		for (var i = 0; i < 9; i++) 
			realLeft[i] = new Array(9);
		function putRealTopAndLeft()
		{
		for(i=0;i<9;i++)
		{
			for(j=0;j<9;j++)
			{var BallId= document.getElementById(getIdBall(i+1,j+1));
				if((BallId!=undefined)&&(BallId!=null))
				{
				//console.log("hereeee")
				//console.log("top is "+getBallTop(i+1,j+1));
				//console.log("left is "+getBallLeft(i+1,j+1));
				realTop[i][j]=getBallTop(i+1,j+1);
				realLeft[i][j]=getBallLeft(i+1,j+1);	
				//console.log("realTop[i][j] is "+realTop[i][j]);
				}
			}
		}
		}
		function putAllBallInPlace()
		{
				for(i=1;i<=9;i++)
				{
					for(j=1;j<=9;j++)
					{
						var BallId= document.getElementById(getIdBall(i,j));//////getIdBall()
						if((BallId!=undefined)&&(BallId!=null))
						{
					//		console.log(getIdBall(i,j)+" realTop[i-1][j-1] is "+realTop[i-1][j-1]);
							RT=realTop[i-1][j-1];
							RL=realLeft[i-1][j-1];
						eval("BallId.style.top="+'"'+RT+"%"+'";');
						eval("BallId.style.left="+'"'+RL+"%"+'";');
						}
					}
				}
		}
		
		function movballToPoint(row,column,x,y)
		{
			var BallId= document.getElementById(getIdBall(row,column));
			//var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+x+"%"+'";';
				//console.log(s);
				var dl=getBallLeft(row,column);
				x=x+dl;
				var d=getBallTop(row,column);
				y=y+d;
				eval("BallId.style.top="+'"'+y+"%"+'";');
				eval("BallId.style.left="+'"'+x+"%"+'";');
			//var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+y+"%"+'";';
				//console.log(s);
				//eval(s.toString());
			
		}
		
		///////////////////////////////////
		function movBallR(row,column)
		{
			
		//	var d=getBallTop(row,column);
			//	d=d+0.1;
				//var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				//eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}
			function movBallL(row,column)
		{
			
			//var d=getBallTop(row,column);
			//	d=d+0.1;
			//	var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
			//	eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}
		function movBallDR(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl+0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}
	
		function movBallUR(row,column)
		{
			
			var d=getBallTop(row,column);
			//console.log("the top is"+d);
				d=d-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				eval(s.toString());
				var dl=getBallLeft(row,column);
				//console.log("the left is"+dl);
				dl=dl+0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}
		function movBallDL(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl-0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}
		function movBallUL(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl-0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				//console.log(s);
				eval(s.toString());
			
		}

		function ifBallTouchFromUp(row1,column1,row2,column2)
		{
			if((getBallTop(row2,column2)-(getBallTop(row1,column1)))<4)
			{return 1}
			else {return 0}
		}

		function ifBallTouchFromLeft(row1,column1,row2,column2)
		{
			if((getBallLeft(row2,column2)-(getBallLeft(row1,column1)))<4)
			{return 1}
			else {return 0}
		}
		
		function onOutBall()
		{	
			putAllBallInPlace();
		 	hold=0;
			clickball=0;
			//flagInBall=0;
			flagWait=0;
			topflag=-1;
			leftflag=-1;
		}
		var flagInBall=0;
		var topflag=-1;
		var leftflag=-1;
		var blackTurn=1;
		
		function onBall(e,id,row,column)
		{
		//if(myRealColor=="black"){myNumColor=1;}else{myNumColor=0;}
		if((blackWin==0)&&(whiteWin==0)&&(myNumColor==blackTurn))
		{
			id.style.cursor = "pointer";
			if(flagInBall==0)
			{	
			var	dy=(placeY1-placeY);
			var dx=(placeX1-placeX);
			if( ((dy*dy)>9) || ((dx*dx)>9) )
			{
				flagInBall=1;
				//console.log("good");
				if((dy*dy)<0.3)//its left or right
				{
					if(dx>0)//its left
					{
						//console.log("its left");
						topflag=2;//not up and not down
						leftflag=1;
						onBallstart(e,id,row,column);
					}
				else{
						//console.log("its right");
						topflag=2;//not up and not down
						leftflag=0;
						onBallstart(e,id,row,column);
					}
				}
				/////////////////////////////////////////////////////
				else//its up or down
				{
					if(dy<0)//its down
					{
						if(dx>0)//its down left
						{
						//console.log("its down-left");
						topflag=0;
						leftflag=1;
						onBallstart(e,id,row,column);
						}
					else{
						//console.log("its down-right");
						topflag=0;
						leftflag=0;
						onBallstart(e,id,row,column);
						}
					}
					////////////////////////////////
					else//its up
					{
						if(dx>0)//its up left
						{
						//console.log("its up-left");
						topflag=1;
						leftflag=1;
						onBallstart(e,id,row,column);
						}
					else{
						//console.log("its up-right");
						topflag=1;
						leftflag=0;
						onBallstart(e,id,row,column);
						}
					}
					////////////////////////////////
				}
				///////////////////////////////////////////////////////
			}
			}
			else{
				if((topflag!=-1)&&(leftflag!=-1))
				{
					onBallstart(e,id,row,column);
				}
			}
		}
		}
		
		
		
		
		
		
			//////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////
		
		
		
		//////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////	
		
		
		//////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////	
		
		
	//////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////
		function onBallstart(e,id,row,column)//////////////////////////////////////////////////////////
	//	{console.log("flagLeftRiht= "+flagLeftRiht+"flag2= "+flag2+" flagDownRight= "+flagDownRight+"  placeY1-placeY = "+(placeY1-placeY)+" (placeX1-placeX) = "+(placeX1-placeX)+"  clickball= "+clickball);
		{
			if(clickball==0)
			{
			putAllBallInPlace();
			hold=0;
			}
	//		id.style.cursor = "pointer";
			if(clickball==1)
			{
			hold=1;	
			if(topflag==0)//its down
				{
					if(leftflag==0)//its down right 
					{movBallDR(row,column);//console.log("leftflag= "+leftflag);//1
					var mor5=0;
						if(row+1<5){mor5=1;}
					if(((realTop[row][column+mor5-1])-(getBallTop(row,column)))>1)	
					{
					var column5=column;//console.log("column= "+column5);
					if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row,column,row+1,column5+1))
						{//if(row+1>5){column5=column5-1;}
							movBallDR(row+1,column5+1);//console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row+1,column5+1,row+2,column5+1))&&(places[row+1][column5+1]!=0))//////////////////
							{if(row+2>5){column5=column5-1;}//console.log("column521= "+column5);
							movBallDR(row+2,column5+2);//console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row+2,column5+2,row+3,column5+1))&&(places[row+2][column5+2]!=0))
								{if(row+3>5){column5=column5-1;}
								movBallDR(row+3,column5+3);//4
									if((ifBallTouchFromUp(row+3,column5+3,row+4,column5+1))&&(places[row+3][column5+3]!=0))
									{if(row+4>5){column5=column5-1;}
									movBallDR(row+4,column5+1);//5
									}	
								}	
							}	
						}
					}
					else{
							//console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeDR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeDR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						 }	
					}
					else if(leftflag==1)//its down left
					{var mor5=0;
						if(row+1>5){mor5=1;}
						movBallDL(row,column);
					if(((realTop[row][column-mor5-1])-(getBallTop(row,column)))>1)	
					{//console.log("leftflag= "+leftflag);console.log("getBallTop(row,column-mor5)="+getBallTop(row,column)+"  realTop[row][column-mor5]"+realTop[row][column-mor5]);//1
					var column5=column;//console.log("column= "+column5);
					if(row+1<=5){column5=column+1;}
						if(ifBallTouchFromUp(row,column,row+1,column5-1))
						{if(row+1<=5){column5=column+1;}
							movBallDL(row+1,column5-1);     //console.log("column5= "+column5);//2
							if(places[row+1][column5-1]!=0){
							if((ifBallTouchFromUp(row+1,column5-1,row+2,column5))&&(places[row+1][column5-1]!=0))//////////////////
							{if(row+2<=5){column5=column5+1;}      //console.log("column521= "+column5);
							movBallDL(row+2,column5-2);         // console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row+2,column5-2,row+3,column5))&&(places[row+2][column5-2]!=0))
								{if(row+3<=5){column5=column5+1;}
								movBallDL(row+3,column5-3);//4
									if((ifBallTouchFromUp(row+3,column5-3,row+4,column5))&&(places[row+3][column5-3]!=0))
									{if(row+4<=5){column5=column5+1;}
									movBallDL(row+4,column5-4);//5
									}	
								}	
							}	
						}
						}
					 }	
					 else{
							//console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeDL(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeDL(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						 }
					}//////////////
				}
				//////////////end down options
			else if(topflag==1)//its up
				{
					if(leftflag==0)//its up right 
					{movBallUR(row,column);//console.log("leftflag= "+leftflag);//1
						var mor5=0;
						if(row-1>=5){mor5=1;}//console.log("(getBallTop(row,column)-(realTop[row-2][column+mor5])=  "+(getBallTop(row,column)-(realTop[row-2][column+mor5])));
						//console.log("row,column= "+row+" "+column);
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;//console.log("column= "+column5);
					if(row-1>=5){column5=column5+1;}//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");}//if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUR(row-1,column5);//console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))//////////////////
							{if(row-2>=5){column5=column5+1;}//console.log("column521= "+column5);
							movBallUR(row-2,column5);//console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row-3,column5,row-2,column5))&&(places[row-2][column5]!=0))
								{if(row-3>=5){column5=column5+1;}
								movBallUR(row-3,column5);//4
									if((ifBallTouchFromUp(row-4,column5,row-3,column5))&&(places[row-3][column5]!=0))
									{if(row-4>=5){column5=column5+1;}
									movBallUR(row-4,column5);//5
									}	
								}	
							}	
						}
					}
					else{
							//console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeUR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeUR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						 }
					}////////////////
					else if(leftflag==1)//its up left
					{movBallUL(row,column);//console.log("leftflag= "+leftflag);
						var mor5=0;
						if(row-1<5){mor5=-1;}//console.log("(getBallTop(row,column)-(realTop[row-2][column+mor5])=  "+(getBallTop(row,column)-(realTop[row-2][column+mor5])));
						//console.log("row,column= "+row+" "+column);
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;//console.log("column= "+column5);
					if(row-1<5){column5=column5-1;}//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");}//if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUL(row-1,column5);//console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))//////////////////
							{if(row-2<5){column5=column5-1;}//console.log("column521= "+column5);
							movBallUL(row-2,column5);//console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row-3,column5,row-2,column5))&&(places[row-2][column5]!=0))
								{if(row-3<5){column5=column5-1;}
								movBallUL(row-3,column5);//4
									if((ifBallTouchFromUp(row-4,column5,row-3,column5))&&(places[row-3][column5]!=0))
									{if(row-4<5){column5=column5-1;}
									movBallUL(row-4,column5);//5
									}	
								}	
							}	
						}
					}
					else{
							//console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeUL(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeUL(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						 }
					}
					

				}
			else if(topflag==2)//its flat
				{////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if(leftflag==0)//its right 
					{
						if(((realLeft[row-1][column])-(getBallLeft(row,column)))>1)
						{//console.log("realLeft[row][column+1]="+realLeft[row-1][column]+"  getBallLeft(row,column)="+getBallLeft(row,column));
							movBallR(row,column);//console.log("leftflag= "+leftflag);//1			
						if(ifBallTouchFromLeft(row,column,row,column+1))				
						{movBallR(row,column+1);
							if((ifBallTouchFromLeft(row,column+1,row,column+2))&&(places[row][column+1]!=0))//////////////////
							{
							movBallR(row,column+2);//3
								if((ifBallTouchFromLeft(row,column+2,row,column+3))&&(places[row][column+2]!=0))					
								{movBallR(row,column+3);//4
									if((ifBallTouchFromLeft(row,column+3,row,column+4))&&(places[row][column+3]!=0))						
									{
										movBallR(row,column+4);//5
									}	
								}	
							}	
						}
						}
						else{
							//console.log("les then 4");
							if(blackTurn==1)
							{
							if(checkAndChangeR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						}
					}
					else if(leftflag==1)//its left
					if(((getBallLeft(row,column))-(realLeft[row-1][column-2]))>1)
					{movBallL(row,column);//console.log("leftflag= "+leftflag);
						if(ifBallTouchFromLeft(row,column-1,row,column))				
						{movBallL(row,column-1);
							if((ifBallTouchFromLeft(row,column-2,row,column-1))&&(places[row][column-1]!=0))//////////////////
							{
							movBallL(row,column-2);//3
								if((ifBallTouchFromLeft(row,column-3,row,column-2))&&(places[row][column-2]!=0))					
								{movBallL(row,column-3);//4
									if((ifBallTouchFromLeft(row,column-4,row,column-3))&&(places[row][column-3]!=0))						
									{
										movBallL(row,column-4);//5
									}	
								}	
							}	
						}	
						
					}
						else{
							//console.log("les then 4444444444444444111111111111111");
							if(blackTurn==1)
							{
								if(checkAndChangeL(row,column,1)==-1){id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";console.log("!not ligal move!!! wait for black ligal move!");}
				
								else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;console.log("!!!!!!!!wait for white move!!!!!!!!!!!");}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeL(row,column,2)==-1){id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;console.log("!!!!!!!!wait for black move!!!!!!!!!!!");}
							}
						}
				
				}
	
		
		}//console.log(places);
		}
		var flagWait=0;
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////
		function onRivalMove(row,column,dirUp,dirLeft)//////////////////////////////////////////////////////////
	//	{console.log("flagLeftRiht= "+flagLeftRiht+"flag2= "+flag2+" flagDownRight= "+flagDownRight+"  placeY1-placeY = "+(placeY1-placeY)+" (placeX1-placeX) = "+(placeX1-placeX)+"  clickball= "+clickball);
		{
		
			if(dirUp==0)//its down
				{
					if(dirLeft==0)//its down right 
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						movBallDR(row,column);console.log("dirLeft= "+dirLeft);//1
					var mor5=0;//the midle row
						if(row+1<5){mor5=1;}
					console.log(realTop[row][column+mor5-1]+ " - "+getBallTop(row,column));
					if(((realTop[row][column+mor5-1])-(getBallTop(row,column)))>1)	
					{
					var column5=column;console.log("column= "+column5);
					if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row,column,row+1,column5+1))
						{//if(row+1>5){column5=column5-1;}
							movBallDR(row+1,column5+1);console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row+1,column5+1,row+2,column5+1))&&(places[row+1][column5+1]!=0))//////////////////
							{if(row+2>5){column5=column5-1;}console.log("column521= "+column5);
							movBallDR(row+2,column5+2);console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row+2,column5+2,row+3,column5+1))&&(places[row+2][column5+2]!=0))
								{if(row+3>5){column5=column5-1;}
								movBallDR(row+3,column5+3);//4
									if((ifBallTouchFromUp(row+3,column5+3,row+4,column5+1))&&(places[row+3][column5+3]!=0))
									{if(row+4>5){column5=column5-1;}
									movBallDR(row+4,column5+1);//5
									}	
								}	
							}	
						}
					}
					else{
							console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeDR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeDR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
							clearInterval(moveTime);
							onOutBall();
						 }	
						}
					}
					else if(dirLeft==1)//its down left
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						var mor5=0;
						if(row+1>5){mor5=1;}
						movBallDL(row,column);
					if(((realTop[row][column-mor5-1])-(getBallTop(row,column)))>1)	
					{console.log("dirLeft= "+dirLeft);console.log("getBallTop(row,column-mor5)="+getBallTop(row,column)+"  realTop[row][column-mor5]"+realTop[row][column-mor5]);//1
					var column5=column;console.log("column= "+column5);
					if(row+1<=5){column5=column+1;}
						if(ifBallTouchFromUp(row,column,row+1,column5-1))
						{if(row+1<=5){column5=column+1;}
							movBallDL(row+1,column5-1);     console.log("column5= "+column5);//2
							if(places[row+1][column5-1]!=0){
							if((ifBallTouchFromUp(row+1,column5-1,row+2,column5))&&(places[row+1][column5-1]!=0))//////////////////
							{if(row+2<=5){column5=column5+1;}      console.log("column521= "+column5);
							movBallDL(row+2,column5-2);          console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row+2,column5-2,row+3,column5))&&(places[row+2][column5-2]!=0))
								{if(row+3<=5){column5=column5+1;}
								movBallDL(row+3,column5-3);//4
									if((ifBallTouchFromUp(row+3,column5-3,row+4,column5))&&(places[row+3][column5-3]!=0))
									{if(row+4<=5){column5=column5+1;}
									movBallDL(row+4,column5-4);//5
									}	
								}	
							}	
						}
						}
					 }	
					 else{
							console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeDL(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeDL(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
							clearInterval(moveTime);
							onOutBall();
						 }
					}
					}//////////////
				}
				//////////////end down options
			else if(dirUp==1)//its up
				{
					if(dirLeft==0)//its up right 
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						
						movBallUR(row,column);console.log("leftflag= "+dirLeft);//1
						var mor5=0;
						if(row-1>=5){mor5=1;}//console.log("(getBallTop(row,column)-(realTop[row-2][column+mor5])=  "+(getBallTop(row,column)-(realTop[row-2][column+mor5])));
						console.log("row,column= "+row+" "+column);
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;console.log("column= "+column5);
					if(row-1>=5){column5=column5+1;console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");}//if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUR(row-1,column5);console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))//////////////////
							{if(row-2>=5){column5=column5+1;}console.log("column521= "+column5);
							movBallUR(row-2,column5);console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row-3,column5,row-2,column5))&&(places[row-2][column5]!=0))
								{if(row-3>=5){column5=column5+1;}
								movBallUR(row-3,column5);//4
									if((ifBallTouchFromUp(row-4,column5,row-3,column5))&&(places[row-3][column5]!=0))
									{if(row-4>=5){column5=column5+1;}
									movBallUR(row-4,column5);//5
									}	
								}	
							}	
						}
					}
					else{
							console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeUR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeUR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
							clearInterval(moveTime);
							onOutBall();
						 } 
					}
					}////////////////
					else if(dirLeft==1)//its up left
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						
						
						movBallUL(row,column);console.log("dirLeft= "+dirLeft);
						var mor5=0;
						if(row-1<5){mor5=-1;}//console.log("(getBallTop(row,column)-(realTop[row-2][column+mor5])=  "+(getBallTop(row,column)-(realTop[row-2][column+mor5])));
						console.log("row,column= "+row+" "+column);
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;console.log("column= "+column5);
					if(row-1<5){column5=column5-1;console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");}//if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUL(row-1,column5);console.log("column5= "+column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))//////////////////
							{if(row-2<5){column5=column5-1;}console.log("column521= "+column5);
							movBallUL(row-2,column5);console.log("column52= "+column5);//3
								if((ifBallTouchFromUp(row-3,column5,row-2,column5))&&(places[row-2][column5]!=0))
								{if(row-3<5){column5=column5-1;}
								movBallUL(row-3,column5);//4
									if((ifBallTouchFromUp(row-4,column5,row-3,column5))&&(places[row-3][column5]!=0))
									{if(row-4<5){column5=column5-1;}
									movBallUL(row-4,column5);//5
									}	
								}	
							}	
						}
					}
					else{
							console.log("les then 4444444444444444");
							if(blackTurn==1)
							{
							if(checkAndChangeUL(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeUL(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
						 clearInterval(moveTime);
						 onOutBall();
						 }
					}
				}

				}
			else if(dirUp==2)//its flat
				{////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if(dirLeft==0)//its right 
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						if(((realLeft[row-1][column])-(getBallLeft(row,column)))>1)
						{console.log("realLeft[row][column+1]="+realLeft[row-1][column]+"  getBallLeft(row,column)="+getBallLeft(row,column));
							movBallR(row,column);console.log("dirLeft= "+dirLeft);//1			
						if(ifBallTouchFromLeft(row,column,row,column+1))				
						{movBallR(row,column+1);
							if((ifBallTouchFromLeft(row,column+1,row,column+2))&&(places[row][column+1]!=0))//////////////////
							{
							movBallR(row,column+2);//3
								if((ifBallTouchFromLeft(row,column+2,row,column+3))&&(places[row][column+2]!=0))					
								{movBallR(row,column+3);//4
									if((ifBallTouchFromLeft(row,column+3,row,column+4))&&(places[row][column+3]!=0))						
									{
										movBallR(row,column+4);//5
									}	
								}	
							}	
						}
						}
						else{
							console.log("les then 4");
							if(blackTurn==1)
							{
							if(checkAndChangeR(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeR(row,column,2)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;}
							}
							clearInterval(moveTime);
							onOutBall();
						} 
					}
					}
					else if(dirLeft==1)//its left
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
					if(((getBallLeft(row,column))-(realLeft[row-1][column-2]))>1)
					{movBallL(row,column);console.log("leftflag= "+leftflag);
						if(ifBallTouchFromLeft(row,column-1,row,column))				
						{movBallL(row,column-1);
							if((ifBallTouchFromLeft(row,column-2,row,column-1))&&(places[row][column-1]!=0))//////////////////
							{
							movBallL(row,column-2);//3
								if((ifBallTouchFromLeft(row,column-3,row,column-2))&&(places[row][column-2]!=0))					
								{movBallL(row,column-3);//4
									if((ifBallTouchFromLeft(row,column-4,row,column-3))&&(places[row][column-3]!=0))						
									{
										movBallL(row,column-4);//5
									}	
								}	
							}	
						}	
						
					}
				
						else{
							console.log("les then 4444444444444444111111111111111");
							if(blackTurn==1)
							{
								if(checkAndChangeL(row,column,1)==-1){id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";console.log("!not ligal move!!! wait for black ligal move!");}
				
								else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;console.log("!!!!!!!!wait for white move!!!!!!!!!!!");}
							}//the ball move enough, make the mov
							else
							{
							if(checkAndChangeL(row,column,2)==-1){id_ifLigal.innerHTML="not ligal move!!! wait for white ligal move";}
							
							else{id_ifLigal.innerHTML="wait for black move";blackTurn=1;console.log("!!!!!!!!wait for black move!!!!!!!!!!!");}
							}
							clearInterval(moveTime);
							onOutBall();
							}
				}
			}
		
		}console.log(places);
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function checkAndChangeR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{console.log("------------------------------");
			if((places[row][column]!=color)&&(flagWait==0))
			 {console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			
		 	////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "R"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			});
			////////////////////////////////////////////////////////////////////
		  
				if((places[row][column+1]==color)||(places[row][column+1]==0))//one ball cant mov one rivel ball
				{console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
					if(places[row][column+1]==0)
					{
						places[row][column+1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row,column+1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row][column+1]==color)
					{console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
						if(places[row][column+2]==0)//2 ball in same color push without thach another ball
						{
						places[row][column+2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row,column+2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						if(places[row][column+2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{  console.log("................................");
							if((places[row][column+3]!=0)&&(flagWait==0)&&(places[row][column+3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							console.log("0000000000000");
								//2 ball phush 1 ball in diferent color to a hole
								places[row][column]=0;
								places[row][column+2]=color;
								if(places[row][column+3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column+2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column+2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column+2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
								if(places[row][column+3]==0){//2 ball push 1 ball to hole
								places[row][column+3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column+2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row,column+3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;			
								}
						}
						else if(places[row][column+3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row][column+3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column+3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row][column+3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row][column+4]==0)//3 ball push 1 rivel ball to hole
							{
								places[row][column]=0;
								places[row][column+3]=color;
								places[row][column+4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column+3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row,column+4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
							if(places[row][column+4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column+3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column+3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column+3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row][column+3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							if((places[row][column+4]==abs(color-3)))//3 ball push 2 rivel ball to hole
							{
								if(places[row][column+5]==0)
								{places[row][column]=0;
								places[row][column+3]=color;
								places[row][column+5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column+3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row,column+5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
								}
							if(places[row][column+5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column+4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column+4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column+3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row][column+3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							}
						}
					
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
			 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
//////////////////////////////////////////		///////   ///////////////
		
		function checkAndChangeL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "L"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			});
			////////////////////////////////////////////////////////////////////
		  
				if((places[row][column-1]==color)||(places[row][column-1]==0))//one ball cant mov one rivel ball
				{
					if(places[row][column-1]==0)
					{
						places[row][column-1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row,column-1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row][column-1]==color)
					{  if(places[row][column-2]==-1){return -1;}
						if(places[row][column-2]==0)//2 ball in same color push without thach another ball
						{
						places[row][column-2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row,column-2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						if(places[row][column-2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{
							if((places[row][column-3]!=0)&&(flagWait==0)&&(places[row][column-3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
							  if(places[row][column-3]==0)
								{places[row][column]=0;
								places[row][column-2]=color;
								places[row][column-3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column-2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row,column-3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;			
								}
								if(places[row][column-3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column-2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column-2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column-2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row][column-2]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
								
						}
						else if(places[row][column-3]==-1){return -1;}
						else if(places[row][column-3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row][column-3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column-3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row][column-3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row][column-4]==0)//3 ball push 1 rivel ball
							{
								places[row][column]=0;
								places[row][column-3]=color;
								places[row][column-4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column-3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row,column-4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
							if(places[row][column-4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column-3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column-3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column-3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row][column-3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
					
							
							if((places[row][column-4]==abs(color-3)))//3 ball push 2 ball
							{
								if(places[row][column-5]==0)//3 ball push 2 ball to hole
								{places[row][column]=0;
								places[row][column-3]=color;
								places[row][column-5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row,column-3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row,column-5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
								}
								if(places[row][column-5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row,column-4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row,column-4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row,column-3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row][column-3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							}
						}
					
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
			 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
		function checkAndChangeDL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
				
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "DL"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			});
			////////////////////////////////////////////////////////////////////
				var column1=column;var column2=0;var column3=0;var column4=0;var column5=0;
				
				if(row+1>5){column1=column1-1;}
				column2=column1;
				if(row+2>5){column2=column2-1;}
				column3=column2;
				if(row+3>5){column3=column3-1;}
				column4=column3;
				if(row+4>5){column4=column4-1;}
				column5=column4;
				if(row+4>5){column5=column5-1;}

				if((places[row+1][column1]==color)||(places[row+1][column1]==0))//one ball cant mov one rivel ball
				{
					if(places[row+1][column1]==0)
					{
						places[row+1][column1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row+1,column1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row+1][column1]==color)
					{
						if(places[row+2][column2]==0)//2 ball in same color push without thach another ball
						{
						places[row+2][column2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row+2,column2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						
						if(places[row+2][column2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{
							if((places[row+3][column3]!=0)&&(flagWait==0)&&(places[row+3][column3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
								if(places[row+3][column3]==0)
								{places[row][column]=0;
								places[row+2][column2]=color;
								places[row+3][column3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+2,column2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;			
								}
								if(places[row+3][column3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+2,column2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+2,column2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+2,column2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+2][column2]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
						}
						else if(places[row+3][column3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row+3][column3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row+3][column3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row+4][column4]==0)//3 ball push 1 rivel ball to hole
							{
								places[row][column]=0;
								places[row+3][column3]=color;
								places[row+4][column4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row+4,column4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
							if(places[row+4][column4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+3,column3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+3,column3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							
							if((places[row+4][column4]==abs(color-3)))
							{
								if(places[row+5][column5]==0)//3 ball push 2 rivel ball to hole
								{
								places[row][column]=0;
								places[row+3][column3]=color;
								places[row+5][column5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row+5,column5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
								}
								if(places[row+5][column5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+4,column4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+4,column4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							}
							
						}
					
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
		 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////end function
		function checkAndChangeDR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "DR"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			});
			////////////////////////////////////////////////////////////////////
				var column1=column;var column2=0;var column3=0;var column4=0;var column5=0;
				
				if(row+1<=5){column1=column1+1;}
				column2=column1;
				if(row+2<=5){column2=column2+1;}
				column3=column2;
				if(row+3<=5){column3=column3+1;}
				column4=column3;
				if(row+4<=5){column4=column4+1;}
				column5=column4;
				if(row+5<=5){column5=column5+1;}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				if((places[row+1][column1]==color)||(places[row+1][column1]==0))//one ball cant mov one rivel ball
				{
					if(places[row+1][column1]==0)
					{
						places[row+1][column1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row+1,column1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row+1][column1]==color)
					{
						if(places[row+2][column2]==0)//2 ball in same color push without thach another ball
						{
						places[row+2][column2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row+2,column2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						if(places[row+2][column2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{
							if((places[row+3][column3]!=0)&&(flagWait==0)&&(places[row+3][column3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
								if(places[row+3][column3]==0)
								{
								places[row][column]=0;
								places[row+2][column2]=color;
								places[row+3][column3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+2,column2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;			
								}
								if(places[row+3][column3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+2,column2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+2,column2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+2,column2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+2][column2]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
								
						}
						else if(places[row+3][column3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row+3][column3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row+3][column3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row+4][column4]==0)//3 ball push 1 rivel ball to hole
							{
								places[row][column]=0;
								places[row+3][column3]=color;
								places[row+4][column4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row+4,column4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
							if(places[row+4][column4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+3,column3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+3,column3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							if((places[row+4][column4]==abs(color-3)))
							{
								if(places[row+5][column5]==0)//3 ball push 2 rivel ball to hole
								{
									
								places[row][column]=0;
								places[row+3][column3]=color;
								places[row+5][column5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row+3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row+5,column5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
								}
								if(places[row+5][column5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row+4,column4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row+4,column4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row+3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row+3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							}
						}
					
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
			 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function checkAndChangeUR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "UR"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			});
			////////////////////////////////////////////////////////////////////
			
				var column1=column;var column2=0;var column3=0;var column4=0;var column5=0;
				
				if(row-1>=5){column1=column1+1;}
				column2=column1;
				if(row-2>=5){column2=column2+1;}
				column3=column2;
				if(row-3>=5){column3=column3+1;}
				column4=column3;
				if(row-4>=5){column4=column4+1;}
				column5=column4;
				if(row-5>=5){column5=column5+1;}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				if((places[row-1][column1]==color)||(places[row-1][column1]==0))//one ball cant mov one rivel ball
				{
					if(places[row-1][column1]==0)
					{
						places[row-1][column1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row-1,column1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row-1][column1]==color)
					{
						if(places[row-2][column2]==0)//2 ball in same color push without thach another ball
						{
						places[row-2][column2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row-2,column2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						if(places[row-2][column2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{
							if((places[row-3][column3]!=0)&&(flagWait==0)&&(places[row-3][column3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
								if((places[row-3][column3]==0)){
								places[row][column]=0;
								places[row-2][column2]=color;
								places[row-3][column3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-2,column2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;
								}
								if(places[row-3][column3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-2,column2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-2,column2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-2,column2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-2][column2]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}								
								
						}
						else if(places[row-3][column3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row-3][column3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row-3][column3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row-4][column4]==0)//3 ball push 1 rivel ball to hole
							{
								places[row][column]=0;
								places[row-3][column3]=color;
								places[row-4][column4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row-4,column4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
								if(places[row-4][column4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-3,column3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-3,column3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							if((places[row-4][column4]==abs(color-3)))
							{
							  if(places[row-5][column5]==0)//3 ball push 2 rivel ball to hole
							  {
								places[row][column]=0;
								places[row-3][column3]=color;
								places[row-5][column5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row-5,column5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							  }
							
								if(places[row-5][column5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-4,column4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-4,column4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
						}
					}
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
			 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
		function checkAndChangeUL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
		
			console.log("my rival_id is " + myRivalId);
			
			console.log("my id is: " + myId);
			if(color==1)
			{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'white'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'white'});
			}
			else{firebase.database().ref('users/').child(myRivalId).update({turn_color: 'black'});
			firebase.database().ref('users/').child(myId).update({turn_color: 'black'});
			}
			firebase.database().ref('users/').child(myRivalId).update({direction: "UL"});
			firebase.database().ref('users/').child(myRivalId).update({row: row.toString()});
			firebase.database().ref('users/').child(myRivalId).update({column: column.toString()});
			
			  });
			////////////////////////////////////////////////////////////////////
				var column1=column;var column2=0;var column3=0;var column4=0;var column5=0;
				
				if(row-1<5){column1=column1-1;}
				column2=column1;
				if(row-2<5){column2=column2-1;}
				column3=column2;
				if(row-3<5){column3=column3-1;}
				column4=column3;
				if(row-4<5){column4=column4-1;}
				column5=column4;
				if(row-5<5){column5=column5-1;}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				if((places[row-1][column1]==color)||(places[row-1][column1]==0))//one ball cant mov one rivel ball
				{
					if(places[row-1][column1]==0)
					{
						places[row-1][column1]=color;
						places[row][column]=0;
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row-1,column1));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee111111");
						flagWait=1;
						return 1;
					}
					if(places[row-1][column1]==color)
					{
						if(places[row-2][column2]==0)//2 ball in same color push without thach another ball
						{
						places[row-2][column2]=color;
						places[row][column]=0;			
						id=document.getElementById(getIdBall(row,column));
						id.src="empty.png";
						id=document.getElementById(getIdBall(row-2,column2));
						if(color==1){id.src="newBlackBall.jpg";}
						else {id.src="whiteBall.jpg";}
						putAllBallInPlace();
						console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
						flagWait=1;
						return 1;
						}
						if(places[row-2][column2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{
							if((places[row-3][column3]!=0)&&(flagWait==0)&&(places[row-3][column3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
								if(places[row-3][column3]==0)
								{places[row][column]=0;
								places[row-2][column2]=color;
								places[row-3][column3]=(abs(color-3));
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-2,column2));
								if(color==1){id.src="newBlackBall.jpg";}
								else {id.src="whiteBall.jpg";}
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee11111122222");
								flagWait=1;
								return 1;			
								}
								if(places[row-3][column3]==-1)//2 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-2,column2,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-2,column2,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-2,column2));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-2][column2]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
						}
						else if(places[row-3][column3]==0)//push 3 ball in same color to a hole
							{
								places[row][column]=0;
								places[row-3][column3]=color;
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								console.log("abs(color-3)= "+abs(color-3));
								flagWait=1;
								return 1;		
							}
						
						else if((places[row-3][column3]==abs(color-3)))//3 ball push 1 or mor rivel ball
						{
							if(places[row-4][column4]==0)//3 ball push 1 rivel ball to hole
							{
								places[row][column]=0;
								places[row-3][column3]=color;
								places[row-4][column4]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row-4,column4));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
							}
							if(places[row-4][column4]==-1)//3 ball push 1 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-3,column3,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-3,column3,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
							
							if((places[row-4][column4]==abs(color-3)))//3 ball push 2 rivel ball
							{
								if(places[row-5][column5]==0)//3 ball push 2 rivel ball to hole
								{
								//sleep(100);	
								places[row][column]=0;
								places[row-3][column3]=color;
								places[row-5][column5]=abs(color-3);
								id=document.getElementById(getIdBall(row,column));
								id.src="empty.png";
								id=document.getElementById(getIdBall(row-3,column3));
								if(color==2){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								id=document.getElementById(getIdBall(row-5,column5));
								if(color==1){id.src="whiteBall.jpg";}
								else{id.src="newBlackBall.jpg";}
								putAllBallInPlace();
								flagWait=1;
								return 1;		
								}
							
							if(places[row-5][column5]==-1)//3 ball push 2 ball out of the game
								{console.log("11111111111111");
									if(color==1){
										blackOut--;console.log("222222222222");
										myMove(row-4,column4,25,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									else{
										whiteOut--;console.log("3333333333333");
										myMove(row-4,column4,70,91.5,(abs(color-3)));console.log("444444444444444");/////////////////////////mymmov
									}
									id=document.getElementById(getIdBall(row,column));
									id.src="empty.png";
									id=document.getElementById(getIdBall(row-3,column3));
									if(color==1){id.src="newBlackBall.jpg";}
									else {id.src="whiteBall.jpg";}
									places[row][column]=0;
									places[row-3][column3]=color;
									putAllBallInPlace();
									flagWait=1;
									return 1;	
								}
						}
						}
					}
				
				else if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
				}
			 if(flagWait==0){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee222222222222");return -1;}
		}
	/*	function onBall(e,id,row,column,top1,left1)
		{
			id.style.cursor = "pointer";
			if(clickball==1)
			{
				console.log("the top is:"+top1+"the left is:"+left1);
				d=top1-((placeY1-placeY)/8);
				var s="id.style.top="+'"'+d+"%"+'";';
				eval(s.toString());
				dl=left1-((placeX1-placeX)/8);
				var s="id.style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
				//console.log("id_"+row+column);
				//console.log(getIdBall(row,column));
				//if(getIdBall(row+1,column).top>=top1+4)
				//{
					movBall(row+1,column)
				//}
				
			}
		}
		*/
	
		function onClickBall()
		{
			flagInBall=0;
			clickball=clickball+1;
			if(clickball>1)//to restart
			{
				clickball=0;
				putAllBallInPlace();
				
			}
			placeX1=placeX;//console.log("placeX1 ="+placeX1);
			placeY1=placeY;//console.log("placeY1 ="+placeY1);
			
		}
		
		
		function onChangeImge(id,row,column)
		{
			
			
			if (firstClickRow ==-1) 
			{
				if(places[row][column]==0)
				{
					firstClickRow =-1;
					firstClickColumn=-1;
					console.log("places[row][column]=0");
				}
				else{
				firstIdClick=id;
				firstClickRow =row;
				firstClickColumn=column;
				console.log("first row:"+firstClickRow);
				console.log("first column"+firstClickColumn);
				}
			}
			else 
			{
				if(places[firstClickRow][firstClickColumn]==1)
				{
					if(places[row][column]==0)
					{
						console.log("get here");
						places[firstClickRow][firstClickColumn]=0;
						places[row][column]=1;
						firstIdClick.src="empty.png";
						id.src="newBlackBall.jpg";
						
					}
				}
		
				else if(places[firstClickRow][firstClickColumn]==2)
				{
					if(places[row][column]==0)
					{
						console.log("get here");
						places[firstClickRow][firstClickColumn]=0;
						places[row][column]=2;
						firstIdClick.src="empty.png";
						id.src="whiteBall.jpg";
						
					}
				}
		console.log("places[firstClickRow][firstClickColumn]= "+places[firstClickRow][firstClickColumn]);
		console.log("places[secondClickRow][secondClickColumn]= "+places[row][column]);
				firstClickRow =-1;
		        firstClickColumn=-1;	
				console.log("scond row:"+row);
				console.log("second column:"+column);
			
	
			}

			
		
			//id.style.top='10%';
		//console.log(places);
		
		
		}
		
	
