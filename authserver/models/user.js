/**
 * Created by user on 28.03.16.
 */
'use strict';

const mongoose = require('./mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const token = new Schema({
    value: String,
    expDate: Date
});

const user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    token: token,
    password: {
        type: String,
        set: setPassword
    },
    role:{
        type: String,
        enum: ["user", "admin"]
    }
});

function setPassword(value) {
    const SALT_WORK_FACTOR = 10;

    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(value, salt);
}

user.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', user);

