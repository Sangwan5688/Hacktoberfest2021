// BY Engineer Elhamuddin Taheri
// getting elements by DOM:
let hours = document.querySelector("#hours")
let minutes = document.querySelector("#minutes")
let seconds = document.querySelector("#seconds")
let mseconds = document.querySelector("#mseconds")
let start = document.querySelector("#start")
let pause = document.querySelector("#pause")
let reset = document.querySelector("#reset")
let submit = document.querySelector("#submit")
let laps = document.querySelector("#laps")

// timing function:
var _msec = 0;
var _sec = 0;
var _min = 0;
var _hor = 0;
function _timer(){
    _msec++
    mseconds.textContent = _msec
    if(_msec === 99){
        _sec++
        _msec = 0

        seconds.textContent = _sec
        if(_sec === 59){
            _min++
            _sec = 0

            minutes.textContent = _min
            if(_min === 59){
                _hor++
                _min = 0;
                hours.textContent = _hor
            }
        }
        
    }
}

// adding events to the start button

start.addEventListener("click",e => {
    var temp= setInterval(_timer,10)
    
        pause.addEventListener("click",e => {
        clearInterval(temp)
    })
    
        reset.addEventListener("click",e => {
        clearInterval(temp)
        _msec = 0;    
        _sec = 0;   
        _min = 0;
        _hor = 0;
        mseconds.textContent = 00
        seconds.textContent = 00
        minutes.textContent = 00
        hours.textContent = 00
    })

})




submit.addEventListener("click",e => {
    laps.textContent = `${_hor} : ${_min} : ${_sec} : ${_msec}`
})












