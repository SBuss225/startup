const CODE = "612";
var userInput = ['*', '*', '*'];
var playerName = getPlayerName();

function attemptEscape() {
  if (CODE == userInput.join("")) {
    document.getElementById("locked").style.display = "none";
    document.getElementById("unlocked").style.display = "block";
    localStorage.setItem("escaped", true);
    this.saveScore("30 minutes");
    window.location.href = "../leaderboard/leaderboard.html";
  }
  userInput = ['*', '*', '*'];
  document.getElementById("num-screen").innerText = userInput.join("");
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

async function saveScore(time) {
  const name = this.getPlayerName();
  const date = new Date().toLocaleDateString();
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
