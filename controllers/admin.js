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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    })
    .then(result => {
        console.log('Created a product');
        return res.redirect('/admin/products/');
    })
    .catch(err => {
        console.log(err);
    });
    
};

exports.getEditProduct = (req,res,next)=>{  
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
            .then(products =>{
                const product = products[0];
                if(!product){
                    res.redirect('/');
                }
                res.render('admin/edit-product',{
                    pageTitle:'Edit Product',
                    path:'/admin/edit-product/',
                    editing: editMode,
                    product: product
                        }); 
            })
            .catch(err => {console.log(err);});
};

exports.postEditProduct = (req,res, next) =>{
    const prodId = req.body.productId;

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    Product.findByPk(prodId)
                    .then(product => {
                        product.title = updatedTitle;
                        product.price = updatedPrice;
                        product.description = updatedDescription;
                        product.imageUrl = updatedImageUrl;
                        return product.save();
                    })
                    .then( result =>{
                        res.redirect('/admin/products');
                    })
                    .catch(err => {console.log(err);
                    });
};

exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findByPk(prodId)
                            .then(product => {
                                product.destroy();                                
                            })
                            .then(() =>{
                                res.redirect('/admin/products');
                            })
                            .catch(err => {console.log(err);});
};

exports.getAdminProducts = (req, res, next)=>{
    req.user
        .getProducts()
            .then( products => {
                res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products View',
                    path: '/admin/products/'
                });
            })
        .catch(err =>{console.log(err);});
};