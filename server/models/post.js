const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    isPublished: {type: Boolean, required: true},
    date: { type: Date }
})

module.exports = mongoose.model('Post', PostSchema);