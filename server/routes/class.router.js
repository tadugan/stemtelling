const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;



//gets students from a class list
router.get('/', rejectUnauthenticated, (req, res) => {
  const query= `SELECT "user".name AS username, "user".profile_picture_url 
  FROM "user"
  JOIN "user_class" ON "user".id = "user_class".user_id
  join "class" on "class".id = "user_class".class_id
  WHERE  "user".authority = 'student'  ;`;
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

module.exports = router;
