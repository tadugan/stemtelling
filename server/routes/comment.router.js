const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query= `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".date_published, "comment".id, "user".authority 
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE  "user".authority = 'student'  ;`;
  pool
    .query(query)
    .then((result) => {
      console.log('successful GETTING comments', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING comments', err);
    });
     
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
