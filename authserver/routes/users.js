'use strict';



const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users'),
    passport = require('../passport/bearer');

const validation = require('../controllers/validation/userValidation.js');

// gets information about current user
router.get('/', [passport.authenticate('bearer', {session: false}), function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('withCredentials', true);
    res.json(req.user);
}]);

// signup new user
router.post('/', validation.register, controller.createUser);

// updates current user
router.patch('/', [passport.authenticate('bearer', {session: false}), validation.patch, controller.updateUser]);

module.exports = router;

