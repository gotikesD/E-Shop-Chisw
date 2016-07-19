var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = Schema({

    email: {type: String},
    firstName : {type: String},
    totalSumOfOrder : {type : Number},
    products : [{
        count : {type : Number},
        id : {type : String},
        title : {type : String},
        total : {type : Number}
    }]

});

var order = mongoose.model('order', orderSchema);

module.exports = order;