const express = require("express");
const router = express.Router();
const posts_controller = require('../controllers/posts_controller')

router.get('/', posts_controller.get_all_posts)

router.post('/create', posts_controller.create_post)

router.get('/:postId', posts_controller.get_specific_post)

router.get('/:postId/comments', posts_controller.get_post_comments)

router.post('/:postId/comments', posts_controller.create_comment)

router.put('/:postId', posts_controller.update_post)

router.delete('/:postId', posts_controller.delete_post)

module.exports = router;