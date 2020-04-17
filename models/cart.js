const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/path');

const p = path.join(
    rootPath,
    'data',
    'cart.json'
);

class Cart{

    static getCart(callback) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            callback(null);
          } else {
            callback(cart);
          }
        });
      }

    static addProduct(id, productPrice){
        //Fetch previous cart
        fs.readFile(p,(err,fileContent)=>{
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if(existingProduct){
                updatedProduct ={...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + parseFloat(productPrice) ;

            fs.writeFile(p, JSON.stringify(cart),(err) =>{
                console.log(err);
            });

        });       
        
    }

    static deleteProduct(id, productPrice){
            fs.readFile(p,(err,fileContent) =>{
                
                if (err){
                    return;                 
                }
                else{
                    const currentCart = JSON.parse(fileContent);
                    const updatedCart = {...currentCart};

                    const product = updatedCart.products.find( prod => prod.id === id);

                    if (!product) {
                        return;
                    }

                    const productQty = product.qty;
                    updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;

                    updatedCart.products = updatedCart.products.filter(prod => prod.id != id);  
                    fs.writeFile(p,JSON.stringify(updatedCart),(err)=> {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        }

}

module.exports = Cart;