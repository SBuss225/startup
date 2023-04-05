const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

const currDate = new Date();
const dateString = currDate.getMonth() + "/" + currDate.getDate();

//Get Scores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
});

//Submit New Score
apiRouter.post('/score', (req, res) => {
    scores = updateScores(req.body, scores);
    res.send(scores);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let scores = [];
function updateScores(newScore, scores) {
    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (newScore.score > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
        }
    }

    if (!found) {
        scores.push(newScore);
    }
    
    if (scores.length > 5) {
        scores.length = 5;
    }

    return scores;
}
