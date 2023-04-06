
let authenticated = localStorage.getItem('authenticated') ?? false;
if (authenticated === "true") {
    setDisplay('play', 'block');
    setDisplay('leaderboard', 'block');
} else {
    setDisplay('play', 'none');
    setDisplay('leaderboard', 'none');
}


function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
}