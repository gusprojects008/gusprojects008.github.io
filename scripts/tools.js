const timer = document.getElementById("timer");
const reminder = document.getElementById("reminder");
const startStopContinue = document.getElementById("start-stop-continue");
const restart = document.getElementById("restart");
const tasksCompleted = document.getElementById("task-completed");
const output = document.querySelectorAll("output");

let countdown; // store numeric id of the setInterval()
let totalMs = 0;

function getUserTimeMs() {
  let hours = parseInt(document.querySelector('#input-numbers input[name="hours"]').value) || 0;
  let minutes = parseInt(document.querySelector('#input-numbers input[name="minutes"]').value) || 0;
  let seconds = parseInt(document.querySelector('#input-numbers input[name="seconds"]').value) || 0;
  let milliseconds = parseInt(document.querySelector('#input-numbers input[name="milliseconds"]').value) || 0;
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
}

function displayTime(ms) {
  let hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  let minutes = Math.floor(ms / 60000);
  ms %= 60000;
  let seconds = Math.floor(ms / 1000);
  let milliseconds = ms % 1000;

  timer.textContent = 
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(3, '0')}`;
}

function startTimer() {
  totalMs = getUserTimeMs();
  
  if (totalMs <= 0) {
     alert("Set a valid time!");
  }

  clearInterval(countdown);

  countdown = setInterval(() => {
    if (totalMs <= 0) {
       clearInterval(totalMs);
       alert("Timeout!");
    } else {
      totalMs -= 10;
      displayTime(totalMs);
    }
  }, 10)
}

startStopContinue.addEventListener("click", startTimer);
restart.addEventListener("click", () => {
  clearInterval(countdown);
  timer.textContent = "00:00:00:000";
})
