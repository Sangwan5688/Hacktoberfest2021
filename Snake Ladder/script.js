var number=1;
var a;
var j;
var n=1;
var m=0;
var dices=["","&#9856","&#9857","&#9858","&#9859","&#9860","&#9861"];
var id=100;
  
for (a=0;a<5;a++)
{
  for (b=0;b<=9;b++)
    { 
        if(document.getElementById("out")!=null)
      document.getElementById("out").innerHTML+="<div class='boardbox left' id='box"+id+"' ></div>"
      id--;
    }
  for (c=0;c<=9;c++)
    { 
        if(document.getElementById("out")!=null)
      document.getElementById("out").innerHTML+="<div class='boardbox right'id='box"+id+"'></div>"
      id--;
    }   
 } 
 if(document.getElementById("box"+number)!=null)
document.getElementById("box"+number).innerHTML="<img id='counter' class='img' src='http://www.freepngimg.com/thumb/chess/9-chess-pawn-png-image-thumb.png'></img>"
var play=function()
{  
  number=1;
  document.getElementById("out").style.visibility = "visible";
  document.getElementById("dice").style.visibility = "visible";
  document.getElementById("Play").style.visibility = "hidden";
  document.getElementById("dice").innerHTML=dices[1];
}
var random=function()
{   
 
  document.getElementById("dice").disabled=false;
  var dices=["","&#9856","&#9857","&#9858","&#9859","&#9860","&#9861"];
  a= Math.ceil(Math.random()*6);
  document.getElementById("dice").innerHTML=dices[a];
  if(n+a>100)
    {
      a=100-n;
     }
     d=0;
     move()
}
var move=function()
{
  document.getElementById("dice").disabled=true;
  t=setInterval(move2,200)
}
var move2=function()
{ 
  n++;
  m++;
  if(m<(a)||m==(a))
   { 
   if(d==(a-1))
       {
          if (n==5)
            {
               n=25;
            }
          else if (n==10)
            {
               n=29;
            }
          else if (n==22)
            {
               n=41;
            }
          else if (n==28)
            {
               n=55;
            }
          else if (n==44)
            {
               n=95;
            }
          else if (n==70)
            {
               n=89;
            }
          else if (n==79)
            {
               n=81;
            }
          else if (n==99)
            {
               n=7;
            }
          else if (n==92)
            {
               n=35;
            }
          else if (n==73)
            {
               n=53;
            }
          else if (n==78)
            {
               n=39;
            }
          else if (n==37)
            {
               n=17;
            }
         else if (n==31)
            {
               n=14;
            }
         else
           {
              n=n;
           }
       }
       var s=document.getElementById("counter");
       document.getElementById("box"+n).appendChild(s); 
       d+=1;
     }
   else
     {
        m=0;
        n-=1;
        clearInterval(t);
        document.getElementById("dice").disabled=false;
     }
}