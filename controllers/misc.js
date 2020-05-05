exports.getContactUs = (req,res,next) => {
    res.render('misc/contactus',{
        pageTitle: 'Contact Us',
        path:'/contactus',
        isAuthenticated: req.session.sessionUser
    });
};

exports.postContactUs = (req,res,next) => {
    console.log('Contact Us posted');
    res.redirect('/contactus');
};

exports.getAboutUs = (req,res,next) => {
    res.render('misc/aboutus',{
        pageTitle: 'About Us',
        path:'/aboutus',
        isAuthenticated: req.session.sessionUser
    });
};

