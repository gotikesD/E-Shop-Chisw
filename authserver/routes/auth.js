/**
 * Created by user on 29.03.16.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    session = require('../controllers/session'),
    facebook = require('../passport/facebook'),
    google = require('../passport/google'),
    passport = require('../passport/bearer');

const validation = require('../controllers/validation/userValidation.js');

// login user
router.post('/login', validation.login, session.login);


// login with social

// Facebook...

router.get('/facebook',facebook.firstStep);
router.get('/facebook/callback', facebook.secondStep);
router.get('/facebook/success', function(req, res, next) {
    let token = req.user.token.value;
    res.cookie('token' ,token );
    res.redirect(`http://localhost:8080`)
});
router.get('/facebook/error', function(req, res, next) {
    res.send('facebook error');
});


// Google ...

router.get('/google',google.firstStep);
router.get('/google/callback', google.secondStep);
router.get('/google/success', function(req, res, next) {
    let token = req.user.token.value;
    res.cookie('token' ,token );
    res.redirect('http://localhost:8080');
});
router.get('/google/error', function(req, res, next) {
    res.send('facebook error');
});



router.get('/authorized', [passport.authenticate('facebook','bearer', {session: false}), session.hasAccess]);

module.exports = router;