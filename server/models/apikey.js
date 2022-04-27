const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APIKeySchema = new Schema({
    type: { type: String, required: true },
    key: { type: String, required: true },
})

module.exports = mongoose.model('APIKey', APIKeySchema);