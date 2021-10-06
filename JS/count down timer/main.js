let timerBtn = document.querySelector(".container").lastElementChild;
let publicMinute = 0;
let startAndPause = document.querySelector(".container span:first-of-type");
let i =0;
let intervalID;



let setTime = () => {
  let minute = prompt("set a number of minutes");
  if(minute !== null){
    while(minute > 60) {
    alert("enter a number smaller than 60")
    minute = prompt("set a number of minutes");
  }
    while(minute < 0) {
    alert("enter a number greater than 0")
    minute = prompt("set a number of minutes");
  }
    while(isNaN(parseInt(minute))) {
    alert("enter a number not a character")
    minute = prompt("set a number of minutes");
  }
  clearInterval(intervalID);
  let timer = document.querySelector(".timer");
  minute = parseInt(minute);
  timer.innerHTML = minute >= 10 ? minute+":00" : "0"+minute+":00";
  publicMinute = minute;
  }
  
}
timerBtn.addEventListener("click",setTime);


startAndPause.onclick = () => {
  
  let time = document.querySelector(".timer").innerHTML;
  let currentMinute = parseInt(time.slice(0,time.indexOf(":")));
  let currentSecs = parseInt(time.slice(time.indexOf(":")+1,time.length));

  if(i % 2 === 0){
    startAndPause.innerHTML = "pause";
    startAndPause.style.setProperty("color","#e74320");
    timerBtn.removeEventListener("click",setTime)
    timerBtn.style.setProperty("color","#ccc")
    var j = setInterval(counting,1000) ;
    intervalID = j;
    function counting () {
      currentSecs--;
      if(currentSecs === -1){
        if(currentMinute === 0){
          // ending functionality
          
          clearInterval(j);
          startAndPause.innerHTML = "play_arrow";
          startAndPause.style.setProperty("color","#52c6ba");
          timerBtn.addEventListener("click",setTime);
          timerBtn.style.setProperty("color","#ffbb30")
          i++;
        }else{
          // new minute Functionality 
          currentMinute--;
          currentSecs = 60;
          
        }
      }else{
        
        startAndPause.previousElementSibling.innerHTML = `${currentMinute >= 10 ? currentMinute : "0"+currentMinute}:${currentSecs >= 10 ? currentSecs : "0"+currentSecs}`;
      }
      
    }
  
  }else{
    // stoping functionality
    
    clearInterval(intervalID);
    startAndPause.innerHTML = "play_arrow";
    startAndPause.style.setProperty("color","#52c6ba");
    timerBtn.addEventListener("click",setTime);
    timerBtn.style.setProperty("color","#ffbb30")
  }
  i++;
}


// reset Time 
let reset = document.querySelector(".container span:nth-of-type(2)");
reset.onclick = () => {
  clearInterval(intervalID);
  let timer = document.querySelector(".timer");
  timer.innerHTML = `${publicMinute >= 10 ? publicMinute : "0"+publicMinute}:00`;
  i=0;
  startAndPause.innerHTML = "play_arrow";
  startAndPause.style.setProperty("color","#52c6ba");
  timerBtn.addEventListener("click",setTime);
  timerBtn.style.setProperty("color","#ffbb30")
}
