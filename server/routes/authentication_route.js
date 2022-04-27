const express = require("express");
const router = express.Router();
const auth_controller = require('../controllers/auth_controller')
const passport = require('passport')

router.post('/sign-up', auth_controller.post_sign_up)

router.post('/sign-in', auth_controller.post_sign_in)

router.get('/:typeName/apikey', passport.authenticate('jwt', {session: false}), auth_controller.get_api_key)

module.exports = router;