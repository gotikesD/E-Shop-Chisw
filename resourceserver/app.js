var express = require('express');
var app = express();
var port = process.env.port || 5000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/database');
var productRoutes = require('./routes/products');
var ordersRoute = require('./routes/orders')
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/', cors(), productRoutes);
app.use('/orders', cors(), ordersRoute);

mongoose.connect(config.database);

app.use(function (err, req, res, next) {
    console.log(err.status + ' ' + err.message);
    res.json({
        status: err.status,
        name: err.name,
        message: err.message
    });
});

app.get('/', function (req, res) {
    res.send('Starting page for items stuff. Port: ' + port);

});

app.listen(port);
console.log("Items located on: http://localhost:" + port);
