const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    UID: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: false}, //<--- wat
    password: {type: String, required: true},
});

// adds method to user to create hashed password
userSchema.methods.generateHash = function(password) {
    console.log("running generate hash")
    const res = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    console.log("about to return from generate hash")
    return res;
};

// adds method to user to check if password is correct
userSchema.methods.validPassword = function(password) {
    console.log("running validate password")
    return bcrypt.compareSync(password, this.password);
};

//before saving to db rehash password if changed (or created)
userSchema.pre('save', function(next) {
    console.log("running pre save")
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password);
        console.log("hash = " + this.password)
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;