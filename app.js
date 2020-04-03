const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

const app = express();

app.set('view engine', 'pug');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);



app.use('/',(req, res, next)=>{
    res.status(404);
    res.render('PageNotFound',{pageTitle:'404: Page Not Found'});
    //res.sendFile(path.join(rootDir,'views','PageNotFound.html'));
});

app.listen(3555);