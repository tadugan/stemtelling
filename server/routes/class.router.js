const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;



//gets students from a class list
router.get('/details', rejectUnauthenticated, (req, res) => {
  const query= `SELECT "user".name AS username, "user".profile_picture_url, "user_class".user_id
  FROM "user"
  JOIN "user_class" ON "user".id = "user_class".user_id
  join "class" on "class".id = "user_class".class_id
  WHERE  "user".authority = 'student'
  AND "user_class".class_id = 1  ;`;
  pool
    .query(query)
    .then((result) => {
      console.log('successful GETTING studentList', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING studentList', err);
    });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});


router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
  console.log(`What student is being DELETED:`, req.params.id);
  const query = `DELETE FROM user_class WHERE "user_id" = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      console.log(`Successfully DELETED STUDENT from class`, result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Did not DELETE STUDENT from class`, error);
      res.sendStatus(500);
    });
  // endpoint functionality
});

module.exports = router;
