const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");


// GET /api/comment/
// Handles getting comments
router.get("/", rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM comment;`;
   pool.query(query)
   .then(results => {
      res.send(results.rows)
   })
   .catch(error => {
      console.log("Error getting comments:", error);
      res.sendStatus(500);
   });
});

// GET /api/comment/stemcomments/:id
// Handles getting comments for a specific STEMtell
router.get("/stemcomments/:id", rejectUnauthenticated, (req, res) => {
   const stemtellId= req.params.id;
   const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id
                  FROM "comment"
                  JOIN "user" ON "comment".user_id = "user".id
                  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
                  WHERE  "comment".teacher_feedback = FALSE
                  AND "stemtell".id = $1
                  ORDER BY "comment".unix ASC ;`;
   pool.query(query,[stemtellId] )
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting stemComments:", error);
      res.sendStatus(500);
   });
});

// GET /api/comment/feedback
// Handles getting teacher feedback for a specific STEMtell
router.get("/feedback", rejectUnauthenticated, (req, res) => {
   const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id, "user".authority
                  FROM "comment"
                  JOIN "user" ON "comment".user_id = "user".id
                  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
                  WHERE "comment".stemtell_id = 2 AND "comment".teacher_feedback=TRUE;`;
   pool.query(query)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting teacher feedback:", error);
      res.sendStatus(500);
   });
});

// POST /api/comment/
// Handles posting a comment to a specific STEMtell
router.post(`/`, rejectUnauthenticated, (req, res) => {
   const queryAddComment = `INSERT INTO "comment" ("stemtell_id", "user_id", "comment", "teacher_feedback", "unix")
                            VALUES ($1, $2, $3, $4 , extract(epoch from now()));`;
   pool.query(queryAddComment, [req.body.stemtell_id, req.user.id, req.body.comment, req.body.teacher_feedback,])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log("Error posting comment:", error);
      res.sendStatus(500);
   });
});


module.exports = router;