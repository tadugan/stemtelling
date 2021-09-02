const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  const query = `SELECT "user".name AS username, "user".id AS user_id, "class".name AS class_name, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "reaction".name AS reaction_name, "tag".name AS tag_name
  FROM "stemtell"
  JOIN "user" ON "stemtell".user_id = "user".id
  JOIN "user_class" ON "user".id = "user_class".user_id
  JOIN "class" ON "user_class".class_id = "class".id
  JOIN "stemtell_tag" ON "stemtell".id = "stemtell_tag".stemtell_id
  JOIN "tag" ON "stemtell_tag".tag_id = "tag".id
  JOIN "reaction_stemtell" ON "stemtell".id = "reaction_stemtell".stemtell_id
  JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
  WHERE "class".id = 1;`;
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

router.get('/userstemtells', (req, res) => {
   const query = `SELECT "user".name AS username, "user".id AS user_id, "class".name AS class_name, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "reaction".name AS reaction_name, "tag".name AS tag_name
   FROM "stemtell"
   JOIN "user" ON "stemtell".user_id = "user".id
   JOIN "user_class" ON "user".id = "user_class".user_id
   JOIN "class" ON "user_class".class_id = "class".id
   JOIN "stemtell_tag" ON "stemtell".id = "stemtell_tag".stemtell_id
   JOIN "tag" ON "stemtell_tag".tag_id = "tag".id
   JOIN "reaction_stemtell" ON "stemtell".id = "reaction_stemtell".stemtell_id
   JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
   WHERE "user".id = $1;`;
   pool
     .query(query, ['2'])
     .then((result) => {
       res.send(result.rows);
     })
     .catch((err) => {
       console.log("Error getting user STEMtells", err);
       res.sendStatus(500);
     });
 });

module.exports = router;
