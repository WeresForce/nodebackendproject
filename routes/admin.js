const express = require('express');
const path = require('path');

const adminController = require('../controllers/admin');

const router = express.Router();

//admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//admin/add-product => POST
router.post('/add-product', adminController.postAddproduct);

//admin/products => GET
router.get('/products', adminController.getAdminProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product/', adminController.postEditProduct);

module.exports = router;