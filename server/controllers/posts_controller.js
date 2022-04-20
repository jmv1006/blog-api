const Post = require('../models/post');
const Comment = require('../models/comment');

exports.get_all_posts = (req, res) => {
    Post.find({}).populate('author', '-password').exec((err, posts) => {
        if(err) {
            return res.status(400).json('Error getting posts')
        }
        return res.status(200).json(posts)
    })
};

exports.get_specific_post = (req, res) => {
    Post.findById(req.params.postId).populate('author', '-password').exec((err, post) => {
        if(err) {
           return res.status(400).json('Error getting specific post')
        }
        return res.status(200).json(post)
    });
};

exports.create_post = (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
        date: new Date()
    })

    newPost.save((error) => {
        if(error) {
            return res.status(400).json('Error creating post')
        }
        return res.status(200).json('Succesfully created post')
    })
}

exports.update_post = (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, { title: req.body.title, text: req.body.text}, (err, result) => {
        if(err) {
            return res.status(400).json('Error updating post')
        }
        return res.status(200).json(result)
    })
};

exports.delete_post = (req, res) => {
    Post.findByIdAndDelete(req.params.postId, (err) => {
        if(err) {
            return res.status(400).json('Error deleting post')
        }
        return res.status(200).json('Succesfully deleted post')
    })
};

exports.get_post_comments = (req, res) => {
    Comment.find({postId: req.params.postId}, (err, comments) => {
        if(err) {
            res.status(400).json('Error finding comments')
        }
        res.status(200).json(comments)
    })
};

exports.create_comment = (req, res) => {

    const newComment = new Comment({
        postId: req.params.postId,
        text: req.body.text,
        author: req.user.id,
        date: new Date()
    })

    newComment.save((error => {
        if(error) {
            return res.status(400).json('Error creating comment')
        }
        res.status(200).json('Succesfully created new comment')
    }))

}