const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const rejectUnauthenticated =
  require("../modules/authentication-middleware").rejectUnauthenticated;




  router.get("/", rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM comment
    ;`;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows)
      })
      .catch((err) => {
        console.log("error GETTING comments", err);
      });
  });
/**
 * GET route to grab
 */
router.get("/stemcomments/:id", rejectUnauthenticated, (req, res) => {
  const stemtellId= req.params.id;
  const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE  "comment".teacher_feedback = FALSE
  and "stemtell".id = $1
  ORDER BY "comment".unix ASC 
  ;`;
  pool
    .query(query,[stemtellId] )
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log("error GETTING stemComments", err);
      res.sendStatus(500);
    });
});

router.get("/feedback", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id, "user".authority
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE "comment".stemtell_id = 2 AND "comment".teacher_feedback=TRUE;`;
  pool
    .query(query)
    .then((result) => {
      console.log("successful GETTING teacher feedback", result.rows); // remove
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error GETTING teacher feedback", err);
    });
});

/**
 * POST route template
 */
router.post(`/`, rejectUnauthenticated, (req, res) => {
  const queryAddComment = `INSERT INTO "comment" ("stemtell_id", "user_id", "comment", "teacher_feedback", "unix")
  VALUES ($1, $2, $3, $4 , extract(epoch from now()));`;
  pool
    .query(queryAddComment, [
      req.body.stemtell_id,
      req.user.id,
      req.body.comment,
      req.body.teacher_feedback,
    ])
    .then((result) => {
      console.log("New comment posted", result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error Posting comment", error);
      res.sendStatus(500);
    });
});

module.exports = router;
