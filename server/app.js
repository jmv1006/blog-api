const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('./config/passport/strategies/local')
const JwtStrategy = require('./config/passport/strategies/jwt');

const db = require('./config/dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

passport.use(LocalStrategy);
passport.use(JwtStrategy);
app.use(passport.initialize());

//const populateDB = require('./populateDB')

const checkIfAdmin = (req, res, next) => {
    console.log('logger')
    next()
}

app.use(checkIfAdmin)

//<----- ROUTES HERE ----->
app.get('/', (req, res) => {
    res.status(200).json('API Working')
});

const authenticationRoute = require('./routes/authentication_route');
app.use('/auth', authenticationRoute)

const postsRouter = require('./routes/posts_route') //will require auth
app.use('/posts', postsRouter)

const userRouter = require('./routes/user_route'); //will require auth
app.use('/user', userRouter)

const PORT = process.env.port || '5000';

app.listen(PORT, () => {console.log(`App listening on port ${PORT}`)})