/*Global variables*/
var played = [];
var turn = 0 ;
var gameFinished =1;
var single;

var displayboard = function(board)
{
	    //cout<<"\n Display board called";
	    var i ,j;
	    for(i=0;i<3;i++)
	    {
	        for(j=0;j<3;j++)
	        {
	            if(board[i][j]=='e')
	                console.log("e");
	            else
	                console.log(board[i][j]);
	            if(j!=2)
	                console.log(" : ");
	        }
	        if(i!=2)
	            console.log("\n-----------");
	    }
	    console.log("\n");
};
var choice = function(board,empty,s,tur)
{
	//console.log("Choice called with empty = " + empty);
	var i,j,pos=0,max=-10,min=10;
	var t;
	if(s==='p')
	{
		t='c';
	}
	else {
		t='p';
	}
	//displayboard(board);
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			if(board[i][j]==='e')
			{
				board[i][j]=s;
				k=score(board,t,empty-1,tur);
				//console.log("Score was found to be " + k);
				board[i][j]='e';
				if(tur===s)
				{
						if(max<k)
						{
								pos=(i*3)+j;
								max=k;
						}
				}
				else
				{
						 if(min>k)
						{
								pos=(i*3)+j;
								min=k;
						}
				}
			}
		}
	}
	return pos;
};



var checkwinner = function(board)
{
   // cout<<"\n Check winner called ";
    if(board[0][0]===board[0][1] && board[0][1]===board[0][2] && board[0][0]!=='e')
        return board[0][0];
   // cout<<"\n First";
    /*if(board[1][0]==board[1][1] && board[1][1]==board[1][2])
        if(board[1][0]!='e')
            cout<<"\n Blah";*/
    if(board[1][0]===board[1][1] && board[1][1]===board[1][2] && board[1][0]!=='e')
        return board[1][0];
   // cout<<"\n Second";
    if(board[2][0]===board[2][1] && board[2][1]===board[2][2] && board[2][0]!=='e')
        return board[2][0];
   // cout<<"\n Third";
    if(board[0][0]===board[1][0] && board[1][0]===board[2][0] && board[0][0]!=='e')
        return board[0][0];
   // cout<<"\n Forth";
    if(board[0][1]===board[1][1] && board[1][1]===board[2][1] && board[0][1]!=='e')
        return board[0][1];
    //cout<<"\n Fifth";
    if(board[0][2]===board[1][2] && board[1][2]===board[2][2] && board[0][2]!=='e')
        return board[0][2];
   // cout<<"\n Sixth";
    if(board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!=='e')
        return board[0][0];
   // cout<<"\n Seventh";
    if(board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!=='e')
        return board[0][2];
   // cout<<"\n Eight";
    return 'f';
};
var score = function( board , s ,empty , tur)
{
		//console.log("Function score called with empty = " + empty);
    var win=checkwinner(board);
		//console.log(" win is " + win + " tur is " + tur);
    if(win==='p' && tur==='p')
        {  return 10;}
    else if(win==='c' && tur==='c')
        {  return 10;}
    else if(win==='c' && tur==='p')
        {return -10;}
    else if(win==='p' && tur==='c')
        {return -10;}
    else if(empty===0)
        return 0;
    else
    {
        var i,j,max=-10,k,min=10;
        var t;
    if(s==='p')
            t='c';
        else
            t='p';
        for(i=0;i<3;i++)
        {
            for(j=0;j<3;j++)
            {
               if(board[i][j]==='e')
                {
                    board[i][j]=s;
                    k=score(board,t,empty-1,tur);
                    board[i][j]='e';
                    if(tur===s)
                    {
                        if(max<k)
                        {
                            max=k;
                        }
                    }
                    else
                    {
                        if(min>k)
                        {
                            min=k;
                        }
                    }
                }
            }
        }
        if(tur===s)
            return max;
        else
            return min;
    }
};




var debug = function(log){
	/*set to false to stop debug*/
	if (true) {
		console.log(log);
	};
};

