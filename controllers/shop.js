const Product = require('../models/product');

const nodemailer = require('nodemailer');

const ejs = require( 'ejs');
const htmlPdf = require('html-pdf');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourEmail@gmail.com',
    pass: 'yourPassword'
  }
});

exports.getIndex = (req,res,next)=>{
  Product.findAll()
          .then(products => {
            res.render('shop/index',{
              pageTitle: 'Shop',
              prods: products,
              path:'/',
              isAuthenticated: req.session.sessionUser
            });
          })
          .catch(err => {
            console.log(err);
          }); 
};

exports.getProducts = (req,res,next)=>{
  Product.findAll()
          .then(products => {
            res.render('shop/product-list',{
              pageTitle: 'All Products',
              prods: products,
              path:'/products',
              isAuthenticated: req.session.sessionUser
            });
          })
          .catch(err => {
            console.log(err);
          });  
};

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;

    Product.findAll({where: {id: prodId}}).then(products => {      
      res.render('shop/product-detail',{
        pageTitle:`Product ${products[0].title} Details`,
        path: '/products',
        product: products[0],
        isAuthenticated: req.session.sessionUser
        });
      
    }).catch(err => {console.log(err);});
};

exports.getCart = (req, res, next) => {
   req.user.getCart()
                    .then(cart => {
                      return cart.getProducts()
                                            .then(products =>{
                                              res.render('shop/cart', {
                                                      path: '/cart',
                                                      pageTitle: 'Your Cart',
                                                      products: products,
                                                      isAuthenticated: req.session.sessionUser
                                                    });                                                
                                            })
                                            .catch(err => {console.log(err);});
                    })
                    .catch(err => {console.log(err);});
  };

exports.postToCart = (req,res,next) => {
    const prodId = req.body.productId; 
    let fetchedCart;
    let newQuantity =1;
    req.user
      .getCart()
        .then(cart =>{
          fetchedCart = cart;
          return cart.getProducts({where:{id: prodId}});
        })
          .then(products => {
            let product;
            if (products.length > 0) {
              product = products[0];
            }
            
            if (product) {
              const oldQuantity = product.cartItem.quantity;
              newQuantity = oldQuantity +1;
              return product;
            }
            return Product.findByPk(prodId);
          })
          .then(product =>{
            return fetchedCart.addProduct(product, {through:{quantity: newQuantity}});
          })
          .then(()=>{
            res.redirect('/cart');
          } )
      .catch(err =>console.log(err));
};

exports.postCartDeleteItem = (req,res,next) => {
    const prodId = req.body.productId;
    req.user.getCart().then(cart =>{
      return cart.getProducts( {where: {id: prodId}});
    })
    .then(products =>{
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() =>{
      res.redirect('/cart');  
    })
    .catch(err =>{console.log(err);});
};

exports.postOrder = (req,res,next) =>{
  let productList = '';
  let fetchedCart;

  let fullName = req.body.fullname;
  let email = req.body.email;
  let peoplecount = req.body.peoplecount;

  
    req.user.getCart()
      .then( cart =>{
        fetchedCart = cart;
        return cart.getProducts();
      })
        .then(products =>{      
          products.forEach(product => {
            productList+=product.title +'('+product.cartItem.quantity+')';
          });       
          return req.user.createOrder()
                            .then(order =>{
                              order.addProducts(products.map(product =>{
                                product.orderItem = {quantity: product.cartItem.quantity};
                                return product;
                              }));
                            })
        })
        .then(productListLocal =>{
          var mailOptions = {
            from: 'youremail@gmail.com',
            //to: req.user.email,
            to: email,
            subject: 'Order confirmed',
            text: `Dear ${fullName}, thank you for ordering tour(s) ${productList}for ${peoplecount} person`,
            html: `<html>
            <head>
              <title>Your ticket</title>
            </head>
            <body>
            <p>Dear ${fullName}, thank you for ordering tour(s) ${productList}for ${peoplecount}</p>
              <h1>Order content</h1>
              <table style="width: 100%;">
                <tr>
                  <th>Item list</th>                    
                </tr>
                <tr>
                  <td >${productList}</td>
                </tr>
              </table>
            </body>
          </html>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response + ' ' + productList);
            }
          });
        })
          .then(result =>{              
            fetchedCart.setProducts(null);
          })
            .then(() =>{
              res.redirect('/orders');
            })
          
    .catch(err => console.log(err));

};



exports.getOrders = (req,res,next) => {
  req.user.getOrders({include: ['products']})
  .then(orders =>{
    res.render('shop/orders',{
      pageTitle: 'Your Orders',
      path: '/orders',
      orders: orders,
      isAuthenticated: req.session.sessionUser
});
  })
  .catch(err=>console.log(err));
    
};

exports.getCheckout = (req, res, next) =>{
    res.render('shop/checkout',{
                                pageTitle: 'Checkout',
                                path: '/checkout',
                                isAuthenticated: req.session.sessionUser
    });
};




