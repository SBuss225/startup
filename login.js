function signup() {
    const userNameEl = document.getElementById("s-username");
    const emailEl = document.getElementById("s-email");
    const passwordEl = document.getElementById("s-password");

    localStorage.setItem("username", userNameEl.value);
    localStorage.setItem("email", emailEl.value);
    localStorage.setItem("password", passwordEl.value);
    localStorage.setItem("escaped", false);

    window.location.href = "play/play.html";
}

function login() {
    const userNameEl = document.getElementById("l-username");
    const passwordEl = document.getElementById("l-password");

    localStorage.setItem("username", userNameEl.value);
    localStorage.setItem("password", passwordEl.value);
    localStorage.setItem("escaped", false);

    window.location.href = "play/play.html";
}