//require ('dotenv/config')
const path = require('path'), //dependencies
    express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const postsRoute = require('./routes/posts')
const userRouter = require('./routes/userRouter')
const settingsRouter = require('./routes/settingsRouter')
  
const port = 8000;
const app = express();
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
