const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const username = "SBuss225";//process.env.MONGOUSER;
const password = "BYUCS2023";//process.env.MONGOPASSWORD;
const hostname = "cluster0.fdpj9qb.mongodb.net";//process.env.MONGOHOSTNAME;

if (!username || !password || !hostname) {
    throw Error("Error with MongoDB, make sure env vars are set");
}

const url = `mongodb+srv://${username}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const scoreCollection = client.db('startup').collection('score');

function getUser(email) {
    console.log("getting user from db");
    return userCollection.findOne({ email: email });
}
  
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}
  
async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
}
  
function addScore(score) {
    scoreCollection.insertOne(score);
}
  
function getScores() {
    const query = {};
    const options = {
      sort: { score: 1 },
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}
  
module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getScores,
};