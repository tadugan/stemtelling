const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST a new STEMtell
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newStemtell = req.body;
    const user = req.user;

    const queryText = `
    INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "date_published")
	  VALUES ($1, $2, $3, $4, $5, NOW());
    `;

    pool.query(queryText, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, newStemtell.media_url])
      .then(response => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log('Error adding new stemtell to database. Error:', error);
        res.sendStatus(500);
      });
});

module.exports = router;
