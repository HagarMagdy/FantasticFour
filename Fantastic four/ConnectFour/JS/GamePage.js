//Array of Cells In Table  0: Empty cell 1:ball of player 1 2:ball of player 2
arrayOfCells = [
 [0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0]
];

var pos = 0;                //Number Variable Store Position Of The Ball
var lastrow = 0;            //Number Variable Store The Position OF The First Free Cell In A Column
var player = 1;             //Number Variable Store The Selected Player==> player one=1,,player two=2
var flag = true;            //Boolean Variable Store The State OF KeyDown In It ==>true=pressed,false=not pressed
var level = 1;              //Number Variable Store The Level=>(Level one =1)&& (Level Two=2)
var p_name = " ";           //player Name Variable
var player1_score = 0;      //score of player one
var player2_score = 0;      //score of player two
var playagain = false;      //boolean variable to check the state of play_again button 

//Set Level
function setLevel(_level)
{
    level = _level;
};//end of Change_level function


//Check Player
function CheckPlayer()
{
    if (player == 1) {
        return 2;
    }
    else if (player == 2)
    {
        return 1
    }

};//end of CheckPlayer function

//Funcion To Genearte To A new Div corresponding player 
function GenerateNewDiv() {
        if (player == 1) {
            var divObj = document.createElement("div");
            divObj.setAttribute("id", "1")
            divObj.className = "cellA";
            player = 2;
            return divObj;
        }
        else if (player == 2) {
            var divObj = document.createElement("div");
            divObj.setAttribute("id", "2")
            divObj.className = "cellB";
            player = 1;
            return divObj;
        }
    
};//end of GenerateNewDiv function


//Function To get position Number
function getPosition()
{
    if (player == 1) {
        rand=6;
    }
    else rand =0;
    return rand;
};


//Function To Move the div
function Move(pos)
{
    tableObj.children[0].children[0].children[pos].appendChild(bObj);
};

//Function TO Fill Ball In A Table
function MoveDown()
{
    flag = false;
    lastrow = isEmpty(arrayOfCells, pos);//Check the first empty cell in a column
    posY = 0; //the pos of the ball in the column determined
    
    if (lastrow == -1)
    {
        flag = true;    //disable to put ball in the full column of balls
        //Check If All Columns Full of balls ,in this case the game is Drawn
        if (isEmpty(arrayOfCells, 0) == -1 && isEmpty(arrayOfCells, 1) == -1 && isEmpty(arrayOfCells, 2) == -1 && isEmpty(arrayOfCells, 3) == -1 && isEmpty(arrayOfCells, 4) == -1 && isEmpty(arrayOfCells, 5) == -1 && isEmpty(arrayOfCells, 6) == -1)
            {
                //Get the header of the modal
                headObj = document.getElementsByTagName("h2")[0];
                headObj.innerText = "Drwan";
                p_name = "No One";
                GenerateMyDiv();
            }
    }
    else {
        //put the ball in the selected position
        tm = setInterval(function ()
        {
            if (posY <= lastrow) {
                tableObj.children[0].children[++posY].children[pos].appendChild(bObj);
            }
            else
            {
                clearInterval(tm);
                bObj = new GenerateNewDiv();
                rand = getPosition();
                pos = rand;
                tableObj.children[0].children[0].children[rand].appendChild(bObj);
                flag = true;
               
            }
        }, 200);
        //set the value of determined player to the cell which the ball puted in it
        arrayOfCells[lastrow][pos] = CheckPlayer();
        //Check if any of two player win after each move
        Calc_Result(arrayOfCells);
    }

};//end of MoveDown function


//10.Function To Check The First Free Cell In The Column
function isEmpty(arr, cols)
{
    for (var i = 5; i >= 0 ; i--)
    {
        if (arr[i][cols] == 0)
        {
            return i;
        }
    }
    return -1;
};//end of isEmpty function

//Function To Reset All Cells To Zero After Finishing The Game(Not Used)
function rest_arr(arr) {
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
            arr[i][j] = 0;
        }
    }
};//end of rest_arr function

