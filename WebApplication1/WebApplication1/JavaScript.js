
var points1, points2, size, sumOfClicked=0, z0=0, z1=0, playerNow = 0, player, myDiv;

function max(a, b) {
    if (a > b)
        return a;
    else
        return b;
}

function timing() {
    var time = document.getElementById("time");
    setInterval(function () {
        time.innerText = (new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
    }, 1000);
}

function starting() {
    document.getElementsByClassName("name")[0].innerHTML = document.getElementById("player1").value;
    document.getElementsByClassName("name")[1].innerHTML = document.getElementById("player2").value;
    size = document.getElementById("rows").value;

    if (size < 5 || size > 15){
        var c = document.getElementsByClassName("checking").innerText;
        c = "Please choose a number between 5 to 15!";
        setTimeout(function () { c = ""; }, 7000);
    }
    else {
        var t = document.getElementsByClassName("body2").innerHTML;
        document.getElementById("rows").remove();
        document.getElementById("player1").remove();
        document.getElementById("player2").remove();
        document.getElementsByClassName("body2")[0].innerText = "";
        creating();
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
                winner.innerText = "tie!";
    var win = max(z0, z1);

    if (win > localStorage.getItem('climax'))
    { 
        localStorage.setItem('climax', win);
        document.getElementById("clim").innerText = localStorage.getItem('climax');
    }

    document.getElementsByClassName("winnn")[0].innerText = winner.innerText;
    setTimeout(function () { window.location.href="HtmlPage2.html"; }, 5000);
}

function check(el) {
    var i, j, arrEl, text, endGame = false, y = Number(size), arrClass = el.classList, len = arrClass.length-1;
    player.innerText = playerNow ? "The second" : "The first";

    for (i = 1; i < len && !endGame; i++) {
        arrEl = document.getElementsByClassName(arrClass[i]);
        var len2 = arrEl.length;

        for (j = 0; j < len2 && arrEl[j].dataset.clickedFlag!="0"; j++);
        if (j == len2)
        {
            playerNow ? z1 += len2 : z0 += len2;
            document.getElementsByClassName("label")[0].innerText = z0;
            document.getElementsByClassName("label")[1].innerText = z1;
        }
    }

    if (sumOfClicked == ((((y + 1) * y) / 2)-3))
    {
        endGame = true;
        var z = document.getElementById("myDialog");
        z.show();
        document.body.style.backgroundColor = "darkgray";
        setTimeout(function () { z.close(); document.body.style.backgroundColor = "white";}, 5000);
    }

    if (endGame) {
        var pointsEnd = document.getElementsByClassName("label");
        if (pointsEnd[0].innerText > pointsEnd[1].innerText)
        { document.getElementsByClassName("checking").innerText = "The first win"; }
        else
        { document.getElementsByClassName("checking").innerText ="The second win"; }
        Ending();
        document.getElementsByTagName("body")[0].appendChild(divWin);
    }
}

function play() {
    var clickedEl = event.target;

    if (clickedEl.tagName == "P" && clickedEl.dataset.clickedFlag == 0)
    {  
        playerNow = !playerNow;
        clickedEl.classList += " purple";
        clickedEl.dataset.clickedFlag = 1;
        sumOfClicked++;
        check(clickedEl);
    }
}

function creating() {
    myDiv = document.getElementById("grapes");
    player= document.createElement("p");
    player.style.backgroundColor = "purple";
    player.innerText = "The first";
    myDiv.appendChild(player);
    var divLine, circle, x, row, myDiv, flag = 1;
    x = size;
    myDiv.className = "center";

    if (flag) {
        flag = 0;
      for (var i = 0; i < size; i++) {
          divLine = document.createElement("div");
          divLine.className = "row" + " center";
          for (var j = x; j >0; j--) {
              circle = document.createElement("p");
              circle.className = "circle"+" row" + i + " rowRight" + j + " rowLeft" + (i + j);
              circle.dataset.clickedFlag = 0;
              circle.addEventListener("click", play);
              divLine.appendChild(circle);

              if ((!i && (j == 1 || j == size)) || (i == size - 1))
              {
                  circle.style.backgroundColor = "purple";
                  circle.dataset.clickedFlag = 1;
              }
          }
          x--;
          myDiv.appendChild(divLine);
      }
    }
}

function start()
{
    document.getElementById("rows").addEventListener("blur", starting);
    timing();
    var myStorage = window.localStorage;
    if (!localStorage.getItem('climax'))
    {
     localStorage.setItem('climax', '0');
    }
     document.getElementById("clim").innerText = localStorage.getItem('climax');
}


