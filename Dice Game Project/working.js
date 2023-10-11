var a= prompt("Enter player 1 name :")
var b= prompt("Enter player 2 name :")

// document.getElementById("play1").innerHTML="PLAYER 1:"+a;
// document.getElementById("play2").innerHTML="PLAYER 2:"+b;

document.getElementById("butt").addEventListener("click",function(){

    let c= Math.floor(Math.random() * 6);
    switch(c)
    {
        case 0:
             document.getElementsByClassName(".roll_again").src="resources/dice1.png";
             break;
        case 1:
            document.getElementById("img1").src="resources/dice2.png";
            break;
        case 2:
            document.getElementById("img1").src="resources/dice3.png";
            break;
        case 3:
            document.getElementById("img1").src="resources/dice4.png";
            break;
        case 4:
            document.getElementById("img1").src="resources/dice5.png";
            break;
        case 5:
            document.getElementById("img1").src="resources/dice6.png";
            break;

    }

    let d= Math.floor(Math.random() * 6);
    switch(d)
    {
        case 0:
             document.getElementById("img2").src="resources/dice1.png";
             break;
        case 1:
            document.getElementById("img2").src="resources/dice2.png";
            break;
        case 2:
            document.getElementById("img2").src="resources/dice3.png";
            break;
        case 3:
            document.getElementById("img2").src="resources/dice4.png";
            break;
        case 4:
            document.getElementById("img2").src="resources/dice5.png";
            break;
        case 5:
            document.getElementById("img2").src="resources/dice6.png";
            break;

    }

    if(c>d)
    {
        alert("Player1  WON !");
    }

    else if(d>c)
    {
        alert("Player 2  WON!");
    }

    else{
        alert("MATHCH DRAW !")
    }
})