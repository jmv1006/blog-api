const Post = require('../models/post');
const Comment = require('../models/comment');

//<----- GET all posts ----->
exports.get_all_posts = (req, res) => {
    Post.find({}).populate('author', '-password').exec((err, posts) => {
        if(err) {
            return res.status(400).json('Error getting posts')
        }
        return res.status(200).json(posts)
    })
};

exports.get_published_posts = (req, res) => {
    Post.find({isPublished: true}).populate('author', '-password').exec((err, posts) => {
        if(err) {
            return res.status(400).json('Error getting posts')
        }
        return res.status(200).json(posts)
    })
}
//<----- GET specific post ----->
exports.get_specific_post = (req, res) => {
    Post.findById(req.params.postId).populate('author', '-password').exec((err, post) => {
        if(err) {
           return res.status(400).json('Error getting specific post')
        }
        return res.status(200).json(post)
    });
};

    
//<----- Create new post ----->
exports.create_post = (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
        isPublished: req.body.isPublished,
        date: new Date()
    })

    newPost.save((error) => {
        if(error) {
            return res.status(400).json('Error creating post')
        }
        return res.status(200).json('Succesfully created post')
    })
}

//<----- UPDATE post ----->
exports.update_post = (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, { title: req.body.title, text: req.body.text}, (err, result) => {
        if(err) {
            return res.status(400).json('Error updating post')
        }
        return res.status(200).json(result)
    })
};

//<----- Delete Post ----->
exports.delete_post = (req, res) => {
    Post.findByIdAndDelete(req.params.postId, (err, post) => {
        if(err) {
            return res.status(400).json('Error deleting post')
        }
        Comment.find({postId: post._id}, (err, result) => {
            if(err) {
                //error deleting comments
                return res.status(400).json("Deleted Post, but had an error deleting comments.")
            }
        })
        return res.status(200).json({isDeleted: true})
    })
};

//<---- GET all comments for post ---->
exports.get_post_comments = (req, res) => {
    Comment.find({postId: req.params.postId}).populate('author', '-password').exec((err, comments) => {
        if(err) {
            res.status(400).json('Error finding comments')
        }
        res.status(200).json(comments)
    })
};

//<----- Create new comment ----->
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
};

//<-----  delete comment ----->
exports.delete_comment = (req, res) => {
    if(req.user.isAdmin) {
        Comment.findByIdAndDelete(req.params.commentId, (error) => {
            if(error) {
                return res.status(400).json('Error deleting comment')
            }
            return res.status(200).json('Succesfully deleted comment')
        })
    } else {
        return res.status(401).json('Only admins can delete comments')
    }
}

exports.update_comment = (req, res) => {
    const updateBlock = {
        text: req.body.text
    }

    Comment.findByIdAndUpdate(req.params.commentId, updateBlock, (err) => {
        if(err) {
            return res.status(400).json("Error updating comment")
        }
        return res.status(200).json("Succesfully Updated Comment")
    })
}

exports.toggle_post_publishedStatus = (req, res) => {
    let updateBlock = {}

    if(req.body.isPublished) {
        updateBlock = {
            isPublished: false
        }
    } else {
        updateBlock = {
            isPublished: true
        }
    }

    Post.findByIdAndUpdate(req.params.postId, updateBlock, (err, updatedPost) => {

        if(err) {
            return res.status(400).json('Error finding post to update.')
        }
        
        res.status(200).json(updateBlock)
    })
}