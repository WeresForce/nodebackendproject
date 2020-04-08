const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{  
    res.render('admin/add-product',{pageTitle:'Add-Products',
    path:'/admin/add-product/',
    productCSS: true,
    formsCSS: true,
    activeAddproduct: true
    });    
};

exports.postAddproduct = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title,
                                imageUrl,
                                description,
                                price);
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