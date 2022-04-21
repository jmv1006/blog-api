const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true}
})

module.exports = mongoose.model('User', UserSchema);