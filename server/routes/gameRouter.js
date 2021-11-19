const express = require('express');
const Game = require('../schemas/gameModel.js');
const gameRouter = express.Router();

gameRouter.get('/', async (req, res) => { //get all rooms
    Game.find({}, function (err, data) {
        if(err) throw err;
        res.json(data); //can look at in postman to verify integrity
    });
});

gameRouter.get('/:id', async (req, res) => { //get based on game room id
    Game.findOne({id: req.params.id}, function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});

//working => example = http://localhost:8000/game/create/lkjaw&1929
gameRouter.get('/create/:id&:user1', async (req, res) => { // create game
    const game = new Game({
        id: req.params.id,
        user1: req.params.user1,
    });
    //console.log(game);
    game.save()
    .then((data) => {
        res.json(data);
    });
});

//working => example = http://localhost:8000/game/update/lkjaw&1929
gameRouter.patch('/update/:id&:user2', async (req, res) => { // update when second user joins
    Game.updateOne({id: req.params.id}, {user2: req.params.user2}, function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});


module.exports = gameRouter;
