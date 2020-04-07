const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{  
    console.log('I amd Add product get listener');
    res.render('admin/add-product',{pageTitle:'Add-Products',
    path:'/admin/add-product/',
    productCSS: true,
    formsCSS: true,
    activeAddproduct: true
    });    
};

exports.postAddproduct = (req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    console.log(`Pushing ${req.body.title} to products`);
    res.redirect('/');
};

exports.getAdminProducts = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products View',
            path: '/admin/products'
        });
    });
};