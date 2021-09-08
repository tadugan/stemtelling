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
      console.log("Error getting teacher's classes:", error);
      res.sendStatus(500);
   });
});


//gets list of students in a particular class
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const classId= req.params.id;
  const query= `SELECT "user".name AS username, "user".profile_picture_url, "user_class".user_id
  FROM "user"
  JOIN "user_class" ON "user".id = "user_class".user_id
  join "class" on "class".id = "user_class".class_id
  WHERE  "user".authority = 'student'
  AND "user_class".class_id = $1
  ORDER BY username ASC;`;

  pool
    .query(query, [classId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING studentList', err);
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


//Removes students from a class
router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
  console.log(`What student is being DELETED:`, req.params.id);
  const query = `DELETE FROM user_class WHERE "user_id" = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log(`Error deleting student from class:`, error);
      res.sendStatus(500);
   });
});


module.exports = router;