//Function To Remove All Divs After Finishing The Game (Not Used)
function rest_table()
{
    for (i = 0; i < 7; i++)
    {
        for (j = 0; j < 7; j++)
        {
            if (tableObj.children[0].children[i].children[j].childNodes[0] != null)
                tableObj.children[0].children[i].children[j].children[0].remove();

        }
    }
};//end of rest_table function

//Function To Calculate If Anyone of The Players Win After Each Move
function Calc_Result(arr)
{
    //If The winner is player one
    if (Check_winner(arr, level) == 1)
    {
        flag = false;
        setTimeout(function ()
        {
            //Remove the ball 
            for (var j = 0; j < 7; j++)
            {
                if (tableObj.children[0].children[0].children[j].childNodes[0] != null)
                    tableObj.children[0].children[0].children[j].children[0].remove();
            }
            //Call function responsple for making animation for win balls 
            MakeAnimation(level);
            flag = false;
            clearInterval(tm);
        }, 1200);
        //Call Add Score Function
        AddScore(1);
        setTimeout(function () {
            GenerateMyDiv();
        }, 3000);
        //set the name of the win player in the generated div
        p_name = document.getElementById("pl1").innerText;
        return 1;
    }
        //If The winner is player two
    else if (Check_winner(arr, level) == 2)
    {
        flag = false;
        setTimeout(function ()
        {
            for (var j = 0; j < 7; j++)
            {
                if (tableObj.children[0].children[0].children[j].childNodes[0] != null)
                    tableObj.children[0].children[0].children[j].children[0].remove();
            }
            //Call function responsple for making animation for win balls 
            MakeAnimation(level);
            flag = false;
            clearInterval(tm);
        }, 1400);
        //Call Add Score Function
        AddScore(2);
        setTimeout(function ()
        {
            GenerateMyDiv();
        }, 3000);
        //set the name of the win player in the generated div
        p_name = document.getElementById("pl2").innerText;
        return 2;
    }
};//end of Calc_Result function

//Function to Make Animation For Win Points
function MakeAnimation(_level)
{
    //determine the position of the winner balls
    b1 = tableObj.children[0].children[GetPoints()[0][0] + 1].children[GetPoints()[0][1]].children[0];
    b2 = tableObj.children[0].children[GetPoints()[1][0] + 1].children[GetPoints()[1][1]].children[0];
    b3 = tableObj.children[0].children[GetPoints()[2][0] + 1].children[GetPoints()[2][1]].children[0];
    b4 = tableObj.children[0].children[GetPoints()[3][0] + 1].children[GetPoints()[3][1]].children[0];
    if (level == 2)
        b5 = tableObj.children[0].children[GetPoints()[4][0] + 1].children[GetPoints()[4][1]].children[0];
    var counter = true;    //Boolean variable to make the change in color
    setInterval(function ()
    {
        if (counter == true)
        {
            b1.style.background = "yellow";
            b2.style.background = "yellow";
            b3.style.background = "yellow";
            b4.style.background = "yellow";
            if (level == 2)
                b5.style.background = "yellow";
            counter = false;
        }
        else
        {
            b1.style.background = "black";
            b2.style.background = "black";
            b3.style.background = "black";
            b4.style.background = "black";
            if (level == 2)
                b5.style.background = "black";
            counter = true;
        }
    }, 300);
};//end of MakeAnimation function
    
//Generate My Own Div
function GenerateMyDiv()
{
     Calc_Result(arrayOfCells);
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    //Get the paragraph element in the modal body
    modal_bodyObj = modal.children[0].children[1];
    modal_bodyObj.innerText = "The Winner Is " + p_name;
    
};//end of GenerateMyDiv function

