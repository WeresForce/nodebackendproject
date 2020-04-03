const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

let products = [];


router.get('/add-product',(req,res,next)=>{  
    console.log('I amd Add product get listener');
    res.render('add-product');
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
});

router.post('/add-product',(req,res,next)=>{
    console.log(`Pushing ${req.body.title} to products`);
       products.push({title: req.body.title});

       res.render('add-product');
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
});

exports.routes = router;
exports.products = products;