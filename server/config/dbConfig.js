const User = require('../models/user')
const Post = require('../models/post')

var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://jmv1006:${process.env.MONGO_PW}@blogapi.q4o99.mongodb.net/blogapi?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
