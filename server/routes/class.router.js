const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;


/**
 * GET api/class/
 * Description ...
 * Returns an array of class object: { class object model }
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "class"
  JOIN "user_class" ON "user_class".class_id = "class".id
  WHERE "user_class".user_id = $1`
  pool
  .query(query, [req.user.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log("Error getting teacher's classes", err);
    res.sendStatus(500);
  })
});


//gets students from a class list
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const classId= req.params.id;
  const query= `SELECT "user".name AS username, "user".profile_picture_url, "user_class".user_id
  FROM "user"
  JOIN "user_class" ON "user".id = "user_class".user_id
  join "class" on "class".id = "user_class".class_id
  WHERE  "user".authority = 'student'
  AND "user_class".class_id = $1;`;

  pool
    .query(query, [classId])
    .then((result) => {
      // console.log('successful GETTING studentList', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING studentList', err);
    });
});


// TODO: Setup class creation!
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

// TODO: Setup class edit? PUT


router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
  console.log(`What student is being DELETED:`, req.params.id);
  const query = `DELETE FROM user_class WHERE "user_id" = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      // console.log(`Successfully DELETED STUDENT from class`, result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Did not DELETE STUDENT from class`, error);
      res.sendStatus(500);
    });
  // endpoint functionality
});

module.exports = router;
