const Post = require('./models/post')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const Comment = require('./models/comment')
/*
const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date }
})
*/

/*
User.findById('625f40498b7d01b8d607c171', (err, user) => {

    const samplePosts = new Post({
        title: 'Test Title 1',
        text: 'TEST TEXT FOR TEST POST 1',
        author: user._id,
        date: new Date()
    });

    samplePosts.save((err) => {
        if(err) {
            return console.log('error saving sample post')
        }
        console.log('succesfully saved post')
    })
})
*/

/*
bcrypt.hash('PWHERE', 10, (err, hashedPassword) => {
    const newUser = new User({
        username: 'jmv1006@gmail.com',
        displayName: 'jmv1006',
        password: hashedPassword,
        isAdmin: true
    })

    newUser.save((err) => {
        if(err) {
            return console.log('Error saving sample user')
        }
        console.log('Succesfully saved sample user')
    });

})
*/


const sampleComment = new Comment({
    postId: '625f4f9334ef7b124e6baf21',
    text: 'This is a sample comment',
    author: '625f8d0992b71eaa2c8e0fc0',
    date: new Date()
})

sampleComment.save((error) => {
    if(error) {
        return console.log('Error saving sample comment')
    }
    console.log('Succesfully saved sample comment')
})