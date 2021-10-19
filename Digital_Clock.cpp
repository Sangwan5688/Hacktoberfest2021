<!DOCTYPE html>
<html lang="en">
<head>
 <style>  
 .date {
    
    height: 10rem;
    width: 100%;
    display: flex;
    justify-content:center;
    
    
    }
    header{
        text-align: center;
        font-size: 8rem;
        border-bottom: black;
        border: 10px;
        border-style: groove;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif, 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18, -36px 2px 0px rgba(205,155,206,0);
    }
#time {
  
    height: 10rem;
    width: 100%;
    display: flex;
    justify-content:center;
}
section{
    border:10px blue;
    border-radius: 0%;
    border-style:ridge ;  
margin-top: 2%;
 font-size: 5rem;
background-color: black;}
.date,#time {
font-size: 80px;
text-align: center;
/*  Neon Yellow: #FFFF00 #FFFF33 #F2EA02 #E6FB04
	Neon Red: #FF0000 #FD1C03 #FF3300 #FF6600  */
color:#FD1C03 ;
text-shadow: 0 0 5px rgb(95, 255, 130), 0 0 10px rgb(224, 64, 64), 0 0 15px #235485, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #007a00, 0 0 35px #19ffe0;
animation: blinker 1s linear infinite;
}

@keyframes blinker {
100% {
  opacity: 0.9;
}
}



}
body{
  
background: #004FF9;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #FFF94C, #004FF9);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #FFF94C, #004FF9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
section {
    text-shadow:
    0 1px #395461,
    -1px 0 #cdd2d5,
    -1px 2px #808d93,
    -2px 1px #cdd2d5,
    -2px 3px #808d93,
    -3px 2px #cdd2d5,
    -3px 4px #808d93,
    -4px 3px #cdd2d5,
    -4px 5px #808d93,
    -5px 4px #cdd2d5,
    -5px 6px #808d93,
    -6px 5px #cdd2d5,
    -6px 7px #808d93,
    -7px 6px #cdd2d5,
    -7px 8px #808d93;
    font-weight: 900;
}
 </style>
 <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body onload="showtime()">
    <header>DIGITAL CLOCK</header>
    <section>
        <div class="date"></div>
        <div id="time"></div>
    </section>

  
   <script src="script.js"></script> 
</body>
</html>
