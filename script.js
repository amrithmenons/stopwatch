
let startTime = 0, 
    elapsedTime = 0, 
    timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopButton.innerText = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startStopButton.innerText = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    display.innerText = '00:00:00.0';
    startStopButton.innerText = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        laps.appendChild(lapItem);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    display.innerText = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}
