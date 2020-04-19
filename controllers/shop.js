const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req,res,next)=>{
    Product.fetchAll().then(([rows, fieldData]) =>{
      res.render('shop/index',{
      pageTitle: 'Shop',
      prods: rows,
      path:'/'                            
     });

    })
    .catch(err => console.log(err));
        

    
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll().
    then(([rows,fieldData]) => {
      res.render('shop/product-list',{
          pageTitle: 'All Products',
          prods: rows,
          path:'/products'
        });
    })
    .catch((err) =>{
      console.log(err);
    });

    
};

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
Product.fetchById(prodId)
    .then(([product]) =>{
        res.render('shop/product-detail',{
          pageTitle:`Product ${product[0].title} Details`,
          path: '/products',
          product: product[0]
          });
      })
    .catch(err => console.log(err));
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




