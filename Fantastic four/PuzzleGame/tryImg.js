var enableTimer=false;
var imagePut = false;
var counterShape=0;
var flagPlayOn=false;
var timerOn=false;
var timeAgain=true;
var myNewSound = new sound("mySound.mp3");
var myNewSound2=new sound("mySound2.mp3");

var modal = document.getElementById("myModal");
    modal.style.display = "none";

		function startTime(){
      if(timerOn && timeAgain)
      {
         for(i=1;i<=9;i++)
        {
         document.getElementById(i).style.background="";
        document.getElementById("0"+i).style.borderColor = "buttonface";
        }
         document.getElementById('timer').innerHTML = 00+ ":" +60;
			   enableTimer=true;
         startTimer();
      }
		}
   
   function startTimer() {
       	 flagPlayOn=true;
         myNewSound.play();
       	 if(enableTimer)
		 {
	
		   timeAgain=false;
       	  var presentTime = document.getElementById('timer').innerHTML;
          var timeArray = presentTime.split(/[:]+/);
          m = timeArray[0];
          s = checkSecond((timeArray[1] - 1)); 
          if(s<=00){//alert('Time Out!!!')
			 GenerateMyDiv("Time Out!");
		     timeAgain=true;}
         document.getElementById('timer').innerHTML = m + ":" + s;
         if(s>00)
         setTimeout(startTimer, 1000);

		 }
       }

       function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec};
        return sec;

      }

     function finishTime() {
      myNewSound.stop();
      if(timerOn)
       { 
       enableTimer=false; 
	   timeAgain=true;
       startTimer();
        }
      }

      function  getId(newElement) {
      if(flagPlayOn)
      {	
       myImg = document.getElementById(newElement);
       myImg.style.background='url(images/' + lastId + '.jpg) no-repeat';
       myImg.style.backgroundSize = "100% 100%";
       if((myElement+"0"+newElement) == lastId )
       {
       	counterShape++;
       }
      } 
}

 function  getInfo(myLastElement) {
 	  if(flagPlayOn)
 	  {	 
 	    lastId= myElement+myLastElement;
      myNewSound2.play();
      document.getElementById(myLastElement).style.borderColor = "red";
     } 
}


function  checkResult() {
  if(timerOn)
    {
        k=1
		if(counterShape==9)
		{ 
			//alert("congratulations!!");
			GenerateMyDiv("congratulations!");
			timeAgain=true;

		}
		else
		{
			 //alert("Game Over!!");
			 GenerateMyDiv("Game Over!");
			 timeAgain=true;
		}
  }
}


 function  changeImage(element) {
 	myElement=element;
  timerOn=true;
    for(j=1;j<=9;j++)
    {
      document.getElementById("0"+j).style.background='url(images/' + element+"0"+j+ '.jpg) no-repeat'; 
      document.getElementById("0"+j).style.borderColor = "buttonface";
       document.getElementById(j).style.background="";
    }  
    document.getElementById("0").src= 'images/' + element + '.jpg';
    document.getElementById('timer').innerHTML = 00+ ":" +60;    
}

 function getHelp(){

        //alert('choose picture then click on Start game button then click on pic you want to move and click where you want to place finally click on Finish game when you finish')
         GenerateMyDiv("choose picture then click on Start game button then click on pic you want to move and click where you want to place finally click on Finish game when you finish");
         }
       
     
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


function GenerateMyDiv(msg)
{

    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    //Get the paragraph element in the modal body
		document.getElementById("msg").innerHTML=msg;
    //modal_bodyObj = modal.children[1].children[1];
    //modal_bodyObj.innerText = msg;
    
};//end of GenerateMyDiv function

