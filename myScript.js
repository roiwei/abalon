

var userEmail="";  
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
var user = firebase.auth().currentUser;	 
document.getElementById('datah1').innerHTML= "You're connected with: "+ user.email;
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
var rowIndex = 1; 
var databaseRef = firebase.database().ref('users/'); 
function update_userTable_data()
{
	var Table = document.getElementById("tb1_users_list");
		   var rowCount = Table.rows.length;	
var rowIndex1 = 1; 
databaseRef.once('value', function(snapshot) {
	
       snapshot.forEach(function(childSnapshot) {
	   		   var Table = document.getElementById("tb1_users_list");
		   var rowCount = Table.rows.length;	
	    var childKey = childSnapshot.key;
            IDarray[rowIndex1]=childKey;   
	    var childData = childSnapshot.val();
	    nameArray[rowIndex1]=childData.user_name;
		  if(rowIndex1 >= rowCount)
		  {
			var row = document.getElementById("tb1_users_list").insertRow(rowIndex1-1);
			var cellName = row.insertCell(0);
			cellName.appendChild(document.createTextNode(childData.user_name));
		  }
		  else
		  {
			  rowCount = Table.rows.length;
			  var s = document.getElementById("tb1_users_list").rows[rowIndex1-1];
			  s.innerHTML = childData.user_name;
		  }
		  ///
		  rowCount = Table.rows.length;	
		  ///
	    rowIndex1 = rowIndex1 + 1;  
		  	
	  });
	});
}
var chatIdArray = new Array();  
var chatNoteArray = new Array(); 	
var databaseRefChat = firebase.database().ref('chat/'); 
function update_chatTable_data()
{
var Table = document.getElementById("tb_chat");
var rowCount = Table.rows.length;
var rowCount1 = Table.rows.length;
var maxPlaceForChat=15;
var rowIndex2 = 1; 
databaseRefChat.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {	   
	   if(rowCount1 > maxPlaceForChat)
			{
				rowCount1=0;
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();	
			var adaRef = firebase.database().ref('/chat/'+childKey);
			adaRef.remove();
			}
		else
		{
	    var childKey = childSnapshot.key;
            chatIdArray[rowIndex2]=childKey;   
	    var childData = childSnapshot.val();
	    chatNoteArray[rowIndex2]=childData;
		  if(rowIndex2 >= rowCount)
		  {
			var row = document.getElementById("tb_chat").insertRow(rowIndex2-1);
			var cellName = row.insertCell(0);
			cellName.appendChild(document.createTextNode(childData.name+": "+childData.NOTE));
		  }
		  else
		  {
			  rowCount = Table.rows.length;
			  var s = document.getElementById("tb_chat").rows[rowIndex2-1];
			  s.innerHTML = childData.name+": "+childData.NOTE;
		  }
	    rowIndex2 = rowIndex2 + 1;  
		  
	   }
	  });
	});
}


