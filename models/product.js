const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(
    rootDir,
    'data',
    'products.json');

const getProductsFromFile = (callBack)=>{
    
    fs.readFile(p, (err, fileContent)=>{
        if (err) {
            callBack([]) ;
        }
        else{
            callBack(JSON.parse(fileContent));
        }
    });
};

module.exports =  class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

    }

    save() {           
        getProductsFromFile((products)=>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts),(err) =>{
                    if (err) {
                        console.log(err);
                    }
                });
            }
            else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products),(err)=>{
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }

    static fetchAll(callBack){
        getProductsFromFile(callBack);        
}

    static fetchById(id, callback){
        getProductsFromFile((products)=>{
            const product = products.find((p) => {return p.id === id;}); //Here check
            callback(product);
        });
    }
};