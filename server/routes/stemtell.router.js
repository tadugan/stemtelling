const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.get('/', (req, res) => {

  // GET route code here
  const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".date_published, "class".name AS class_name
  FROM "stemtell"
  JOIN "user" ON "stemtell".user_id = "user".id
  JOIN "class" ON "stemtell".class_id = "class".id
  WHERE "class".id = 2
  ORDER BY "stemtell".date_published DESC;`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting all STEMtells", err);
      res.sendStatus(500);
    });
});


/**
 * POST a new STEMtell
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newStemtell = req.body;
    const user = req.user;

    console.log('req.body', req.body);

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

router.get('/userstemtells', (req, res) => {
   const profilePageID = req.query.profileID;
   const query = `SELECT "user".name AS username, "user".id AS user_id, "class".name AS class_name, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "reaction".name AS reaction_name, "tag".name AS tag_name
   FROM "stemtell"
   FULL OUTER JOIN "user" ON "stemtell".user_id = "user".id
   FULL OUTER JOIN "user_class" ON "user".id = "user_class".user_id
   FULL OUTER JOIN "class" ON "user_class".class_id = "class".id
   FULL OUTER JOIN "stemtell_tag" ON "stemtell".id = "stemtell_tag".stemtell_id
   FULL OUTER JOIN "tag" ON "stemtell_tag".tag_id = "tag".id
   FULL OUTER JOIN "reaction_stemtell" ON "stemtell".id = "reaction_stemtell".stemtell_id
   FULL OUTER JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
   WHERE "user".id = $1;`;
   pool
     .query(query, [profilePageID])
     .then((result) => {
       res.send(result.rows);
     })
     .catch((err) => {
       console.log("Error getting user STEMtells", err);
       res.sendStatus(500);
     });
 });


module.exports = router;
