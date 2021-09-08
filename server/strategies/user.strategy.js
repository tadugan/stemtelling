const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Handles passport login security
passport.deserializeUser((id, done) => {
   pool.query('SELECT * FROM "user" WHERE id = $1', [id])
   .then(results => {
      const user = results && results.rows && results.rows[0];
      if (user) {
        delete user.password;
        done(null, user);
      }
      else {
        done(null, null);
      }
   })
   .catch(error => {
      console.log('Error with query during deserializing user:', error);
      done(error, null);
   });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (username, password, done) => {
   pool.query('SELECT * FROM "user" WHERE email = $1', [username])
   .then(results => {
      const user = results && results.rows && results.rows[0];
      if (user && encryptLib.comparePassword(password, user.password)) {
         done(null, user);
      }
      else {
         done(null, null);
      }
   })
   .catch(error => {
      console.log('Error with query for user:', error);
      done(error, null);
   });
}));


module.exports = passport;