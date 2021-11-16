const express = require('express');
const Settings = require('../schemas/settingsModel.js');
const settingsRouter = express.Router();

settingsRouter.get('/', async (req, res) => { //WORKING
    Settings.find({}, function (err, data) {
      if(err) throw err;
      res.json(data); //can look at in postman to verify integrity
    });
});

settingsRouter.get('/:uid', async (req, res) => { //get based on UID; WORKING
  Settings.findOne({uid: req.params.uid}, function (err, data) {
    if(err) throw err;
    res.json(data);
  });
});

settingsRouter.get('/create/:uid', async (req, res) => { // create with different defaults if needed; WORKING
    const settings = new Settings({
      UID: req.params.uid
    });
    console.log(settings);
    settings.save() //save to DB
    .then(data => {
        res.json(data);
    });
});

settingsRouter.post('/update/:uid', async (req, res) => { //MAIN METHOD TO BE CALLED, UPDATES BASED ON UID
  Settings.Update({uid: req.params.uid}, {
    //TODO
  })
});


module.exports = settingsRouter;
