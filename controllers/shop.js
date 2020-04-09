const Product = require('../models/product');

exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',{  pageTitle: 'Shop',
                             prods: products,
                             path:'/'                            
                            });

    }); 
};

exports.getProducts = (req,res,next)=>{
     Product.fetchAll((products)=>{
        res.render('shop/product-list',{  pageTitle: 'All Products',
                             prods: products,
                             path:'/products'
                            });

    });  
};

exports.getCart = (req,res, next) =>{
    res.render('shop/cart',{
                            pageTitle:'Your Cart',
                            path: '/cart'
    });
};

exports.getOrders = (requ,res,next) =>{
    res.render('shop/orders',{
                                pageTitle: 'Your Orders',
                                path: '/orders'
    });
};

exports.postCart = (req, res, next)=>{
    res.render('shop/cart',{
                            pageTitle:'Cart',
                            path:'/cart'
    });
};

exports.getCheckout = (req, res, next) =>{
    res.render('shop/checkout',{
                                pageTitle: 'Checkout',
                                path: '/checkout'
    });
};




