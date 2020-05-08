const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@mail.com',
      pass: 'yourpassword'
    }
  });


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

    
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'ourcompany@mail.com',
        subject: 'New Contact',
        text: `Hello, you were contacted by ${req.body.name} this person stated email as ${req.body.email} and phone ${req.body.phone}. Here is the text of the message: ${req.body.message}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response + ' ' + productList);
        }
      });
};

exports.getAboutUs = (req,res,next) => {
    res.render('misc/aboutus',{
        pageTitle: 'About Us',
        path:'/aboutus',
        isAuthenticated: req.session.sessionUser
    });
};

