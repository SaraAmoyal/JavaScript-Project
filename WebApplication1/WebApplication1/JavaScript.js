
var points1, points2, size, sumOfClicked=0, z0=0, z1=0, playerNow = 0, player, myDiv;// the points of the second player are z0

function max(a, b) {
    if (a > b)
        return a;
    else
        return b;
}

function timing() {
    var time = document.getElementById("time");
    setInterval(function () { time.innerText = (new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()); }, 1000);
}

function starting() {
    document.getElementsByClassName("name")[0].innerHTML = document.getElementById("player1").value;//put the name near the points
    document.getElementsByClassName("name")[1].innerHTML = document.getElementById("player2").value;//put the name near the points
    size = document.getElementById("rows").value;//how mach rows he want

    if (size < 5 || size > 15){
        var c = document.getElementsByClassName("checking").innerText;
        c = "Please choose a number between 5 to 15!";
        setTimeout(function () { c = ""; }, 7000);
    }
    else {
        var t = document.getElementsByClassName("body2").innerHTML;//
        document.getElementById("rows").remove();
        document.getElementById("player1").remove();
        document.getElementById("player2").remove();
        document.getElementsByClassName("body2")[0].innerText = "";
        creating();
        
        //document.getElementsByClassName("body2").appendchild(t);//??
    }
}

function startAgain() {
    var arrpu, i, j, ezerarrpu;
    arrpu = document.getElementsByClassName("circle");
    j = arrpu.length;
    for (i = 0; i < j ; i++) {
        if (arrpu[i].dataset.clickedFlag != "0" && arrpu[i].classList.contains("purple"))
        {
         arrpu[i].classList.remove("purple");
         arrpu[i].dataset.clickedFlag = 0;
        }
    }
    z0 = 0; z1 = 0; sumOfClicked = 0;
    document.getElementsByClassName("label")[0].innerText = 0;
    document.getElementsByClassName("label")[1].innerText = 0;
}
 
function Ending() {
    var winner = document.createElement("p");
    if (z0 > z1)
        winner.innerText = "The second win!!!";
    else
        if (z1 > z0)
            winner.innerText = "The first win!!!";
        else
            if (!z1 && !z0)
                winner.innerText = "There is not a game.";
            else
                winner.innerText = "tie!";//teko
    var win = max(z0, z1);
    if (win > localStorage.getItem('climax'))
    { 
        localStorage.setItem('climax', win);
        document.getElementById("clim").innerText = localStorage.getItem('climax');
        //to dialog it
    }
    // document.getElementsByClassName("body2").appendChild(winner);
   // document.getElementsByClassName("winnn").height = 20;
    document.getElementsByClassName("winnn")[0].innerText = winner.innerText;//print the winner
    setTimeout(function () { window.location.href="HtmlPage2.html"; }, 5000);//refresh the parper
}

function check(el) {
    var i, j, arrEl, text, endGame = false, y = Number(size), arrClass = el.classList, len = arrClass.length-1;
    player.innerText = playerNow ? "The second" : "The first";
    for (i = 1; i < len && !endGame; i++) {//go on the circle of the classes
        
        arrEl = document.getElementsByClassName(arrClass[i]);
        var len2 = arrEl.length;
        for (j = 0; j < len2 && arrEl[j].dataset.clickedFlag!="0"; j++);//i fhe clicked
        if (j == len2)//if the all row with color
        {
            playerNow ? z1 += len2 : z0 += len2;
            document.getElementsByClassName("label")[0].innerText = z0;//print the point
            document.getElementsByClassName("label")[1].innerText = z1;//print the point
        }
    }
    if (sumOfClicked == ((((y + 1) * y) / 2)-3))//if all with color
    {
        endGame = true;
       // var z = createElement("dialog");
       // z.id = myDialog;
        //z.innerText="This is a dialog window";
        var z = document.getElementById("myDialog");
        z.show();
        document.body.style.backgroundColor = "darkgray";
        setTimeout(function () { z.close(); document.body.style.backgroundColor = "white";}, 5000);
    }
    if (endGame) {
        //myDiv.removeEventListener("click", play);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        var pointsEnd = document.getElementsByClassName("label");
        if (pointsEnd[0].innerText > pointsEnd[1].innerText)
        { document.getElementsByClassName("checking").innerText = "The first win"; }
        else
        { document.getElementsByClassName("checking").innerText ="The second win"; }
        Ending();
        //divWin = document.createElement("div");
        //divWin.innerText = text;
        document.getElementsByTagName("body")[0].appendChild(divWin);//print who wined
        //bigDiv.appendChild(divWin);
    }
}

function play() {
    var clickedEl = event.target;//save the clicked
    if (clickedEl.tagName == "P" && clickedEl.dataset.clickedFlag == 0)
    {  
        playerNow = !playerNow;//change the player
        clickedEl.classList += " purple";
        clickedEl.dataset.clickedFlag = 1;
        sumOfClicked++;//sum the clicked
        check(clickedEl);//send the clicked
    }
}

function creating() {
    myDiv = document.getElementById("grapes");
    player= document.createElement("p");
    player.style.backgroundColor = "purple";
    player.innerText = "The first";
    myDiv.appendChild(player);//that will show who the player
    var divLine, circle, x, row, myDiv, flag = 1;
    x = size;
    //myDiv.id = "grapes";
    myDiv.className = "center";
     // document.getElementsByClassName("game").appendChild(myDiv);
    if (flag) {
        flag = 0;
      for (var i = 0; i < size; i++) {
          divLine = document.createElement("div");
          divLine.className = "row" + " center";
          for (var j = x; j >0; j--) {
              circle = document.createElement("p");
              circle.className = "circle"+" row" + i + " rowRight" + j + " rowLeft" + (i + j);
              circle.dataset.clickedFlag = 0;//that will know if he clicked
              circle.addEventListener("click", play);
              divLine.appendChild(circle);
              if ((!i && (j == 1 || j == size)) || (i == size - 1))//pinot
              {
                  circle.style.backgroundColor = "purple";
                  circle.dataset.clickedFlag = 1;
              }
          }
          x--;
          myDiv.appendChild(divLine);
      }
      }
     // var startagain = document.createElement("button");
   //startagain.addEventListener("click", startAgain);
    //startagain.innerText = "To start again";
    //var b = document.getElementsByClassName("body2");
    //b.appendChild(startagain);
    //var ending = document.createElement("button");
    //ending.addEventListener("click", Ending);
    //ending.innerText = "To end";
    //document.getElementsByClassName("body2").appendChild(ending);
}

function start()
{
    document.getElementById("rows").addEventListener("blur", starting);
    timing();
    var myStorage = window.localStorage;
    if (!localStorage.getItem('climax'))//if the climax is null
        {
     // var climax = createElement("p");
     //climax.innerText = "The last climax: ";
     //document.getElementById("time").appendChild(climax);
     localStorage.setItem('climax', '0');
    }
     document.getElementById("clim").innerText = localStorage.getItem('climax');
    
}


