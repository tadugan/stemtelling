const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const stemtellId = req.query.stemtellId;
  console.log('stemtellID is:', stemtellId);
  const query= `select "user".name, "user".profile_picture_url , "comment".comment , "comment".date_published ,"comment".stemtell_id, "comment".teacher_feedback ,"comment".user_id, "stemtell".id, "comment".id
  from "comment"
  join "user" on "user".id = "comment".user_id 
  join "stemtell" on "stemtell".id = "comment".stemtell_id 
  where "comment".stemtell_id = 1 
  and "comment".teacher_feedback = false ;`;
  pool
    .query(query, [stemtellId])
    .then((result) => {
      console.log('successful GETTING comments', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING comments', err);
    });
     
});

router.get('/feedback', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query= `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".date_published, "comment".id, "user".authority 
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE "comment".stemtell_id = 2 AND "comment".teacher_feedback=TRUE;`;
  pool
    .query(query)
    .then((result) => {
      console.log('successful GETTING teacher feedback', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING teacher feedback', err);
    });
     
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
