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

const postsRoute = require('./routes/posts')
const userRouter = require('./routes/userRouter')
const settingsRouter = require('./routes/settingsRouter')
  
const port = 8000;
const app = express();
app.use(cors(corsOptions))
app.use(morgan('dev')); //wrapping express
app.use(bodyParser.json());

//Connect to mongo
mongoose.connect(require('./config/config.js').uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connect => console.log("Connected to MongoDB"))
.catch(e => console.log("Could not connect to MongoDB", e));

//Use routers
app.use('/posts', postsRoute)
app.use('/users', userRouter)
app.use('/settings', settingsRouter)

//Listen
app.listen(port, () => console.log('Listening on: http://localhost:' + port + '/'));