function Player (name) {
	this.name = name ;
	this.moves = new Array() ;
};
single = confirm("Do you want to play single player game ? ");
if(single)
{
	p1 = new Player(prompt("Enter Player's name !"));
	p2 = new Player("Computer");
}
else
{
	p1 = new Player(prompt("Enter First Player's name !"));
	p2 = new Player(prompt("Enter Second Player's name !"));
}
//p2 = new Player(prompt("Enter second player's name !"));

//p1 = new Player("Player1");


var ifNotPresent = function (cellID) {
	for (var i = 0; i < played.length ; i++) {
		if(played[i]===cellID){
			return false;
		}
	}
	played[played.length]=cellID;
	if (!turn) {p1.moves[p1.moves.length]=cellID;}
	else {p2.moves[p2.moves.length]=cellID};
	return true;
};

var find = function(A,m1){
	var r = A.indexOf(m1) > -1;
	//debug(A + " -> " + m1 + " = "+ r);
    return (r);
};

var checkMoves = function(A, m1, m2, m3){
	if (!find(A,m1)) {return false};
	if (!find(A,m2)) {return false};
	if (!find(A,m3)) {return false};
	return true;
};

var checkSequences = function (P1) {
	/*check if any one of eight combination has been
	fullfilled*/
	if(checkMoves(P1.moves, "a1", "a2", "a3")){return true;}
	if(checkMoves(P1.moves, "b1", "b2", "b3")){return true;}
	if(checkMoves(P1.moves, "c1", "c2", "c3")){return true;}
	if(checkMoves(P1.moves, "a1", "b1", "c1")){return true;}
	if(checkMoves(P1.moves, "a2", "b2", "c2")){return true;}
	if(checkMoves(P1.moves, "a3", "b3", "c3")){return true;}
	if(checkMoves(P1.moves, "a1", "b2", "c3")){return true;}
	if(checkMoves(P1.moves, "a3", "b2", "c1")){return true;}
	return false;
}
var initializeboard = function(board)
{
	for(var i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
			board[i][j]='e';
	}
};
var checkForWinner = function(){
	if (checkSequences(p1)) {$('#title').prepend(
		"<div id=\'title\'>"+p1.name+" won!</div>")
		gameFinished = 0};
	if (checkSequences(p2)) {$('#title').prepend(
		"<div id=\'title\'>"+p2.name+" won!</div>")
		gameFinished = 0};
};

var getno = function(id)
{
	switch(id)
	{
		case 'a1' : return 0;
		case 'b1' : return 1;
		case 'c1' : return 2;
		case 'a2' : return 3;
		case 'b2' : return 4;
		case 'c2' : return 5;
		case 'a3' : return 6;
		case 'b3' : return 7;
		case 'c3' : return 8;
	}
};

var getid = function(no)
{
	switch(no)
	{
		case 0 : return 'a1';
		case 1 : return 'b1';
		case 2 : return 'c1';
		case 3 : return 'a2';
		case 4 : return 'b2';
		case 5 : return 'c2';
		case 6 : return 'a3';
		case 7 : return 'b3';
		case 8 : return 'c3';
	}
};

jQuery(document).ready(function($) {
	var empty = 9 , i , j , k , temp,element;
	var board=new Array(3);
	for(i=0; i <3; i++)
    board[i]=new Array(3);
	initializeboard(board);
	$('.cell').click(function(){
		if(single)
			turn =0;
		if (ifNotPresent(this.id) && gameFinished){
			if(single)
			{
				$(this).append("<img src=\'cross.png\' id=\'symbol\'>");
				k=getno(this.id);
				board[Math.floor(k/3)][k%3]='p';
				empty--;
				turn = 1;
				k=choice(board,empty , 'c' ,'c');
				board[Math.floor(k/3)][k%3]='c';
				empty--;
				temp = getid(k);
				element = document.getElementById(temp);
				if (ifNotPresent(element.id) && gameFinished){
					$(element).append("<img src=\'circle.png\' id=\'symbol\'>");
				}
			}
			else
			{
				if (turn) {
				$(this).append("<img src=\'circle.png\' id=\'symbol\'>");
				turn = 0 ;
			} else{
				turn = 1 ;
				$(this).append("<img src=\'cross.png\' id=\'symbol\'>");
			}
			}
			checkForWinner();
		}
	});

});
