const User = require('../models/user');


exports.getLogin = (req,res,next) =>{    
    console.log(req.session.sessionUser);
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.sessionUser
    });
};

exports.postLogin = (req,res,next) =>{
    

    User.findByPk(1)
                .then( user =>{
                    req.session.isLoggedIn = true;
                    req.session.sessionUser = user; 
                })
                .then(()=>{
                    res.redirect('/');  
                })
                
                .catch(err => console.log(err));
    
};

exports.postLogout = (req,res,next) =>{
    req.session.destroy((err) =>{
        console.log(err);
        res.redirect('/');
    });

};