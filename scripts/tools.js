function getMsTimeInput(elementId) {
  let hours = parseInt(document.querySelector(`${elementId} input[name="hours"]`).value) || 0;
  let minutes = parseInt(document.querySelector(`${elementId} input[name="minutes"]`).value) || 0;
  let seconds = parseInt(document.querySelector(`${elementId} input[name="seconds"]`).value) || 0;
  let milliseconds = parseInt(document.querySelector(`${elementId} input[name="milliseconds"]`).value) || 0;
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
}

function formatTime(ms, negative = false) {
  const absoluteMs = Math.abs(ms);
  
  let hours = Math.floor(absoluteMs / 3600000);
  let remainingMs = absoluteMs % 3600000;
  let minutes = Math.floor(remainingMs / 60000);
  remainingMs %= 60000;
  let seconds = Math.floor(remainingMs / 1000);
  let milliseconds = remainingMs % 1000;

  const timeString = 
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(3, '0')}`;
  
  return negative ? `-${timeString}` : timeString;
}

function displayTime(ms, element) {
  element.textContent = formatTime(ms);
}

function displayNegativeTime(ms, element, mainTimer = null) {
  element.textContent = formatTime(ms, true);
  if (mainTimer) mainTimer.textContent = formatTime(ms, true);
}

function playTimerSound(AudioObj) {
  AudioObj.currentTime = 0;
  AudioObj.play().catch(error => {
    console.error("Audio play failed:", error, AudioObj);
  });
}

function stopTimerSound(AudioObj) {
  AudioObj.pause();
  AudioObj.currentTime = 0;
}

function Timer() {
  const timerSound = new Audio("/statics/audios/clock-alarm-8761.mp3");
  timerSound.loop = true;
  const volumeSlider = document.getElementById("timer-volume-input");
  const playSound = document.getElementById("play-test-sound");
  let isPlaySound = false;
  const timer = document.getElementById("timer");
  let btnTimer = document.getElementById("timer-start-stop-continue");
  const restartTimer = document.getElementById("timer-restart");
  
  let totalMsTimer = 0;
  let timerNegativeTime = 0;
  let timerInterval;
  let negativeIntervalSignal = {"active": false, "negativeTimerId": null};
  let timerRunning = false;
  let timerTimeout = false;

  function showTimerTimeoutPopup() {
    const popup = document.createElement('div');
    popup.id = 'timer-timeout-popup';
    popup.classList.add("popup-timeout");

    popup.innerHTML = `
      <h3>Timer Timeout!</h3>
      <p>Timeout!</p>
      <p>Now: <span id="timer-negative-time">-00:00:00:000</span></p>
      <button id="timer-timeout-ok">OK</button>
    `;
    
    document.body.appendChild(popup);
    
    const negativeTimerElement = document.getElementById('timer-negative-time');
    
    negativeIntervalSignal.negativeTimerId = setInterval(() => {
      negativeIntervalSignal.active = true;
      timerNegativeTime += 10;
      displayNegativeTime(timerNegativeTime, negativeTimerElement, timer);
    }, 10);
    
    document.getElementById('timer-timeout-ok').addEventListener('click', () => {
      stopTimerSound(timerSound);
      if (negativeIntervalSignal.negativeTimerId) {
        clearInterval(negativeIntervalSignal.negativeTimerId);
        negativeIntervalSignal.active = false;
        negativeIntervalSignal.negativeTimerId = null;
      }

      timerNegativeTime = 0;
      timerTimeout = false;
      timer.textContent = "00:00:00:000";
      document.body.removeChild(popup);
      btnTimer.textContent = "Start";
      btnTimer.dataset.mode = "normal";
      btnTimer.replaceWith(btnTimer.cloneNode(true));
      btnTimer = document.getElementById("timer-start-stop-continue");
      btnTimer.addEventListener("click", startTimer);
    });
    
    setTimeout(() => {
      if (document.body.contains(popup)) {
        /*if (negativeIntervalSignal.negativeTimerId) {
          clearInterval(negativeIntervalSignal.negativeTimerId);
          negativeIntervalSignal.active = false;
          negativeIntervalSignal.negativeTimerId = null;
        }*/
        document.body.removeChild(popup);
        timerTimeout = true;
      }
    }, 10000);
  }

  function startTimer() {
    if (timerRunning) {
      stopTimerSound(timerSound);
      clearInterval(timerInterval);
      timerRunning = false;
      btnTimer.textContent = "Continue";
      return;
    }
    
    if (timerTimeout) {
      timerNegativeTime = 0;
      timerTimeout = false;
    }

    if (totalMsTimer <= 0) {
      totalMsTimer = getMsTimeInput("#timer-input-numbers");
    }

    if (totalMsTimer <= 0) {
      alert("Set a valid time!");
      return;
    }
  
    clearInterval(timerInterval);
    timerRunning = true;
    btnTimer.textContent = "Stop";

    const startTime = Date.now();
    const initialTime = totalMsTimer;

    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      totalMsTimer = Math.max(0, initialTime - elapsed);

      if (totalMsTimer <= 0) {
        playTimerSound(timerSound);
        clearInterval(timerInterval);
        timerRunning = false;
        
        showTimerTimeoutPopup();
        
        const newBtnTimer = btnTimer.cloneNode(true);
        btnTimer.parentNode.replaceChild(newBtnTimer, btnTimer);
        btnTimer = newBtnTimer;
        
        btnTimer.textContent = "Stop";
        
        btnTimer.addEventListener("click", function stopNegativeTimer() {
          stopTimerSound(timerSound);
          if (negativeIntervalSignal.negativeTimerId) {
            clearInterval(negativeIntervalSignal.negativeTimerId);
            negativeIntervalSignal.active = false;
            negativeIntervalSignal.negativeTimerId = null;
          }
                 
          const currentNegativeElement = document.getElementById('timer-negative-time');
          if (currentNegativeElement) {
            displayNegativeTime(timerNegativeTime, currentNegativeElement, timer);
          }
          
          btnTimer.textContent = "Start";
          btnTimer.dataset.mode = "normal";
          btnTimer.replaceWith(btnTimer.cloneNode(true));
          btnTimer = document.getElementById("timer-start-stop-continue");
          btnTimer.addEventListener("click", startTimer);
        });
      } else {
        displayTime(totalMsTimer, timer);
      }
    }, 10);
  }

  volumeSlider.addEventListener("input", () => {
    timerSound.volume = volumeSlider.value;
  });

  playSound.addEventListener("click", () => {
    if (!isPlaySound) {
      isPlaySound = true;
      stopTimerSound(timerSound);
      playTimerSound(timerSound);
    } else {
      stopTimerSound(timerSound);
      isPlaySound = false;
    }
  });

  btnTimer.addEventListener("click", startTimer);
  
  restartTimer.addEventListener("click", () => {
    stopTimerSound(timerSound);
    clearInterval(timerInterval);
    
    if (negativeIntervalSignal.negativeTimerId) {
      stopTimerSound(timerSound);
      clearInterval(negativeIntervalSignal.negativeTimerId);
      negativeIntervalSignal.active = false;
      negativeIntervalSignal.negativeTimerId = null;
    }
    
    timerNegativeTime = 0;
    totalMsTimer = 0;
    timerRunning = false;
    timerTimeout = false;
    timer.textContent = "00:00:00:000";
    btnTimer.textContent = "Start";
    btnTimer.dataset.mode = "normal";
    btnTimer.replaceWith(btnTimer.cloneNode(true));
    btnTimer = document.getElementById("timer-start-stop-continue");
    btnTimer.addEventListener("click", startTimer);
    
    const popup = document.getElementById('timer-timeout-popup');
    if (popup) {
      document.body.removeChild(popup);
    }
  });
}

function TasksTimer() {
  const taskTimersSound = new Audio("/statics/audios/alarm-327234.mp3");
  taskTimersSound.loop = true;
  const volumeSlider = document.getElementById("tasktimer-volume-input");
  const playSound = document.getElementById("tasktimer-play-test-sound");
  let isPlaySound = false;
  let addTaskBtn = document.getElementById("add-task");
  const tasksContainer = document.getElementById("tasks");
  let tasks = [];
  let taskTimers = {};

  function addTask() {
    const taskId = Date.now();
    const taskName = document.querySelector('#reminder input[name="task-name"]').value || `Task-${taskId}`;
    const taskTime = getMsTimeInput("#reminder");
    const startTime = new Date().toLocaleString();

    const task = {
      id: taskId,
      name: taskName,
      time: taskTime,
      startTime: startTime,
      negativeTime: 0,
      completed: false,
      running: false,
      timeout: false
    };

    tasks.push(task);
    renderTasks();

    if (taskTime > 0) {
      startTaskTimer(taskId);
    }
  }

  function startTaskTimer(taskId) {
    const task = tasks.find(t => t.id === taskId);

    if (!task) return;

    if (task.running) {
      stopTimerSound(taskTimersSound);
      clearInterval(taskTimers[taskId].intervalId);
      task.running = false;
      updateTaskDisplay(taskId);
      return;
    }

    if (task.timeout) {
      task.negativeTime = 0;
      task.timeout = false;
    }

    task.running = true;
    updateTaskDisplay(taskId);

    const startTime = Date.now();
    const initialTime = task.time;

    taskTimers[taskId] = {
      intervalId: setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = initialTime - elapsed;
        if (remainingTime <= 0) {
          playTimerSound(taskTimersSound);
          clearInterval(taskTimers[taskId].intervalId);
          task.timeout = true;
          task.running = false;
          task.negativeTime = Math.abs(remainingTime);
          showTaskTimeoutPopup(taskId);
          updateTaskDisplay(taskId);
        } else {
          task.time = remainingTime;
          updateTaskDisplay(taskId);
        }
      }, 10),
      negativeTimerId: null
    };
  }

  function showTaskTimeoutPopup(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const popup = document.createElement('div');
    popup.id = `task-timeout-popup-${taskId}`;
    popup.classList.add("popup-timeout");

    popup.innerHTML = `
      <h3>Task Timeout: ${task.name}</h3>
      <p>Started: ${task.startTime}</p>
      <p>Time passed: <span id="task-negative-time-${taskId}">${formatTime(task.negativeTime, true)}</span></p>
      <button id="task-timeout-ok-${taskId}">OK</button>
    `;

    document.body.appendChild(popup);

    const startNegativeTime = task.negativeTime;
    const negativeStartTime = Date.now();

    taskTimers[taskId].negativeTimerId = setInterval(() => {
      const negativeElapsed = Date.now() - negativeStartTime;
      task.negativeTime = startNegativeTime + negativeElapsed;
      
      const negativeTimeElement = document.getElementById(`task-negative-time-${taskId}`);
      if (negativeTimeElement) {
        negativeTimeElement.textContent = formatTime(task.negativeTime, true);
      }
      updateTaskDisplay(taskId);
    }, 10);

    document.getElementById(`task-timeout-ok-${taskId}`).addEventListener('click', () => {
      stopTimerSound(taskTimersSound);
      clearInterval(taskTimers[taskId]?.intervalId);
      clearInterval(taskTimers[taskId]?.negativeTimerId);
      task.completed = true;
      document.body.removeChild(popup);
      updateTaskDisplay(taskId);
    });

    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
        updateTaskDisplay(taskId);
      }
    }, 10000);
  }

  function updateTaskDisplay(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const taskElement = document.getElementById(`task-${taskId}`);
    if (!taskElement) return;

    const timeElement = taskElement.querySelector('.task-time');
    const actionBtn = taskElement.querySelector('.task-action-btn');

    if (task.timeout) {
      task.completed = true;
      timeElement.textContent = `Timeout: ${formatTime(task.negativeTime, true)}`;
      actionBtn.textContent = 'OK';
    } else if (task.completed) {
      timeElement.textContent = 'Completed';
      actionBtn.textContent = 'Remove';
    } else {
      timeElement.textContent = formatTime(task.time, false);
      actionBtn.textContent = task.running ? 'Pause' : 'Start';
    }
  }

  function renderTasks() {
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.id = `task-${task.id}`;
      taskElement.className = 'task';

      taskElement.innerHTML = `
        <div class="task-text">${task.name}</div>
        <div class="task-start-time">${task.startTime}</div>
        <div class="task-time">${formatTime(task.time, false)}</div>
        <div id="task-buttons">
          <button class="task-action-btn" data-id="${task.id}">${task.running ? '▶️' : 'Start'}</button>
          <button class="task-reset" data-id="${task.id}">Reset</button>
          <button class="task-remove" data-id="${task.id}">Remove</button>
        </div>
      `;

      tasksContainer.appendChild(taskElement);
    });

    document.querySelectorAll('.task-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        const task = tasks.find(t => t.id === taskId);

        if (task && task.completed) {
          removeTask(taskId);
        } else if (task && task.timeout) {
          //task.completed = true;
          updateTaskDisplay(taskId);
        } else {
          startTaskTimer(taskId);
        }
      });
    });

    document.querySelectorAll('.task-reset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        resetTask(taskId);
      });
    });

    document.querySelectorAll('.task-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        removeTask(taskId);
      });
    });

    if (tasks.length > 0) {
      const removeAllBtn = document.createElement('button');
      removeAllBtn.textContent = 'Remove All Tasks';
      removeAllBtn.className = 'btn-tasks-all-remove';
      removeAllBtn.addEventListener('click', removeAllTasks);
      tasksContainer.appendChild(removeAllBtn);
    }
  }

  function resetTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    stopTimerSound(taskTimersSound);

    if (taskTimers[taskId]) {
      clearInterval(taskTimers[taskId].intervalId);
      clearInterval(taskTimers[taskId].negativeTimerId);
    }

    task.time = getMsTimeInput("#reminder");
    task.running = false;
    task.timeout = false;
    task.completed = false;
    task.negativeTime = 0;
    task.startTime = new Date().toLocaleString();

    updateTaskDisplay(taskId);
  }

  function removeTask(taskId) {
    if (taskTimers[taskId]) {
      clearInterval(taskTimers[taskId].intervalId);
      clearInterval(taskTimers[taskId].negativeTimerId);
      delete taskTimers[taskId];
    }
    stopTimerSound(taskTimersSound);
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
  }

  function removeAllTasks() {
    Object.values(taskTimers).forEach(timer => {
      stopTimerSound(taskTimersSound);
      if (timer.intervalId) clearInterval(timer.intervalId);
      if (timer.negativeTimerId) clearInterval(timer.negativeTimerId);
    });

    tasks = [];
    taskTimers = {};
    renderTasks();
  }

  volumeSlider.addEventListener("input", () => {
    taskTimersSound.volume = volumeSlider.value;
  });

  playSound.addEventListener("click", () => {
    if (!isPlaySound) {
      isPlaySound = true;
      stopTimerSound(taskTimersSound);
      playTimerSound(taskTimersSound);
    } else {
      stopTimerSound(taskTimersSound);
      isPlaySound = false;
    }
  });

  addTaskBtn.addEventListener("click", addTask);
}

document.addEventListener("DOMContentLoaded", () => {
  const toolsContainer = document.getElementById("tools-container");
  const expandBtn = document.getElementById("expand-tools");

  expandBtn.addEventListener("click", () => {
    const isExpanded = toolsContainer.classList.toggle("expanded");
    toolsContainer.classList.toggle("collapsed", !isExpanded);
    expandBtn.querySelector(".arrow").classList.toggle("expanded", !isExpanded);
  });

  const links = document.querySelectorAll("#tools-list a");
  const contents = document.querySelectorAll(".tool-content");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      console.log(link.dataset.tool);
      const toolId = link.dataset.tool;

      contents.forEach(c => c.classList.remove("active"));
      document.getElementById(toolId).classList.add("active");
    });
  });
});

Timer();
TasksTimer();

