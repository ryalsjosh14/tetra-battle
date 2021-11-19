const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//CAN SET DEFAULT VALUES WITHIN SCHEMA***

const gameSchema = new Schema({
    id: {type: String, unique:true, required: true},
    user1: {type: Number, default: '-1', required: true },
    user2: {type: Number, default: '-1', required: true },
  });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;