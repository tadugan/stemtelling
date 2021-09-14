const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');


// Route includes
const userRouter = require('./routes/user.router');
const stemtellRouter = require('./routes/stemtell.router');
const classRouter = require('./routes/class.router');
const commentRouter = require('./routes/comment.router');
const reactionRouter = require('./routes/reaction.router');
const resetPasswordRouter = require('./routes/resetpassword.router');
const tagRouter = require('./routes/tag.router');
const reviewRouter = require('./routes/review.router');
const imageRouter = require('./routes/image.router');


// Body parser middleware
app.use(bodyParser.json({ limit: '50mb' })); // limit for image upload
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // limit for image upload


// Passport Session Configuration //
app.use(sessionMiddleware);


// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


/* Routes */
app.use('/api/user', userRouter);
app.use('/api/stemtell', stemtellRouter);
app.use('/api/class', classRouter);
app.use('/api/comment', commentRouter);
app.use('/api/reaction', reactionRouter);
app.use('/api/resetpassword', resetPasswordRouter);
app.use('/api/tag', tagRouter);
app.use('/api/review', reviewRouter);
app.use('/api/upload', imageRouter);


// Serve static files
app.use(express.static('build'));


// App Set //
const PORT = process.env.PORT || 5000;


/** Listen * */
app.listen(PORT, () => {
   console.log(`Listening on port: ${PORT}`);
});