const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date }
})

module.exports = mongoose.model('Comment', CommentSchema);