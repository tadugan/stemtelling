const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = encryptLib.encryptPassword(req.body.password);
  const name = req.body.name;
  const authority = req.body.authority;
  const profilePictureURL = req.body.profilePictureURL;

  const queryText = `INSERT INTO "user" (email, password, name, authority, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [email, password, name, authority, profilePictureURL])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles POST request for resetting/updating the user password
// This is only called after an email has been entered, confirmed, and a new password has been selected by the user
// follows code similar to regular registration
router.post('/changepassword', (req, res, next) => {
   const password = encryptLib.encryptPassword(req.body.password);
   const userEmail = req.body.email.toLowerCase();
   const queryText = 'UPDATE "user" SET password = $1 WHERE email = $2';
   pool
      .query(queryText, [password, userEmail])
      .then(() => res.sendStatus(201))
      .catch((err) => {
         console.log('Change password failed: ', err);
         res.sendStatus(500);
      });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
