const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET /api/review
// Used to get STEMtells that have not been approved
router.get('/', rejectUnauthenticated, (req, res) => {
   if (req.user.authority !== 'teacher') {
      return;
   };
   const teacherId = req.user.id;
   const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                      FROM "stemtell"
                      JOIN "user" ON "stemtell".user_id = "user".id
                      JOIN "class" ON "stemtell".class_code = "class".code
                      WHERE "stemtell".class_code IN (
                        SELECT class_code
                        FROM "user_class"
                        WHERE user_id = $1
                      ) 
                      AND "stemtell".approved = 'false'
                      AND "user".authority != 'teacher';`;
   pool.query(query, [teacherId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting review STEMtells in review.router.js:", error);
      res.sendStatus(500);
   });
});


module.exports = router;