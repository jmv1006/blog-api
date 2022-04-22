const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const passport = require('passport')

exports.post_sign_in = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err) {
            return res.status(400).json('Error Authenticating User')
        }

        if(!user) {
            return res.status(400).json({info: info, previousInput: req.body})
        }
        
        const tokenUser = {
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            isAdmin: user.isAdmin
        }
        
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign({user: tokenUser}, secret, {expiresIn:'30m'});
    
        return res.status(200).json({
            message: 'Auth Passed',
            user: tokenUser,
            token: token
        })
    })(req, res)
};

exports.post_sign_up = (req, res) => {
    //validate
    const schema = Joi.object({
        username: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please input a valid email.',
            }),
        displayName: Joi.string()
            .min(3)
            .max(20)
            .required()
            .messages({
                'string.min': 'Display name must be at least 3 characters.',
                'string.max': 'Display name cannot be more than 20 characters.'
            }),
        password: Joi.string()
            .min(3)
            .messages({
                'string.min': 'Password must be at least 3 characters.'
            }),
        confirmedPassword: Joi.string()
            .min(3)
            .valid(Joi.ref('password'))
            .messages({
                'any.only': 'Passwords must match'
            })
    });

    const { error } = schema.validate(req.body, {abortEarly: false})

    if(error) {
        const errors = [];

        error.details.forEach((error) => {
            errors.push(error.message)
        })

        const response = {
            errors: errors,
            //previousInput: req.body
        }

        return res.status(400).json(response)
    }
    
    User.findOne({username: req.body.username}, (err, user) => {
        if(err) {
            return res.status(400).json('Error creating new user')
        }

        if(user) {
            return res.status(400).json('User Already Exists')
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if(err) {
                return res.status(400).json("SERVER ERROR")
            }
    
            const newUser = new User({
                username: req.body.username,
                displayName: req.body.displayName,
                password: hashedPassword,
                isAdmin: false
            })
    
            newUser.save((err) => {
                if(err) {
                    return res.status(400).json('Error creating user')
                }
                return res.status(200).json('Succesfully created new user')
            });
        })
    })
};

