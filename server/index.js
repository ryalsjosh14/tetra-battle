const mongoose = require('mongoose');
require ('dotenv/config')
const path = require('path'), //dependencies
    express = require('express'),
    morgan = require('morgan'),
    express_ws = require('express-ws');

  
const port = 8000;
const app = express();
const ws = express_ws(app);
app.use(morgan('dev')); //wrapping express

app.ws('/', (ws, req) => { //intial connection
    console.log('Websocket connected');
    ws.send(JSON.stringify({data: 'Test server message'})); //can use this to send to clients
    //when message recieved from one player, immediately transmit using above cmd to mapped other player
    //need to figure out where/how to store map of connections 
    //(i.e. here for ease of access or on the host of the game's side, and include it as a field in the message passed)

    ws.on('message', (msg) => console.log(msg));

    ws.on('close', () => console.log('Websocket disconnected'));
  });


const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)


mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to db")
})


app.listen(port, () => console.log('Listening on: http://localhost:' + port + '/'));
