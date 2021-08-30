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
const interestRouter = require('./routes/interest.router');
const stemtagRouter = require('./routes/stemtag.router');
const resetPasswordRouter = require('./routes/resetpassword.router');
//const notificationRouter = require('./routes/notification.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/api/interesttag', interestRouter);
app.use('/api/stemtag', stemtagRouter);
app.use('/api/resetpassword', resetPasswordRouter);
//app.use('/api/notification', notifcationRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
