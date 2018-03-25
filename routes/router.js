const express = require('express');
const router = express.Router();
const User = require('../models/User');





router.get('/' , function(req,res,next) {
    res.render('router' , {title: 'Form Validate' , success: false , errors: req.session.errors});
    req.session.errors = null;
    return res.sendFile(path.join(__dirname + '/template/index.html'));
});


router.post('/' , function(req , res , next) {


    req.check('userEmail' , 'Invalid email address').isEmail();
    req.check('userName' , 'Please fill the name again').isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        return res.send('<h1>Please enter the name of minimum 4 character</h1>')
    }

    else {
        var userData = {
            name: req.body.userName,
            email: req.body.userEmail
        }

        User.create(userData , function(error , user) {
            if (error) {
                next(error);
            }
            else {
                req.session.userId = user._id;
            }
        });
    return res.send('<h1> Successful</h1>')
    }
    
});

module.exports = router;