const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET all STEMtells that have not been approved, filtered to only show stemtells for the user/teacher's classes
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const teacherId = req.user.id;
    
    const queryText = `
    SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
    FROM "stemtell"
    JOIN "user" ON "stemtell".user_id = "user".id
    JOIN "class" ON "stemtell".class_id = "class".id
    WHERE "stemtell".class_id IN (
        SELECT class_id
        FROM "user_class"
        WHERE user_id = $1
    ) 
        AND "stemtell".approved = 'false'
        AND "user".authority != 'teacher'
    ;
    `;

    pool.query(queryText, [teacherId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(err => {
            console.log("Error getting review STEMtells:", err);
            res.sendStatus(500);
          });

});

/**
 * POST
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
