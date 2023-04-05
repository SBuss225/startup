# 4/5 - Other Startup info
- Random public apis: https://apilist.fun/ 
- Advice api used in my startup: https://api.adviceslip.com/?ref=apilist.fun

# 3/29 - Simon Websocket

### Creating a Websocket
- const wss = new WebSocketServer({ noServer: true });
- protocol upgrade from HTTP to WebSocket
- track connections: wss.on('connection', (ws) => { const connection = id: uuid.v4(), alive: true, ws: ws }; connections.push(connection));

### Send info over socket
- const event = { <JSObject> };
- this.socket.send(JSON.stringify(event));

# 3/27 - Simon Login

### Setting up Routers
- var apiRouter = express.Router(); // standard router
- var secureApiRouter = express.Router(); // verifies credentials before passing on request
- apiRouter.use(secureApiRouter)

### Functions related to logging in/out
- apiRouter.post(<function>, async (req, res) => {});
- '/auth/create'
- '/auth/login'
- '/auth/logout'
- '/user/:email' // gets info about a user based on an email var

### Calling endpoints
const response = await fetch(endpoint, {

    method: 'post',
    
    body: JSON.stringify({ email: userName, password: password }),
    
    headers: {
    
      'Content-type': 'application/json; charset=UTF-8',
      
    },
    
  });
  
  const body = await response.json();

# 3/25 - Simon DB

### Set up env vars for production website
- ssh into website
- sudo nano /etc/environment
- add user, password, and hostname env vars like below:

export MONGOUSER=<username>
export MONGOPASSWORD=<password>
export MONGOHOSTNAME=<hostname>

### Mongo setup in js with env vars:
- const userName = process.env.MONGOUSER;
- const password = process.env.MONGOPASSWORD;
- const hostname = process.env.MONGOHOSTNAME;

### Mongo connection url
- const url = `mongodb+srv://${userName}:${password}@${hostname}`;

### Create Mongo Client in JS
- const client = new MongoClient(url);

### Basic MongoDB functions
- collection = client.db('<dbName>').collection('<collectionName>');
- collection.insertOne(<jsObject>) // Object in JSON format
- query = {<jsObject>: {$gt: 0}}; // gt = greater than
- options = { sort: {<jsObject>: -1}, limit: 10, }; // sort 1 = ascending, -1 = descending
- cursor = collection.find(query, options); // find() with no parameters returns everything
- cursor.toArray()

### Connecting express and MongoDB
- const DB = require('<databaseFunctionsFile>');
- call db functions in html request functions

example:
// GetScores
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

# 3/22 - Web Services

- Configure directory to work with Node.js: npm init -y
- Set up express: npm install express
- Main files should be under a 'public' directory within the project

Running simon command: ./deployService.sh -k C:\Users\sarah\Desktop\CS260\cs260W2023.pem -h ucanescape.click -s simon

# 3/10 - Startup JS tips

- Command to deploy website: ./deployFiles.sh -k C:\Users\sarah\Desktop\CS260\cs260W2023.pem -h ucanescape.click -s startup

- you can store things in localStorage

    localStorage.setItem("userName", HTMLElement.value);
   
    localStorage.getItem("userName");

- you can set the window location in js

    window.location.href = "page.html";

- you can set hue, saturation, and light level from js

    this.element.style.backgroundColor = `hsl(hue, 100%, level)`;

- you can load audios in, set volume, and play

    const sound = new Audio(filename);
    
    sound.volume = 1;
    
    sound.onended = [DO SOMETHING];
    
    sound.play();
    
    error sound = 'error.mp3';
    
- you can set the length of an array: array.length = 10;

- you can create an array from a map of values 

    array = Array.from(this.myMap.values());

- there's a date type (new Date().toLocaleDateString())

- you can create html elements from js

    const tableData = document.createElement('td'); // for table data
    
    const tableRow = document.createElement('tr'); // for table row
    
    tableRow.appendChild(tableData);

- when doing a for-loop, you can loop through multiple items each time

    const [i, score] of array.entries()


# 2/25 - General Tips

-align-items: center and justify-content: center centers items

-justify-content also has the options space-around, space-between, and space-evenly

-website for picking color schemes: https://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF

-website for getting color hex codes: https://htmlcolorcodes.com/color-picker/

-gradient builder: https://cssgradient.io/

-button example styles: https://getcssscan.com/css-buttons-examples

# 2/21 - Simon CSS

A pretty important thing that I learned today was that you have to link the css stylesheet in the html. A lot of the work that I've been doing with html and css has been on already created code that I just edit or add to, so I haven't had a ton of experience setting everything up myself.

# 2/8 - Simon HTML

Command to run simon on my domain: ./deployFiles.sh -k C:\Users\sarah\Desktop\CS260\cs260W2023.pem -h ucanescape.click -s simon

URL for simon: https://simon.ucanescape.click/about.html

I learned the most about scripts today, looking at how the deployFiles was set up. I could interpret what all of it meant more or less, but there was a lot of syntax that I wasn't used to.

# 2/1 - Amazon Web Services: Route 53

Web Server URL: http://ucanescape.click/

# 1/30 - Amazon Web Services: EC2

Web Server Public IP address: 3.13.185.126

Command to ssh into a web server: ssh -i [key pair file] ubuntu@[ip address]

# 1/27 - Startup Specs: The Escape Room

I have a cool idea for a simple web game that users could play together on any browser. Escape rooms are becoming more and more popular as group activities, but going to escape rooms in person can be expensive and inconvenient, especially for people who live far away from each other or from escape room facilities. My suggestion is a simple online escape room where users follow clues and solve puzzles in order to escape from a locked room before time runs out. High scores will be posted along with team names on a leaderboard to encourage friendly competition, and the escape room will provide an engaging yet simple puzzle activity for friends, families, and strangers alike to play together. 

Key Features
-Ability to create and login with a team username
-Several display screens for each side of the room
-Interactable puzzles
-Leaderboard with fastest completion speeds 
-Personal best information persistently stored

Concept Images:
[CS260-TheEscapeRoom.pdf](https://github.com/SBuss225/startup/files/10526145/CS260-TheEscapeRoom.pdf)

# startup
BYU CS260 start up application

I have a cool idea for a simple web game that users could play together on any browser. Escape rooms are becoming more and more popular as group activities, but going to escape rooms in person can be expensive and inconvenient, especially for people who live far away from each other or from escape room facilities. My suggestion is a simple online escape room where users follow clues and solve puzzles in order to escape from a locked room before time runs out. High scores will be posted along with team names on a leaderboard to encourage friendly competition, and the escape room will provide an engaging yet simple puzzle activity for friends, families, and strangers alike to play together.

Key Features

-Ability to create and login with a team username

-Several display screens for each side of the room

-Interactable puzzles

-Leaderboard with fastest completion speeds

-Personal best information persistently stored

Startup URL: https://startup.ucanescape.click
