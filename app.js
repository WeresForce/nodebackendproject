const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const errorController = require('./controllers/error');
const rootDir = require('./utils/path');

const sequilize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findByPk(1)
            .then(user => {
                req.user = user;
                next();
    })
    .catch(err => {console.log(err);});
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getPageNotFound);

Product.belongsTo(User,{ constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItem});
Product.belongsToMany(Order,{through: OrderItem});

sequilize
//{force: true} forces recreate
.sync()
.then(result =>{
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name: 'FirstUser', email:'test@test.com'});
    }
    return Promise.resolve(user);
})
.then(user =>{
    return user.createCart();
})
.then( user =>{
    app.listen(3555);
})
.catch(err => {
    console.log(err);
});

