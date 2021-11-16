const express = require('express'),
    userRouter = new express.Router(),
    userController = require('../controllers/userController.js'),
    User = require('../schemas/userModel.js');
    jwt = require('jsonwebtoken'),
    jwt_secret = require('../config/config.js').secret;

// function to verify tokens 
//should probably be moved to a separate jwt file
function verifyToken(req, res, next) {
    const token = req.get('token') || req.body.token || req.query.token;

    // reject user if no token
    if(!token) return res.json({success: false, message: "No token provided"});

    // try to verify token
    jwt.verify(token, jwt_secret, (err, decodedData) => {
        // error check
        if(err) return res.json({success: false, message: "Error with token"});

        // find user associated with token
        User.findById(decodedData._id, (err, user) => {
            // reject token if no user
            if(!user) return res.json({success: false, message: "Error with token"});

            req.user = user;
            next();
        })
    })
}

userRouter.route('/').get(userController.index);

userRouter.post('/create', userController.create);

userRouter.post('/authenticate', userController.authenticate);

userRouter.post('/updateUser', userController.update);

userRouter.use(verifyToken);
userRouter.route('/:uid').get(userController.show).patch(userController.update).delete(userController.destroy);
  
module.exports = userRouter;