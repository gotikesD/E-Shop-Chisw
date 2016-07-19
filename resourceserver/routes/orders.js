var express = require('express');
var router = express.Router();
var ordersController = require('../controllers/orders');


//insert order info db
router.post('/', ordersController.insertOrderIntoDB);

router.get('/own/:email', ordersController.getOwnOrder)

module.exports = router;