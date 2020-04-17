const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    Product.fetchById(prodId,(product)=>{
        res.render('shop/product-detail',{
            pageTitle:`Product ${product.title} Details`,
            path: '/products',
            product: product
            });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (let product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      });
    });
  };

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;   

    Product.fetchById(prodId,(product) => {
        Cart.addProduct(prodId, product.price);
    });

    res.redirect('/cart');
};

exports.postCartDeleteItem = (req,res,next) => {
    const prodId = req.body.productId;
    Product.fetchById(prodId,(product) => {
        Cart.deleteProduct(prodId,product.price);
    });
    res.redirect('/cart');
    
};



exports.getOrders = (requ,res,next) => {
    res.render('shop/orders',{
                                pageTitle: 'Your Orders',
                                path: '/orders'
    });
};

exports.getCheckout = (req, res, next) =>{
    res.render('shop/checkout',{
                                pageTitle: 'Checkout',
                                path: '/checkout'
    });
};




