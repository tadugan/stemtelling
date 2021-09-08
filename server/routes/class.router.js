const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;


// GET api/class/
// Returns an array of class object: { class object model }
router.get('/', (req, res) => {
   const query = `SELECT * FROM "class"
                  JOIN "user_class" ON "user_class".class_id = "class".id
                  WHERE "user_class".user_id = $1`
   pool.query(query, [req.user.id])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting teacher's classes", error);
      res.sendStatus(500);
   });
});

// GET /api/class/details/:id
// gets students from a class list
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const classId = req.params.id;
   const query = `SELECT "user".name AS username, "user".profile_picture_url, "user_class".user_id
                  FROM "user"
                  JOIN "user_class" ON "user".id = "user_class".user_id
                  JOIN "class" on "class".id = "user_class".class_id
                  WHERE  "user".authority = 'student'
                  AND "user_class".class_id = $1;`;
   pool.query(query, [classId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log('error GETTING studentList', error);
      res.sendStatus(500);
   });
});

// TODO: Setup class creation!
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

// TODO: Setup class edit? PUT


// DELETE /api/class/details/:id
// Handles deleting a specific user from a specific class
router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
   const query = `DELETE FROM user_class WHERE "user_id" = $1;`;
   pool.query(query, [req.params.id])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log(`Did not DELETE STUDENT from class`, error);
      res.sendStatus(500);
   });
});


module.exports = router;