const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/',(req, res, next)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'views','PageNotFound.html'));
});

app.listen(3555);