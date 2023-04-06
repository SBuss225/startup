(async () => {
    let authenticated = false;
    localStorage.setItem("authenticated", false);
    const userName = localStorage.getItem('username');
    if (userName) {
      const nameEl = document.querySelector('#l-username');
      nameEl.value = userName;
      const user = await getUser(nameEl.value);
      authenticated = user?.authenticated;
      localStorage.setItem("authenticated", user?.authenticated);
    }
  
    if (authenticated) {
      document.querySelector('#playerName').textContent = "current Player: " + userName;
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
      setDisplay('play', 'block');
      setDisplay('leaderboard', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
      setDisplay('play', 'none');
      setDisplay('leaderboard', 'none');
    }
})();

async function getUser(email) {
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
}

async function signup() {    
    localStorage.setItem('escaped', false);

    const username = document.getElementById("s-username").value;
    const password = document.getElementById("s-password").value;

    const response = await fetch(`/api/auth/create`, {
        method: 'post',
        body: JSON.stringify({ email: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem("authenticated", true);
        window.location.href = 'play/play.html';
    } else {
        const errorEl = document.querySelector('#error');
        errorEl.textContent = "ERROR OCCURRED: " + body.msg;
        console.log("error with creating new user, TODO: improve error handling");
    }
}

async function login() {
    const endpoint = `/api/auth/login`;
    localStorage.setItem('escaped', false);

    const username = document.getElementById("l-username")?.value;
    const password = document.getElementById("l-password")?.value;

    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: username, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem("authenticated", true);
        window.location.href = 'play/play.html';
    } else {
        const errorEl = document.querySelector('#error');
        errorEl.textContent = "ERROR OCCURRED: " + body.msg;
        console.log("error with creating new user, TODO: improve error handling");
    }
}

function play() {
    window.location.href = 'play/play.html';
}
  
function logout() {
    localStorage.setItem("authenticated", false);
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
}