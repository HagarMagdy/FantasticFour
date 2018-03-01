
window.addEventListener("load", function () {

    //get buttons on form 
    var btn_names = document.getElementsByClassName("button")[0];

    // get div section on form
    var section_names = document.getElementsByClassName("section")[0];
    var section_level = document.getElementsByClassName("section")[1];


    // get textboxs on form
    var name1 = document.getElementsByName("name")[0];
    var name2 = document.getElementsByName("name2")[0];


    //define player obejects
    player1 = new _player();
    player2 = new _player();


    var gmLevel = 1;    //for game level


    //radio buttons on form
    var radiolevel = document.getElementById("r1");



    //action on out from textbox 2 -- validation
    name1.onblur = function () {

        if (name1.value.trim() == "") {
            document.getElementById("n1").style.visibility = "visible";
            return false;
        }
        else {
            document.getElementById("n1").style.visibility = "hidden";
            return true;
        }

    };//end onblur

    //action on out from textbox 3 -- validation
    name2.onblur = function () {

        if (name2.value.trim() == "") {
            document.getElementById("n2").style.visibility = "visible";
            return false;
        }
        else {
            document.getElementById("n2").style.visibility = "hidden";
            return true;
        }

    };//end onblur


    //action on submit names
    btn_names.onclick = function () {
        var text1 = document.getElementsByName("name")[0].value;
        var text2 = document.getElementsByName("name2")[0].value;


        if (name1.onblur() && name2.onblur()) {

            section_names.className = "section";
            section_level.className = "section is-active";

        }
    };//end on click

    //action on submit game complex for computer

    //get button start
    btn_submit = document.getElementsByName("start")[0];
    // action on start game
    btn_submit.onclick = function (e) {

        //get text boxes values
        var name1 = document.getElementsByName("name")[0].value;
        var name2 = document.getElementsByName("name2")[0].value;

        // get current date
        dateObj = new Date();
        // CurrentDate = dateObj.getDay() + "-" + dateObj.getMonth() + "-" + dateObj.getYear() + " " + dateObj.getHours() + ":" + dateObj.getMinutes();

        if (radiolevel.checked) {
            gmLevel = 1;
            ;
        }
        else {
            gmLevel = 2;
        }
        gmMode = 1;
        player1 = new _player(name1, player1.getscore());
        player2 = new _player(name2, player2.getscore());
        store(player1);
        store(player2);
        localStorage.setItem("player1Score", 0);
        localStorage.setItem("player2Score", 0);
        localStorage.setItem("level", gmLevel);
        localStorage.setItem("player1", name1);
        localStorage.setItem("player2", name2);

        open("ConnectFour.html", "_self");

    };//end on click

});
