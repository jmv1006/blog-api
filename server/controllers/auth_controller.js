const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.post_sign_in = (req, res) => {
    
    const tokenUser = {
        _id: req.user._id,
        displayName: req.user.displayName,
        username: req.user.username,
        isAdmin: req.user.isAdmin
    }
    
    const secret = process.env.TOKEN_SECRET
    const token = jwt.sign({user: tokenUser}, secret, {expiresIn:'1h'});

    return res.status(200).json({
        message: 'Auth Passed',
        token: token
    })
    //sanitize and validate
}

exports.post_sign_up = (req, res) => {

    console.log(req.body)
    res.send('sign up here')
    
    /*
    bcrypt.hash('PWHERE', 10, (err, hashedPassword) => {
        const newUser = new User({
            username: 'jmv1006@gmail.com',
            displayName: 'jmv1006',
            password: hashedPassword,
            isAdmin: true
        })

        newUser.save((err) => {
            if(err) {
                return console.log('Error saving sample user')
            }
            console.log('Succesfully saved sample user')
        });

    })
    
    */
}