const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{  
    console.log('I amd Add product get listener');
    res.render('add-product',{pageTitle:'Add-Products',
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

exports.getProducts = (req,res,next)=>{
     Product.fetchAll((products)=>{
        console.log(products[0]);
        res.render('shop',{  pageTitle: 'Product List',
                             prods: products,
                             docTitle: 'Dynamic shop',
                             path:'/',hasProducts: products.length > 0,
                             activeShop: true,
                             productCSS: true
                            });

    });
   
    
};