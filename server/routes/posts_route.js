const express = require("express");
const router = express.Router();
const passport = require('passport')
const posts_controller = require('../controllers/posts_controller')


router.get('/all', posts_controller.get_all_posts)

router.get('/', posts_controller.get_published_posts)

router.post('/create', passport.authenticate('jwt', {session: false}), posts_controller.create_post)

router.get('/:postId', posts_controller.get_specific_post)

router.get('/:postId/comments', posts_controller.get_post_comments)

router.post('/:postId/comments', passport.authenticate('jwt', {session: false}), posts_controller.create_comment)

router.delete('/:postId/comments/:commentId', passport.authenticate('jwt', {session: false}), posts_controller.delete_comment)

router.put('/:postId', passport.authenticate('jwt', {session: false}), posts_controller.update_post)

router.delete('/:postId', passport.authenticate('jwt', {session: false}), posts_controller.delete_post)

router.post('/:postId/toggle-publish', posts_controller.toggle_post_publishedStatus)

module.exports = router;