const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const rootDir = require('./utils/path');

const sequilize = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

sequilize.sync()
.then(result =>{
    //console.log(result);
    app.listen(3555);
})
.catch(err => {
    console.log(err);
});

