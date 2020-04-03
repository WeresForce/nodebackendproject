const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');
const adminData = require('../routes/admin');


router.get('/',(req,res,next)=>{
    const products = adminData.products;

    res.render('shop',{  pageTitle: 'Product List',
                         prods: products,
                         docTitle: 'Dynamic shop',
                         path:'/'});
    
});


module.exports = router;


