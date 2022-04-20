const express = require("express");
const router = express.Router();
const auth_controller = require('../controllers/auth_controller')

router.post('/sign-up', auth_controller.post_sign_up)

router.post('/sign-in', auth_controller.post_sign_in)

module.exports = router;