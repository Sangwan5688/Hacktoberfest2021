
// set of the end of the time
var countDownDate = new Date("Jan 1, 2022 00:00:00").getTime();

// renew the count per 1 sec
var x = setInterval(function() {

  // get the present date
  var now = new Date().getTime();
    
  // to get the distance
  var distance = countDownDate - now;
    
  // counting of the time, days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // set the output to the element "id = demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // if the countdown end
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

// use "id = demo" for your html element to see the output.
