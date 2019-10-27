
		
		function init()
		{
		onBtnName();
		the_input.value= "enter your name";
		the_h1.innerHTML= "shalom";
		putRealTopAndLeft();
		//putNewBallLinear(1,1,20,28);
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

		for (var i = 0; i < places.length; i++) 
			places[i] = new Array(11);
	
		
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
				
				
		console.log(places);
		
		
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
				console.log(s);
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
			console.log("the top is"+d);
				d=d-0.15;
				var s= "document.getElementById(getIdBall(row,column)).style.top="+'"'+d+"%"+'";';
				//console.log(s);
				eval(s.toString());
				var dl=getBallLeft(row,column);
				console.log("the left is"+dl);
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
		{putAllBallInPlace();
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
		if((blackWin==0)&&(whiteWin==0))
		{
			id.style.cursor = "pointer";
			if(flagInBall==0)
			{	
			var	dy=(placeY1-placeY);
			var dx=(placeX1-placeX);
			if( ((dy*dy)>9) || ((dx*dx)>9) )
			{
				flagInBall=1;
				console.log("good");
				if((dy*dy)<0.3)//its left or right
				{
					if(dx>0)//its left
					{
						console.log("its left");
						topflag=2;//not up and not down
						leftflag=1;
						onBallstart(e,id,row,column);
					}
				else{
						console.log("its right");
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
						console.log("its down-left");
						topflag=0;
						leftflag=1;
						onBallstart(e,id,row,column);
						}
					else{
						console.log("its down-right");
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
						console.log("its up-left");
						topflag=1;
						leftflag=1;
						onBallstart(e,id,row,column);
						}
					else{
						console.log("its up-right");
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
			}
	//		id.style.cursor = "pointer";
			if(clickball==1)
			{
		//movballToPoint(1,1,20,20);
			if(topflag==0)//its down
				{
					if(leftflag==0)//its down right 
					{movBallDR(row,column);console.log("leftflag= "+leftflag);//1
					var mor5=0;
						if(row+1<5){mor5=1;}
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
						 }	
					}
					else if(leftflag==1)//its down left
					{var mor5=0;
						if(row+1>5){mor5=1;}
						movBallDL(row,column);
					if(((realTop[row][column-mor5-1])-(getBallTop(row,column)))>1)	
					{console.log("leftflag= "+leftflag);console.log("getBallTop(row,column-mor5)="+getBallTop(row,column)+"  realTop[row][column-mor5]"+realTop[row][column-mor5]);//1
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
						 }
					}//////////////
				}
				//////////////end down options
			else if(topflag==1)//its up
				{
					if(leftflag==0)//its up right 
					{movBallUR(row,column);console.log("leftflag= "+leftflag);//1
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
						 }
					}////////////////
					else if(leftflag==1)//its up left
					{movBallUL(row,column);console.log("leftflag= "+leftflag);
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
						 }
					}
					

				}
			else if(topflag==2)//its flat
				{////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if(leftflag==0)//its right 
					{
						if(((realLeft[row-1][column])-(getBallLeft(row,column)))>1)
						{console.log("realLeft[row][column+1]="+realLeft[row-1][column]+"  getBallLeft(row,column)="+getBallLeft(row,column));
							movBallR(row,column);console.log("leftflag= "+leftflag);//1			
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
						}
					}
					else if(leftflag==1)//its left
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
						}
				
				}
	
		
		}console.log(places);
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
		
		function checkAndChangeR(row,column,color)//color:if its 1 color=black,if its 2 color = white
		{console.log("------------------------------");
			if((places[row][column]!=color)&&(flagWait==0)){console.log("geeeeeeeeeeettttttttttttt   hhhhhhhhheeeeeeerrrrrrrreeeeeeeee000000");return -1;}
			
		  
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
		
	
