async function loadScores() {
    let scores = [];

    try {
        const response = await fetch('/api/scores');
        scores = await response.json();

        console.log("successfully fetched scores from api: \n", scores);

        localStorage.setItem('scores', JSON.stringify(scores));
        const test = localStorage.getItem('escapeTime');
        console.log("TEST: ", test);
        displayScores(scores, true);
    } catch {
        console.log("error: couldn't fetch scores from api")
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        displayScores(scores, false);
    }

    
}

function displayScores(scores, success) {
    const tableBody = document.querySelector('#scores');

    if (!success) {
        tableBody.innerHTML = '<tr><td colSpan=4>Log in to view the leaderboard</td></tr>';
        return;
    }

    if (scores.length === 0) {
        tableBody.innerHTML = '<tr><td colSpan=4>No one has ever escaped this room. Will you be the first?</td></tr>';
        return;
    }

    for (const [i, score] of scores.entries()) {
        const currPosition = document.createElement('td');
        const currName = document.createElement('td');
        const currTime = document.createElement('td');
        const currDate = document.createElement('td');

        currPosition.textContent = i + 1;
        currName.textContent = score.name;
        currTime.textContent = score.time;
        currDate.textContent = score.date;

        const currRow = document.createElement('tr');
        currRow.appendChild(currPosition);
        currRow.appendChild(currName);
        currRow.appendChild(currTime);
        currRow.appendChild(currDate);

        tableBody.appendChild(currRow);
    }
}

loadScores();


