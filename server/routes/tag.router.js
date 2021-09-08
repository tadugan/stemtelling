const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET /api/tag/
// Handles GET request for getting all tags
router.get('/', rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT * FROM "tag";`;
   pool.query(queryText)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log('Error retrieving list of tags:', error);
      res.sendStatus(500);
   });
});


module.exports = router;