const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET a list of all tags
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT *
    FROM "tag";
    `;

    pool.query(queryText)
        .then(response => {
            res.send(response.rows);
            //
            console.log(response.rows); // test
        })
        .catch(error => {
            console.log('Error retrieving list of tags. Error:', error);
            res.sendStatus(500);
        });
});

/**
 * POST
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
