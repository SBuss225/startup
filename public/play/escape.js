const CODE = "612";
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

var userInput = ['*', '*', '*'];
var playerName = getPlayerName();

function attemptEscape() {
  
  if (CODE == userInput.join("")) {
    document.getElementById("locked").style.display = "none";
    document.getElementById("unlocked").style.display = "block";
    localStorage.setItem("escaped", true);
    this.clearTimer();
    this.saveScore();
    window.location.href = "../leaderboard/leaderboard.html";
  }
  userInput = ['*', '*', '*'];
  document.getElementById("num-screen").innerText = userInput.join("");
}

function pauseTime() {
  let escapeTime = START_TIME - timeLeft;
  hours = Math.floor((escapeTime % (HOUR * 24)) / HOUR);
  minutes = Math.floor((escapeTime % HOUR) / MINUTE);
  seconds = Math.floor((escapeTime % MINUTE) / SECOND);
  let timeString = hours + ":" + minutes + ":" + seconds;
  localStorage.setItem("escapeTime", timeString);
  localStorage.setItem("timerStatus", "paused");
}

function displayAdvice(data) {
  const adviceEl = document.getElementById("advice");
  adviceEl.textContent = data.slip.advice;
}

function getPlayerName() {
  return localStorage.getItem('username') ?? 'Guest';
}

function getUnhelpfulAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      displayAdvice(data);
    });
}

function hasEscaped() {
  return escaped;
}

function pressKey(key) {
  document.getElementById("locked").style.display = "block";
  document.getElementById("unlocked").style.display = "none";
  
  if (userInput.find(char => char === '*') == undefined) {
    return;
  }
  
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] == '*') {
      userInput[i] = key;
      break;
    }
  }
  
  document.getElementById("num-screen").innerText = userInput.join("");
}

async function saveScore() {
  const name = this.getPlayerName();
  const date = new Date().toLocaleDateString();
  const time = localStorage.getItem("escapeTime");
  const newScore = { name: name, time: time, date: date };

  try {
    const response = await fetch('/api/score', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    })

    const allScores = await response.json();
    localStorage.setItem('scores', JSON.stringify(allScores));
  } catch {
    console.log("TODO: handle error in escape.js");
  }
}

function clearTimer() {
  localStorage.setItem("timerStatus", "none");
}

function startTimer() {
  clearTimer();
  timer.startTimer();
}

function displayTime(timeLeftHours, timeLeftMinutes, timeLeftSeconds) {
  hoursEl.textContent = timeLeftHours + ":";
  minutesEl.textContent = timeLeftMinutes + ":";
  secondsEl.textContent = timeLeftSeconds;
}

var countDownTime;
var timerStatus;
var timeLeft;
var timeLeftHours;
var timeLeftMinutes;
var timeLeftSeconds;

const HOUR = 3600000;
const MINUTE = 60000;
const SECOND = 1000;
const START_TIME = 3600000;

class Timer {

  constructor() {
    this.startTimer();
  }

  startTimer() {
    timerStatus = localStorage.getItem("timerStatus");
    console.log("timerStatus: ", timerStatus);
    if (timerStatus !== "running" && window.location.href !== 'http://localhost:3000/play/play.html') {
      countDownTime = new Date().getTime() + HOUR;
      localStorage.setItem("countDownTime", countDownTime);
      localStorage.setItem("timerStatus", "running");
      timerStatus = "running";
    }
    else {
      countDownTime = localStorage.getItem("countDownTime");
    }
  }

  updateTimer = setInterval( function updateTimer() {
    if (timerStatus === "running" && window.location.href !== 'http://localhost:3000/play/play.html') {
        var currTime = new Date().getTime();
        timeLeft = countDownTime - currTime;
        timeLeftHours = Math.floor((timeLeft % (HOUR * 24)) / HOUR);
        timeLeftMinutes = Math.floor((timeLeft % HOUR) / MINUTE);
        timeLeftSeconds = Math.floor((timeLeft % MINUTE) / SECOND);
        displayTime(timeLeftHours, timeLeftMinutes, timeLeftSeconds);
    }
  }, 1000);

  getFinalTime() {
      let escapeTime = START_TIME - timeLeft;
      this.timeLeftHours = Math.floor((escapeTime % (HOUR * 24)) / HOUR);
      this.timeLeftMinutes = Math.floor((escapeTime % HOUR) / MINUTE);
      this.timeLeftSeconds = Math.floor((escapeTime % MINUTE) / SECOND);
      let timeString = timeLeftHours + ":" + timeLeftMinutes + ":" + timeLeftSeconds;
      return timeString;
  }
}

var timer = new Timer();
