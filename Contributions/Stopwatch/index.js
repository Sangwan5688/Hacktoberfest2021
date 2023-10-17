let timer;
let running = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

const display = document.querySelector('.display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        startStopButton.textContent = 'Start';
    } else {
        timer = setInterval(updateDisplay, 10);
        running = true;
        startStopButton.textContent = 'Stop';
    }
}

function updateDisplay() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    display.textContent = formatTime(minutes) + ':' + formatTime(seconds) + '.' + formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function reset() {
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    display.textContent = '00:00.00';
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
