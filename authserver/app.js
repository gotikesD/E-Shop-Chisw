'use strict';
const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    StatusError = require('status-errors'),
    bodyParser = require('body-parser');

const routes = require('./routes/index'),
    users = require('./routes/users'),
    auth = require('./routes/auth');

const app = express(),
    cors = require('cors');


var session = require('express-session');
var passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// required for passport
app.use(session({ secret: 'someSecretString' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use('/', routes);
app.use('/users', users);
app.use('/auth',cors(), auth);

app.use(function (err, req, res, next) {

    if (err.isJoi == true) {
        let errStack = err.details.map(errObj=> {
            return errObj.message;
        });
        res.send(new StatusError(401, errStack[0]));
    } else if (err instanceof StatusError) {
        res.send(err);
    } else {
        console.error(err);
        err = new StatusError(500);
        res.send(err);
    }
});

module.exports = app;
