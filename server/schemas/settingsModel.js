const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//CAN SET DEFAULT VALUES WITHIN SCHEMA***

const settingsSchema = new Schema({
    UID: {type: String, required: true},
    DAS: {type: Number, default: '5', required: true },
    exampleList:[{
      value1:{type: String, required: false },
      value2: {type: String, required: false},
    }]
  });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;