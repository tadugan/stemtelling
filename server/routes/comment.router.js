const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText= `SELECT * FROM comment`
  pool
    .query(queryText)
    .then((res) => {
      console.log('successful GETTING comments', res.rows);
      res.send(res.rows);
    })
    .catch((err) => {
      console.log('error GETTING comments', err);
    });
     res.sendStatus(200); // For testing only, can be removed
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
