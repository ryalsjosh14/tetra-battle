const mongoose = require('mongoose');
require ('dotenv/config')
const path = require('path'), //dependencies
    express = require('express'),
    morgan = require('morgan'),
    express_ws = require('express-ws');

  
const port = 8000;
const app = express();
app.use(morgan('dev')); //wrapping express


const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)


mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to db")
})


app.listen(port, () => console.log('Listening on: http://localhost:' + port + '/'));
