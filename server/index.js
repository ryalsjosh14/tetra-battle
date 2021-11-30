//require ('dotenv/config')
const path = require('path'); //dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

//const { uri }= require("./config/config") // declared further down as config/config.js
//console.log(uri);

let uri;
try {
  uri = require("./config/config.js").uri;
} catch {
  uri = process.env.uri;
}

const corsOptions ={
    origin:'*', 
    credentials:true,            
    //access-control-allow-credentials:true,
    optionSuccessStatus:200,
 }

const postsRoute = require('./routes/posts');
const userRouter = require('./routes/userRouter');
const settingsRouter = require('./routes/settingsRouter');
const gameRouter = require('./routes/gameRouter');


const port = 8000;
const app = express();
app.use(cors(corsOptions));
app.use(morgan('dev')); //wrapping express
app.use(bodyParser.json());

//Connect to mongo
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connect => console.log("Connected to MongoDB"))
.catch(e => console.log("Could not connect to MongoDB", e));

//Use routers
app.use('/posts', postsRoute);
app.use('/users', userRouter);
app.use('/settings', settingsRouter);
app.use('/game', gameRouter);

//build
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../tetribattle/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../tetribattle/build/index.html'));
  });
}

//Listen
const listenPort = process.env.PORT || port;
console.log(process.env.PORT + ", " + port);
app.listen(listenPort, () => console.log('Listening on: http://localhost:' + listenPort + '/'));



/* WEB SOCKET SERVER */

const ws = require('ws');

var wsServer = new ws.Server({server: app}); // initialize server
var wsConnections = []; // store all active connections
//const wsConnections = new Map();

//TODO****************************************************************
// MAKE DB ENTRY FOR EACH GAME
// (slow) ON MESSAGE, LOOK THEM UP FROM DB AND SEND TO THEM USING {wsConnections[id_from_db]}
// IDEALLY, FIND SOME WAY TO CACHE THIS, OR EVEN BETTER JUST PASS THE OTHER USERS ID IN THE URL
// HOWEVER, THAT REQUIRES REACT ROOM.js TO KNOW THE ID OF THE OTHER PLAYER, 
// WHICH CAN ONLY BE DONE IF blah blah idc anymore just do the slow way for now and implement a handshake later kasdlkjasdlkjasdlkj
//TODO****************************************************************

wsServer.on('connection', (webSocket, req) => { // when a player connects
    const id = parseInt(req.url.substr(1)); // get their id (from url)
    wsConnections[id] = webSocket; // store as an active connection

    console.log("user " + id + " connected\n");

    webSocket.on('message', (msg) => { // when a message is received
      console.log("received: " + msg);
      wsConnections[parseInt(msg)].send(msg.substr(msg.indexOf(' ')+1)); // send to connection specified with leading int and only send after the first space
  });
});

//new id system below

// wsServer.on('connection', (webSocket, req) => { // when a player connects
//   console.log(req.url)
//     const id = req.url.substr(0,req.url.indexOf(' ')); // get their id (from url)
//     wsConnections.set(id, webSocket); // store as an active connection

//     console.log("user " + id + " connected\n");

//     webSocket.on('message', (msg) => { // when a message is received
//       console.log("received: " + msg);
//       wsConnections.get(substr(0,msg.indexOf(' '))).send(msg.substr(msg.indexOf(' ')+1)); // send to connection specified with leading int and only send after the first space
//   });
// });

