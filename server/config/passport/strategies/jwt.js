const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../../../models/user');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.user._id, (err, user) => {
        if(err) {
            //error finding user in db
        }
        if(!user) {
            //user does not exist
            return done(null, false)
        }
        return done(null, user)
    })

})