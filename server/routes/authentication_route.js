const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth_controller = require('../controllers/auth_controller')

router.post('/sign-in', passport.authenticate('local', {session: false}), auth_controller.post_sign_in)

module.exports = router;