const CODE = "612";
var userInput = ['*', '*', '*'];

function attemptEscape() {
  if (CODE == userInput.join("")) {
    document.getElementById("locked").style.display = "none";
    document.getElementById("unlocked").style.display = "block";
    window.location.href = "../leaderboard/leaderboard.html";
  }
  userInput = ['*', '*', '*'];
  document.getElementById("num-screen").innerText = userInput.join("");
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

document.getElementById("player-name").textContent = localStorage.getItem('userName') ?? 'Profile Name';
