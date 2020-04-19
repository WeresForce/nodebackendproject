const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{  
    res.render('admin/edit-product',{pageTitle:'Add-Products',
    path:'/admin/add-product/',
    editing: false
    });    
};

exports.postAddproduct = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null,
                                title,
                                imageUrl,
                                description,
                                price);
    product.save().then(() =>{
        console.log(`Pushing ${req.body.title} to products`);
        res.redirect('/');
    }).catch(err => console.log(err));
    
};

exports.getEditProduct = (req,res,next)=>{  
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.fetchById(prodId, (product)=>{
        if(!product){
            res.redirect('/');
        }

        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product/',
            editing: editMode,
            product: product
                }); 
    });       
};

exports.postEditProduct = (req,res, next) =>{
    const prodId = req.body.productId;

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    const updatedProduct = new Product(
                                        prodId,
                                        updatedTitle,                                        
                                        updatedImageUrl,
                                        updatedDescription,
                                        updatedPrice
    );

    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.deleteById(prodId,()=>{
        res.redirect('/admin/products');
    });
    
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