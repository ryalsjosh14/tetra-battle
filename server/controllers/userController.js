const User = require('../schemas/userModel.js')
const jwt = require('jsonwebtoken')
const jwt_secret = require('../config/config.js').secret
const uuid = require('uuid');


// function to create tokens
function signToken(user) {
    const userData = user.toObject();
    delete userData.password;
    return jwt.sign(userData, jwt_secret)
}



module.exports = {
    // list all users
    index: async (req, res) => {
        console.log("in index")
        try {
            const users = await User.find({});
            res.json(users);
        } catch(err) {
            console.err(err);
        }
    },

    // get one user
    show: async (req, res) => {
        console.log("Current User:");
        console.log(req.user);
        console.log(req.params.uid);
        try {
            const user = await User.findOne({uid: req.params.uid});
            res.json(user);
        } catch(err) {
            console.error(err);
        }
    },

    // creates new user
    create: async (req, res) => {
        try{
            console.log(req.body.username)
            console.log(req.body.password)

            const user = new User({
                UID: uuid.v4(),
                username: req.body.username,
                password: req.body.password
            });
            user.save();

            const token = await signToken(user);

            console.log("almost finished create")

            res.json({success: true, message: "User created with token", token});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // update a user
    update: async (req, res) => {
        var newUser = req.body;
        User.updateOne({ _id: req.body._id }, newUser)
        .then((user) => {
            if(!user) {
                return res.json({error: 'Error message'});
            } else {
                return res.json({error: 'Success'});
            }
        })
        .catch((error) => {
            return res.json({message: "Error"});
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

    authenticate: async (req, res) => { //on page load, put token in local storage
        const user = await User.findOne({uid: req.body.uid});

        if(!user || !user.validPassword(req.body.password)) {
            return res.json({success: false, message: "Invalid Login"});
        }

        const token = await signToken(user);
        res.json({success: true, message: "Token attached", token});
    }
};