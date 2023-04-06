(async () => {
    var authenticated = localStorage.getItem('authenticated') ?? false;
    console.log("authenticated: ", authenticated);

    console.log("test");
    if (authenticated) {
        setDisplay('play', 'block');
        setDisplay('leaderboard', 'block');
    } else {
        setDisplay('play', 'none');
        setDisplay('leaderboard', 'none');
    }
})();

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
}