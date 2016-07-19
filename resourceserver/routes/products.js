var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

var validaiton = require('../controllers/validation/productValidation'),
    access = require('../controllers/validation/accessValidation');

//get items by gategory(while click on sidebar)
router.get('/category/:category', productController.getByCategory)

//helper route for getting all products from database
router.get('/allproducts', productController.getAllProducts)

//get child topics by parent id
router.get('/topics/:id', productController.getTopics);

//Get single prod info
router.get('/info/:id', productController.getOneProduct);

//get topics for sidebar
router.get('/sidebarTopics', productController.getSidebarTopics);

//get products
router.get('/products/:topicId', productController.getProducts);

//get products amount for pagination
router.get('/amount', productController.getProductsAmount);

//for pagination
router.get('/page/:page', productController.getProductsByPages);

//get product by ID
router.get('/product/:id', productController.getProductById);

//search items
router.post('/search', [access.hasAccess, productController.searchProduct]);
//router.post('/search', productController.searchProduct);

//helper route for filling database with products
router.post('/product', [validaiton.post, productController.createProduct]);

module.exports = router;