//Function to add score 
function AddScore(_player)
{
    if (_player == 1) {
        if (localStorage.getItem("player1Score") != null) {
            player1_score = Number.parseInt(localStorage.getItem("player1Score")) + 1;
            localStorage.setItem("player1Score", player1_score);
        }
        else {
            player1_score += 1;
            pl1scoreObj.innerText = player1_score;
            localStorage.player1Score = player1_score;
        }
        var p = retrive(document.getElementById("pl1").innerText);
        p.setscore(player1_score);
        store(p);
    }
    else if (_player == 2)
    {
        if (localStorage.getItem("player2Score") != null) {
            player2_score = Number.parseInt(localStorage.getItem("player2Score")) + 1;
            localStorage.setItem("player2Score", player2_score);

        }
        else {
            player2_score += 1;
            pl2scoreObj.innerText = player2_score;
            localStorage.player2Score = player2_score;
        }
        var p = retrive(document.getElementById("pl2").innerText);
        p.setscore(player2_score);
        store(p);
    }
    
};//end of AddScore Function

//Load Function
window.addEventListener("load", function ()
{
    //Get the element of score of player one
    pl1scoreObj = document.getElementById("s1");
    //Get the element of score of player two
    pl2scoreObj = document.getElementById("s2");
    if (localStorage.playagain == "true")
    {
        if (localStorage.getItem("player1Score") != null)
            pl1scoreObj.innerText = localStorage.getItem("player1Score");
        if (localStorage.getItem("player2Score") != null)
            pl2scoreObj.innerText = localStorage.getItem("player2Score");

    }
    //check level,mode,copmlex and players names to get them if player play again
    if (localStorage.getItem("level") != null)
    {
        level =Number.parseInt(localStorage.getItem("level"));
    }
   
    if (localStorage.getItem("player1") != null)
    {
        document.getElementById("pl1").innerText= localStorage.getItem("player1");
    }
    if (localStorage.getItem("player2") != null)
    {
        document.getElementById("pl2").innerText=localStorage.getItem("player2");
    }
    //Generate New div
    bObj = new GenerateNewDiv();
    //Get object of the table of the game
    tableObj = document.getElementsByTagName("table")[0];
    //Generate a random position to put the ball in it
    rand = getPosition();
    //put the ball in this position
    tableObj.children[0].children[0].children[rand].appendChild(bObj);
    //get the body element to make events on it
    b = document.getElementsByTagName("body")[0];
    pos = rand;
    //All Events On Arrow and Enter Key
    b.onkeydown = function (e)
    {
        if (flag == true)
        {
            //Left arrow
            if ((e.keyCode || e.which) == 37)
            {
                if (pos > 0)
                {
                    pos--;
                    Move(pos);
                }
                else if (pos == 0)
                {
                    pos = 6;
                    Move(pos);
                }
            }
                //Right arrow
            else if ((e.keyCode || e.which) == 39)
            {
                if (pos < 6)
                {
                    pos++;
                    Move(pos);
                }
                else if (pos == 6)
                {
                    pos = 0;
                    Move(pos);
                }
            }
                //Down
            else if ((e.keyCode || e.which) == 40)
            {
                MoveDown(pos);
            }
            else if ((e.keyCode || e.which) == 13)
            {
                MoveDown(pos);
            }

        }
    };//end of key down event

    //Event On Mouse down
    tableObj.onmousedown = function (event)
    {
        if (flag == true)
        {
            if (event.target.tagName == "TD")
            {
                pos=event.target.cellIndex
                MoveDown(pos);
            }

        }
    };//end of mouse down event
    
    //Get the play agian button
    playagainObj = document.getElementsByName("playAgain")[0];
    //Get the exit button
    exitObj = document.getElementsByName("exit")[0];

    //onclick event for play agin button
    playagainObj.onclick = function (event)
    {
        localStorage.setItem("playagain", playagain);
        localStorage.playagain = true;
        location.reload();
    };//end of playagain button event


    //Onclick Event For Exit Button Make Page Exit
    exitObj.onclick = function ()
    {
        localStorage.playagain = false;
        localStorage.player1Score = 0;
        localStorage.player2Score = 0;
        window.open("index.html", '_self', '');        
    };//end of exit button event

    //Get the element of back button
    backObj = document.getElementById("btn_back");
    backObj.onclick = function () {
        localStorage.playagain = false;
        localStorage.player1Score = 0;
        localStorage.player2Score = 0;
window.open('../index.html', '_self', '');
    };//end of back button event
});//end of load function



