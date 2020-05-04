const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req,res,next) =>{    
    console.log(req.session.sessionUser);
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.sessionUser
    });
};

exports.postLogin = (req,res,next) =>{  
    const userEmail = req.body.email;
    const userPassword = req.body.password; 
    User.findAll({where :{email: userEmail}})
                .then( users =>{
                    if (users.length<1) {
                        return res.redirect('/login');
                    }
                    const user = users[0];
                    if (user.password != userPassword) {
                        return res.redirect('/login'); 
                    }
                    req.session.isLoggedIn = true;
                    req.session.sessionUser = user; 
                    req.session.save((err) =>{
                        if(err){
                            console.log(err);                            
                        }
                        else{
                            req.session.sessionUser.createCart();
                            res.redirect('/');
                        }
                    });
                })
                .catch(err => console.log(err));
};

exports.postLogout = (req,res,next) =>{
    req.session.destroy((err) =>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }   
    });  
};

exports.getSignup = (req, res, next) =>{
    res.render('auth/signup',{
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findAll({where :{email:email}})
    .then(user => {
        if(user.length >0){
            return res.redirect('/signup');
        }
        else{
            bcrypt.hash(password, 12);
            const user = User.create({
                                        email: email,
                                        password: password})
                                        .then( result =>{
                                            res.redirect('/login');
                                        })
                                        .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));



};