const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT * FROM "class"
  JOIN "user_class" ON "user_class".class_id= "class".id
  WHERE "user_class".user_id = 3;`
  pool
  .query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log("Error getting teacher's classes", err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
