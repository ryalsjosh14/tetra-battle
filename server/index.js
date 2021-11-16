const mongoose = require('mongoose');
//require ('dotenv/config') //not in package.json, error at runtime
const path = require('path'), //dependencies
    express = require('express'),
    morgan = require('morgan'),
    express_ws = require('express-ws');

let uri;
try {
  uri = require("./config/config.js").uri;
} catch {
  uri = process.env.uri;
}

  
const port = 8000;
const app = express();
app.use(morgan('dev')); //wrapping express


const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)


mongoose.connect(uri, () => {
  console.log("connected to db")
})


app.listen(port, () => console.log('Listening on: http://localhost:' + port + '/'));
