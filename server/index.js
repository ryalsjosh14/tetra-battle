//require ('dotenv/config')
const path = require('path'); //dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const postsRoute = require('./routes/posts');
const userRouter = require('./routes/userRouter');
const settingsRouter = require('./routes/settingsRouter');
const gameRouter = require('./routes/gameRouter');

let uri;
try {
  uri = require("./config/config.js").uri;
} catch {
  uri = process.env.uri;
}
  
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

//Listen
app.listen(port, () => console.log('Listening on: http://localhost:' + port + '/'));



/* WEB SOCKET SERVER */

const ws = require('ws');

var wsServer = new ws.Server({port: 5000}); // initialize server
var wsConnections = []; // store all active connections

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

    console.log("user " + id + " connected\n" + webSocket);

    webSocket.on('message', (msg) => { // when a message is received
      console.log("received: " + msg);
  });
});


