const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();
const {cloudinary} = require('../modules/cloudinary');


// GET /api/user/
// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
   // Send back user object from the session (previously queried from the database)
   res.send(req.user);
});


// GET /api/user/all
// Handles GET request for getting all user IDs
router.get('/all', rejectUnauthenticated, (req, res) => {
   const qText = `SELECT "id" FROM "user"`;
   pool.query(qText)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log('Get all users failed:', error);
      res.sendStatus(500);
   });
});


// GET /api/user/profile
// Handles GET request for getting the current profile page via user ID
router.get('/profile', rejectUnauthenticated, (req, res) => {
   const profileID = req.query.profileID;
   const qText = `SELECT * FROM "user" WHERE "id" = $1`;
   pool.query(qText, [profileID])
   .then(results => {
      res.send(results.rows)
   })
   .catch(error => {
      console.log('Get user profile failed:', error);
      res.sendStatus(500);
   });
});


// POST /api/user/register
// Handles POST request with new user data
router.post('/register', (req, res, next) => {
   const teacherCode = req.body.teacherCode;
   const email = req.body.email.toLowerCase();
   const password = encryptLib.encryptPassword(req.body.password);
   const name = req.body.name;
   const authority = req.body.authority;
   const profilePictureURL = req.body.profilePictureURL;
   const studentQuery = `INSERT INTO "user" (email, password, name, authority, profile_picture_url)
                      VALUES ($1, $2, $3, $4, $5) RETURNING id`;
   const teacherQuery = `INSERT INTO "user" (email, password, name, authority, profile_picture_url)
                      VALUES ($1, $2, $3, $4, $5) RETURNING id`;
      if (authority == 'student') {
         pool.query(studentQuery, [email, password, name, authority, profilePictureURL])
            .then(() => {
               res.sendStatus(201);
            })
            .catch(error => {
               console.log('User registration failed:', error);
               res.sendStatus(500);
            });
      }
      else if (teacherCode == process.env.TEACHER_CODE) {
         pool.query(teacherQuery, [email, password, name, authority, profilePictureURL])
            .then(() => {
               res.sendStatus(201);
            })
            .catch(error => {
               console.log('User registration failed:', error);
               res.sendStatus(500);
            });
      }
      else if (teacherCode != process.env.TEACHER_CODE) {
         console.log('ERROR. Invalid Teacher Code.');
         res.sendStatus(500);
      }
      else {
         res.sendStatus(500);
      }
   
});


// POST /api/user/update
// Used to update a user profile
router.post('/update', rejectUnauthenticated, async (req, res) => {
   const client = await pool.connect();
   let queryImage = req.user.profile_picture_url;
   const imageData = req.body.picture;
   try {
      if (queryImage !== imageData) {
         const imageResponse = await cloudinary.uploader.upload(imageData, {
            upload_preset: 'stemtell-content-image'
         });
         queryImage = imageResponse.url;
      };
      await client.query("BEGIN");
      const queryText = `UPDATE "user" SET "name" = $1, "email" = $2, "profile_picture_url" = $3 WHERE "id" = $4`;
      await client.query(queryText, [req.body.name, req.body.email, queryImage, req.user.id]);
      await client.query("COMMIT");
      res.sendStatus(201);
   }
   catch (error) {
      await client.query("ROLLBACK");
      throw error;
   }
   finally {
      client.release();
   };
});   


// POST /api/user/login
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
   res.sendStatus(200);
});


// POST /api/user/logout
// clear all server session information about this user
router.post('/logout', (req, res) => {
// Use passport's built-in method to log out the user
   req.logout();
   res.sendStatus(200);
});


module.exports = router;