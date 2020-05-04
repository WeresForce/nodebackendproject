exports.getPageNotFound = (req, res, next)=>{
    res.status(404);
    res.render('PageNotFound',{pageTitle:'404: Page Not Found',path:'',
    isAuthenticated: req.session.sessionUser});
};