const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const rejectUnauthenticated =
  require("../modules/authentication-middleware").rejectUnauthenticated;

/**
 * GET route to grab
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".date_published, "comment".id
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE  "comment".teacher_feedback = FALSE
  and "stemtell".id = 2
  ORDER BY "comment".date_published ASC 
  ;`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error GETTING comments", err);
    });
});

router.get("/feedback", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".date_published, "comment".id, "user".authority
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
  const queryAddComment = `INSERT INTO "comment" ("stemtell_id", "user_id", "comment", "teacher_feedback", "date_published")
  VALUES ($1, $2, $3, $4 , NOW());`;
  pool
    .query(queryAddComment, [
      req.query.stemtell_id,
      req.user.id,
      req.body.comment,
      req.body.date_published,
      req.body.teacher_feedback,
    ])
    .then((result) => {
      console.log("New comment posted", result);
    })
    .catch((error) => {
      console.log("Error Posting comment", error);
    });
});

module.exports = router;
