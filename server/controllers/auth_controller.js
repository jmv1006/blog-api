const User = require('../models/user')
const jwt = require('jsonwebtoken')

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