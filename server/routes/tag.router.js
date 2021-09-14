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


// POST /api/tag/profile
// Used to add tags to a profile
router.post('/profile', rejectUnauthenticated, async (req, res) => {
   const tagIdArray = req.body.tag_ids;
   const userId = req.user.id;
   const client = await pool.connect();
   try {
      await client.query('BEGIN');
      const queryTextAddTag = `INSERT INTO "user_tag" ("user_id", "tag_id")
                               VALUES ($1, $2)`;
      for (let id of tagIdArray) {
         await client.query(queryTextAddTag, [userId, id]);
      }
      await client.query('COMMIT');
   }
   catch (error) {
      await client.query('ROLLBACK');
      throw error;
   }
   finally {
      client.release();
   };
});


module.exports = router;