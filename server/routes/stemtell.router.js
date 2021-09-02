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

    const queryTextAddStemtell = `
    INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "date_published")
	  VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING id;
    `;

    const queryTextAddTag = `
    INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
	  VALUES ($1, $2);
    `;

    pool.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, newStemtell.media_url])
      .then(response => {
        const stemTellId = response.rows[0].id;
        for (let i=0; i<newStemtell.tag_ids.length; i++) {
            pool.query(queryTextAddTag, [newStemtell.tag_ids[i], stemTellId])
                .then(response => {
                    console.log('i', i);
                    console.log('newStemtell.tag_ids.length', newStemtell.tag_ids.length)
                    if ( i === newStemtell.tag_ids.length) {
                        res.sendStatus(201);
                    }
                })
                .catch(error => {
                  console.log('Error adding tags to database. Error', error);
                  res.sendStatus(500);
              });
        }
        res.sendStatus(201);
      })
      .catch(error => {
        console.log('Error adding new stemtell to database. Error:', error);
        res.sendStatus(500);
      });
});

module.exports = router;
