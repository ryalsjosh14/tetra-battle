//require ('dotenv/config')
const path = require('path'); //dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require("http")
const fs = require("fs")
const ws = require('ws');  



const port = 8000;
let uri;
try {
  uri = require("./config/config.js").uri;
  console.log("uri: " + uri)

} catch {
  uri = process.env.uri;
  console.log("uri: " + uri)
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


const app = express();

/* WEB SOCKET SERVER */


// const options = {
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.cert")
// }

//const tempServer = http.createServer(app)



app.use(cors(corsOptions)); //wrapping express
app.use(morgan('dev'));
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
  //app.use(express.static(path.join(__dirname, '../tetribattle/public')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../tetribattle/build/index.html'));
  });
}


const tempServer = http.createServer(app);


//Listen
const listenPort = process.env.PORT || port;
console.log(process.env.PORT + ", " + port);
console.log(process.env.PUBLIC_URL);
console.log(__dirname);
tempServer.listen(listenPort, () => console.log('Listening on: http://localhost:' + listenPort + '/'));


var wsServer = new ws.Server({ server: tempServer }); // initialize server
var wsConnections = []; // store all active connections
//const wsConnections = new Map();

wsServer.on('connection', (webSocket, req) => { // when a player connects
    console.log("player connected")
    const id = parseInt(req.url.substr(1)); // get their id (from url)
    wsConnections[id] = webSocket; // store as an active connection

    console.log("user " + id + " connected\n");

    webSocket.on('message', (msg) => { // when a message is received
      console.log("received: " + msg);
      wsConnections[parseInt(msg)].send(msg.substr(msg.indexOf(' ')+1)); // send to connection specified with leading int and only send after the first space
  });
});




