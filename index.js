const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create auth token
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'This username or email is already associated with an account'})
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);

        res.send({ id: user._id });
    }
});

// Get auth token
apiRouter.post('/auth/login', async (req, res) => {
    console.log("in login endpoint");
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
    console.log("unauthorized");
});

// Delete auth token when logging out
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie("token");
    res.status(204).end();
});

// Get user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

// secure router to verify user is logged in
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies["token"];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//Get Scores
secureApiRouter.get('/scores', async (_req, res) => {
    const scores = await DB.getScores();
    res.send(scores);
});

// Submit New Score
secureApiRouter.post('/score', async (req, res) => {
    await DB.addScore(req.body);
    const scores = await DB.getScores();
    res.send(scores);
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function setAuthCookie(res, authToken) {
    res.cookie("token", authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}