var hold=0;	
var myRivalId = "";
var myId=null;
var myName=null;
var rivalRef;
var userData; 
setInterval(frame, 5000);
 function frame() { 

	databaseRef.once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
		   var childKey = childSnapshot.key;	
		   var childData = childSnapshot.val();
	           if(childData.user_Email==userEmail)
			{//chack if rival did anithing
			if(myId==null){myId=childData.user_id; myName=childData.user_name;}
			if(myRivalId=="" || childData.rivai_id=="stop_connecting")
			{myRivalId=childData.rivai_id;
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
			if(myRealColor=="") 
			{
			myRealColor=childData.my_color;
			RealTurnColor=childData.turn_color;
			document.getElementById('yourColor_id').innerHTML= "Your color is "+myRealColor+"";
			if(myRealColor=="black"){myNumColor=1;}else{myNumColor=0;} 
			if(RealTurnColor=="black"){blackTurn=1;}
			else{
				id_ifLigal.innerHTML="wait for white move";blackTurn=0;
				} 
			}
			var userRef = firebase.database().ref('/users/' + myRivalId);
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
			if(match_id.innerHTML!= "You have mach with "+userData.user_name+"! start play:)")
			match_id.innerHTML= "You have mach with "+userData.user_name+"! start play:)";});
				if (childData.new_game=="1")
				{
					var tempId=childData.user_id;
				 	firebase.database().ref('users/').child(myId).update({placesAray: placesStart.toString()});
					//putAllBallFromUser(placesStart);
					firebase.database().ref('users/').child(tempId).update({new_game: "0"});
					firebase.database().ref('users/').child(tempId).update({direction: ""});
					firebase.database().ref('users/').child(tempId).update({row: ""});
					firebase.database().ref('users/').child(tempId).update({column: ""})
				 	firebase.database().ref('users/').child(tempId).update({turn_color: "black"})
				 	reload_page();
					
				}
				else{
					if(childData.turn_color==childData.my_color)
					{
				   		var dir = childData.direction;
				   		if(dir=="DR")
				   		{
						onRivalMove(parseInt(childData.row),parseInt(childData.column),0,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="DL")
				   		{
						onRivalMove(parseInt(childData.row),parseInt(childData.column),0,1);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="UR")
				   		{
						onRivalMove(parseInt(childData.row),parseInt(childData.column),1,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="UL")
				   		{
						onRivalMove(parseInt(childData.row),parseInt(childData.column),1,1);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="R")
				   		{
						onRivalMove(parseInt(childData.row),parseInt(childData.column),2,0);
						var tempId=childData.user_id;
						firebase.database().ref('users/').child(tempId).update({direction: "wait"});
						firebase.database().ref('users/').child(tempId).update({row: "wait"});
						firebase.database().ref('users/').child(tempId).update({column: "wait"});
				   		}
					 	if(dir=="L")
				   		{
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
window.onkeydown=function(event){
    if(event.keyCode==13){
        send_to_chat();
    }
}
///////////////////////////////chat box function
function send_to_chat()
{
		var note = document.getElementById('chatText_id').value;
		if((note!="") && (note!=null))
		{
		var data = myName + ": " + note;
		var uid = firebase.database().ref().child('chat').push().key;
	
	var data = {
			name: myName,
			NOTE: note,
		}
		var updates = {};
		updates['/chat/' + uid] = data;
		firebase.database().ref().update(updates);
		document.getElementById('chatText_id').value="";
		}
}
////////////
firebase.database().ref('chat/').limitToLast(1).on('child_added', update_chatTable_data);

//end chat
databaseRef.on('value', function(snapshot) {
  s=snapshot.val();
  update_userTable_data();
});
/////////////////////////////end user update
function single_player()
{
	window.location ='singlePlayer.html';  
}

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
			  flag=0;  
		
	  });
	
 });

}	
	

function save_user(){
	console.log("get into save");
	console.log("number of usres is: "+rowIndex);
	var howManyUsers=1;
	databaseRef.once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
	       console.log("get into hhhhheeeeere");
		   var childData = childSnapshot.val();
	       console.log(childData.user_Email);
	       console.log(userEmail);
	       console.log(howManyUsers);
	 	howManyUsers=howManyUsers+1;
	           if(childData.user_Email==userEmail)
			{
			alert('you allraedy hav name');
			return true;
			}
	       	if(howManyUsers==rowIndex)
		{save_user1();}
	        });	
     });

}			
	
			


