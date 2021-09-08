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


/**
 * POST for adding tags to new user
 */
 router.post('/profile', rejectUnauthenticated, (req, res) => {
  const tagIdArray = req.body.tag_ids;
  const userId = req.user.id;

  (async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const queryTextAddTag = `
        INSERT INTO "user_tag" ("user_id", "tag_id")
        VALUES ($1, $2)
        `;

        for (let id of tagIdArray) {
            await client.query(queryTextAddTag, [userId, id]);
        }

        await client.query('COMMIT');
        
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack))
});
      
module.exports = router;
