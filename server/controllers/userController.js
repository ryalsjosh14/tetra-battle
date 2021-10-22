const User = require('../schemas/userModel.js'),
    jwt = require('jsonwebtoken'),
    jwt_secret = require('../config/config.js').secret;

// function to create tokens
function signToken(user) {
    const userData = user.toObject();
    delete userData.password;
    return jwt.sign(userData, jwt_secret)
}



module.exports = {
    // list all users
    index: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch(err) {
            alert(err);
        }
    },

    // get one user
    show: async (req, res) => {
        console.log("Current User:");
        console.log(req.user);

        try {
            const user = await User.findById(req.params.uid);
            res.json(user);
        } catch(err) {
            alert(err);
        }
    },

    // creates new user
    create: async (req, res) => { //TODO******************** CURRENTLY CRASHES IF DUPLICATE USERNAME USED, EVEN THOUGH UNIQUE NOT SET
        try{
            const user = new User({
                UID: req.body.uid,
                username: req.body.username,
                password: req.body.password
            });
            user.save();

            const token = await signToken(user);

            res.json({success: true, message: "User created with token", token});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // update a user
    // update: async (req, res) => {
    //     try {
    //         const user = await User.findById(req.params.id);
    //         Object.assign(user, req.body);
    //         await user.save();

    //         res.json({success: true, message: "User updated", user});
    //     } catch(err) {
    //         res.json({success: false, code: err.code});
    //     }
    // },

    // update a user
    update: async (req, res) => {
        var newUser = req.body;
        User.updateOne({ _id: req.body._id }, newUser)
        .then((user) => {
            if(!user) {
                return res.json({
                    error: 'Error message'
                });
            } else {
                return res.json({
                    error: 'Success'
                });
            }
        })
        .catch((error) => {
            return res.json({
                message: "Error",
            });
        });
    },

    // delete a user
    destroy: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.json({success: true, message: "User deleted", user});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    authenticate: async (req, res) => {
        const user = await User.findOne({email: req.body.email});

        if(!user || !user.validPassword(req.body.password)) {
            return res.json({success: false, message: "Invalid Login"});
        }

        const token = await signToken(user);
        res.json({success: true, message: "Token attached", token});
    }
};