function save_user1(){

		var flag=0;
		var user_name = document.getElementById('user_name').value; 
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
		initUser();
		//alert('the user is created successfuliy!');	
		}
		if(flag == 1){
			     alert('the user name allredy exist! please put diferent name');
			     flag=0;
			     }

}
function update_user(){
	var Table = document.getElementById("tb1_users_list");
	var name = document.getElementById('user_name').value; 
if((name!="") && (name!=null))
{
	firebase.database().ref('users/').child(myId).update({user_name: name});
	alert('you update your name');
}
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
				places[i][j]=usrePlaces[i][j];					
				var BallId= document.getElementById(getIdBall(i,j));//////getIdBall()
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
	}
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
		}
		var blackOut=6;
		var whiteOut=6;
		var whiteNum=0;
		var blackNum=0;
		var whiteWin=0;
		var blackWin=0;
		function myMove(row,column,y,x,color) {
			var posy = getBallTop(row,column);
			var posx = getBallLeft(row,column);
			var distance=((x-posx)*(x-posx))+((y-posy)*(y-posy));
			var dx = ((x-posx)/distance)*8;
			var dy = ((y-posy)/distance)*8;
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
				num=document.getElementById("id_blackNum");
				var s="number"+whiteNum+".jpg";
				}
			setInterval(frame, 5);
			function frame() {
			if (posx > x) {
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
			placeY=e.clientY;
			rect = id_background.getBoundingClientRect();	
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
				realTop[i][j]=getBallTop(i+1,j+1);
				realLeft[i][j]=getBallLeft(i+1,j+1);	
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
				var dl=getBallLeft(row,column);
				x=x+dl;
				var d=getBallTop(row,column);
				y=y+d;
				eval("BallId.style.top="+'"'+y+"%"+'";');
				eval("BallId.style.left="+'"'+x+"%"+'";');
			
			
		}
		
		///////////////////////////////////
		function movBallR(row,column)
		{
	
				var dl=getBallLeft(row,column);
				dl=dl+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
			
		}
			function movBallL(row,column)
		{
			
				var dl=getBallLeft(row,column);
				dl=dl-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
			
		}
		function movBallDR(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl+0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
			
		}
	
		function movBallUR(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl+0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
			
		}
		function movBallDL(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d+0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl-0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
				eval(s.toString());
			
		}
		function movBallUL(row,column)
		{
			
			var d=getBallTop(row,column);
				d=d-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				eval(s.toString());
				var dl=getBallLeft(row,column);
				dl=dl-0.09;
				var s= "document.getElementById(getIdBall(row,column)).style.left="+'"'+dl+"%"+'";';
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
		/////////////////////////////////////////////////////////on functions
		function onOutBall()
		{	
			putAllBallInPlace();
		 	hold=0;
			clickball=0;
			flagWait=0;
			topflag=-1;
			leftflag=-1;
		}
		var flagInBall=0;
		var topflag=-1;
		var leftflag=-1;
		var blackTurn=1;
		
		function longClickBall()
		{
			flagInBall=0;
			clickball=clickball+1;
			if(clickball>1)//to restart
			{
				clickball=0;
				hold=0;
				flagWait=0;
				topflag=-1;
				leftflag=-1;
				putAllBallInPlace();
				
			}
			placeX1=placeX;
			placeY1=placeY;
		
		}
		function mouseUp()
		{
				hold=0;
				flagWait=0;
				topflag=-1;
				leftflag=-1;
				putAllBallInPlace();
				
		}
		
		function onBall(e,id,row,column)
		{
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
				if((dy*dy)<0.3)//its left or right
				{
					if(dx>0)//its left
					{
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
		
		
	//////////////////////////////////////////	
		
		

		function onBallstart(e,id,row,column)//////////////////////////////////////////////////////////
		{
			if(clickball==0)
			{
			putAllBallInPlace();
			hold=0;
			}
			if(clickball==1)
			{
			hold=1;	
			if(topflag==0)//its down
				{
					if(leftflag==0)//its down right 
					{movBallDR(row,column);
					var mor5=0;
						if(row+1<5){mor5=1;}
					if(((realTop[row][column+mor5-1])-(getBallTop(row,column)))>1)	
					{
					var column5=column;
					if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row,column,row+1,column5+1))
						{
							movBallDR(row+1,column5+1);
							if((ifBallTouchFromUp(row+1,column5+1,row+2,column5+1))&&(places[row+1][column5+1]!=0))//////////////////
							{if(row+2>5){column5=column5-1;}
							movBallDR(row+2,column5+2);
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
					{
					var column5=column;
					if(row+1<=5){column5=column+1;}
						if(ifBallTouchFromUp(row,column,row+1,column5-1))
						{if(row+1<=5){column5=column+1;}
							movBallDL(row+1,column5-1);     
							if(places[row+1][column5-1]!=0){
							if((ifBallTouchFromUp(row+1,column5-1,row+2,column5))&&(places[row+1][column5-1]!=0))//////////////////
							{if(row+2<=5){column5=column5+1;}      
							movBallDL(row+2,column5-2);        //3
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
							if(blackTurn==1)
							{
							if(checkAndChangeDL(row,column,1)==-1)
							{id_ifLigal.innerHTML="not ligal move!!! wait for black ligal move";}
							else{id_ifLigal.innerHTML="wait for white move";blackTurn=0;}
							}
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
					{movBallUR(row,column);
						var mor5=0;
						if(row-1>=5){mor5=1;}
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;
					if(row-1>=5){column5=column5+1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{
							movBallUR(row-1,column5);
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))
							{if(row-2>=5){column5=column5+1;}
							movBallUR(row-2,column5);
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
					{movBallUL(row,column);
						var mor5=0;
						if(row-1<5){mor5=-1;}
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;
					if(row-1<5){column5=column5-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{
							movBallUL(row-1,column5);
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))
							{if(row-2<5){column5=column5-1;}
							movBallUL(row-2,column5);
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
						{
							movBallR(row,column);			
						if(ifBallTouchFromLeft(row,column,row,column+1))				
						{movBallR(row,column+1);
							if((ifBallTouchFromLeft(row,column+1,row,column+2))&&(places[row][column+1]!=0))
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
					{movBallL(row,column);
						if(ifBallTouchFromLeft(row,column-1,row,column))				
						{movBallL(row,column-1);
							if((ifBallTouchFromLeft(row,column-2,row,column-1))&&(places[row][column-1]!=0))
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
	
		
		}
		}//end onBallstart
		var flagWait=0;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function onRivalMove(row,column,dirUp,dirLeft)//////////////////////////////////////////////////////////
		{
		
			if(dirUp==0)//its down
				{
					if(dirLeft==0)//its down right 
					{
						var moveTime = setInterval(frame, 10);
			function frame() {
						movBallDR(row,column);//1
					var mor5=0;//the midle row
						if(row+1<5){mor5=1;}
					if(((realTop[row][column+mor5-1])-(getBallTop(row,column)))>1)	
					{
					var column5=column;
					if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row,column,row+1,column5+1))
						{
							movBallDR(row+1,column5+1);
							if((ifBallTouchFromUp(row+1,column5+1,row+2,column5+1))&&(places[row+1][column5+1]!=0))
							{if(row+2>5){column5=column5-1;}
							movBallDR(row+2,column5+2);
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
					{
					var column5=column;
					if(row+1<=5){column5=column+1;}
						if(ifBallTouchFromUp(row,column,row+1,column5-1))
						{if(row+1<=5){column5=column+1;}
							movBallDL(row+1,column5-1);    //2
							if(places[row+1][column5-1]!=0){
							if((ifBallTouchFromUp(row+1,column5-1,row+2,column5))&&(places[row+1][column5-1]!=0))//////////////////
							{if(row+2<=5){column5=column5+1;}      
							movBallDL(row+2,column5-2);         //3
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
						
						movBallUR(row,column);
						var mor5=0;
						if(row-1>=5){mor5=1;}
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;
					if(row-1>=5){column5=column5+1;}//if((row+1>5)&&(row>=5)){column5=column-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUR(row-1,column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))
							{if(row-2>=5){column5=column5+1;}
							movBallUR(row-2,column5);//3
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
								
						movBallUL(row,column);
						var mor5=0;
						if(row-1<5){mor5=-1;}
					if(((getBallTop(row,column))-(realTop[row-2][column+mor5-1]))>1)	
					{
					var column5=column;
					if(row-1<5){column5=column5-1;}
						if(ifBallTouchFromUp(row-1,column5,row,column))
						{//if(row-2>5){column5=column5+1;}
							movBallUL(row-1,column5);//2
							if((ifBallTouchFromUp(row-2,column5,row-1,column5))&&(places[row-1][column5]!=0))//////////////////
							{if(row-2<5){column5=column5-1;}
							movBallUL(row-2,column5);//3
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
						{
							movBallR(row,column);		
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
					{movBallL(row,column);
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
		
		}
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function checkAndChangeR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0))
			 {return -1;}
			
		 	////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();		
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
				{
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
						flagWait=1;
						return 1;
					}
					if(places[row][column+1]==color)
					{
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
						flagWait=1;
						return 1;
						}
						if(places[row][column+2]==abs(color-3))//abs(color-3))=the other color.2 ball in same color push rivel ball
						{  
							if((places[row][column+3]!=0)&&(flagWait==0)&&(places[row][column+3]!=-1)){return -1;}//2ball try to push 2 rivel ball or one ball of himself- not ligal
							
								//2 ball phush 1 ball in diferent color to a hole
								places[row][column]=0;
								places[row][column+2]=color;
								if(places[row][column+3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row,column+2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column+2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row,column+3,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column+3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row,column+4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column+4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
			 if(flagWait==0){return -1;}
		}
//////////////////////////////////////////		///////   ///////////////
		
		function checkAndChangeL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){return -1;}
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
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
								flagWait=1;
								return 1;			
								}
								if(places[row][column-3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row,column-2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column-2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row,column-3,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column-3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row,column-4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row,column-4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
			 if(flagWait==0){return -1;}
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
		function checkAndChangeDL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){return -1;}
				
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
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
								flagWait=1;
								return 1;			
								}
								if(places[row+3][column3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row+2,column2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+2,column2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row+3,column3,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+3,column3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row+4,column4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+4,column4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
		 if(flagWait==0){return -1;}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////end function
		function checkAndChangeDR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){return -1;}
			
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
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
								flagWait=1;
								return 1;			
								}
								if(places[row+3][column3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row+2,column2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+2,column2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row+3,column3,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+3,column3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row+4,column4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row+4,column4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
			 if(flagWait==0){return -1;}
		}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function checkAndChangeUR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){return -1;}
			
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
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
								flagWait=1;
								return 1;
								}
								if(places[row-3][column3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row-2,column2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row-2,column2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row-3,column3,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row-3,column3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row-4,column4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row-4,column4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
			 if(flagWait==0){return -1;}
		}
		function checkAndChangeUL(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{
			if((places[row][column]!=color)&&(flagWait==0)){return -1;}
			////////////////////////////////////////////////////////////////////
			var userRef = firebase.database().ref('/users/' + myRivalId);
		
			userRef.once('value').then(function(snapshot) {
			userData = snapshot.val();
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
								flagWait=1;
								return 1;			
								}
								if(places[row-3][column3]==-1)//2 ball push 1 ball out of the game
								{
									if(color==1){
										blackOut--;
										myMove(row-2,column2,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row-2,column2,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row-3,column3,25,91.5,(abs(color-3)));/////////////////////////mymmov
									}
									else{
										whiteOut--;
										myMove(row-3,column3,70,91.5,(abs(color-3)));
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
								{
									if(color==1){
										blackOut--;
										myMove(row-4,column4,25,91.5,(abs(color-3)));
									}
									else{
										whiteOut--;
										myMove(row-4,column4,70,91.5,(abs(color-3)));
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
				
				else if(flagWait==0){return -1;}
				}
			 if(flagWait==0){return -1;}
		}
	
	
		function onClickBall()
		{
			flagInBall=0;
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
				}
				else{
				firstIdClick=id;
				firstClickRow =row;
				firstClickColumn=column;
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
				firstClickRow =-1;
		        firstClickColumn=-1;				
	
			}
		
		}
		
	
