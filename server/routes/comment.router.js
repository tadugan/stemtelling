const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");


// GET /api/comment
// Handles getting comments
// Called on a STEMtell details page
// Returns
router.get("/", rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM comment;`;
   pool.query(query)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting comments in comment.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/comment/stemcomments/:id
// Handles getting comments for a specific STEMtell
// Called on a STEMtell details page
// Returns an array of comment items: { username, id, profile_picture_url, comment, unix }
router.get("/stemcomments/:id", rejectUnauthenticated, (req, res) => {
   const stemtellId= req.params.id;
   const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id
                  FROM "comment"
                  JOIN "user" ON "comment".user_id = "user".id
                  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
                  WHERE  "comment".teacher_feedback = FALSE
                  AND "stemtell".id = $1
                  ORDER BY "comment".unix ASC ;`;
   pool.query(query, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting stemComments in comment.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/comment/feedback
// Handles getting teacher feedback for a specific STEMtell
// Called on a review STEMtell page
// Returns an array of teacher comments: { username, id, profile_picture_url, comment, unix, authority }
router.get("/feedback/:id", rejectUnauthenticated, (req, res) => {
   let stemtellId = req.params.id;
   const query = `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".unix, "comment".id, "user".authority
                  FROM "comment"
                  JOIN "user" ON "comment".user_id = "user".id
                  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
                  WHERE "comment".stemtell_id = $1 AND "comment".teacher_feedback=TRUE;`;
   pool.query(query, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting teacher feedback in comment.router.js:", error);
      res.sendStatus(500);
   });
});


// POST /api/comment/
// Handles posting a comment to a specific STEMtell
// Called on a STEMtell details page or a review STEMtell page
// Returns a 201 status
router.post(`/`, rejectUnauthenticated, (req, res) => {
   const query = `INSERT INTO "comment" ("stemtell_id", "user_id", "comment", "teacher_feedback", "unix")
                            VALUES ($1, $2, $3, $4 , extract(epoch from now()));`;
   pool.query(query, [req.body.stemtell_id, req.user.id, req.body.comment, req.body.teacher_feedback])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log("Error posting comment in comment.router.js:", error);
      res.sendStatus(500);
   });
});


module.exports = router;