const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  const query = `SELECT "user".name AS username, "user".id AS user_id, "class".name AS class_name, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "reaction".name AS reaction_name, "tag".name AS tag_name
  FROM "stemtell"
  FULL OUTER JOIN "user" ON "stemtell".user_id = "user".id
  FULL OUTER JOIN "user_class" ON "user".id = "user_class".user_id
  FULL OUTER JOIN "class" ON "user_class".class_id = "class".id
  FULL OUTER JOIN "stemtell_tag" ON "stemtell".id = "stemtell_tag".stemtell_id
  FULL OUTER JOIN "tag" ON "stemtell_tag".tag_id = "tag".id
  FULL OUTER JOIN "reaction_stemtell" ON "stemtell".id = "reaction_stemtell".stemtell_id
  FULL OUTER JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
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
   const currentUserID = req.user.id;
   console.log(req.query.profileID);
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
