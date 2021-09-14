const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");


// GET /api/reaction/:id
// Handles getting reactions for a specific STEMtell
router.get("/:id", rejectUnauthenticated, (req, res) => {
   const stemtellId= Number(req.params.id);
   const query = `SELECT * FROM "reaction_stemtell"
                  JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
                  WHERE "reaction_stemtell".stemtell_id = $1;
                  `;
   pool.query(query, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting stemReactions in reaction.router.js:", error);
      res.sendStatus(500);
   });
});


// POST /api/reaction
// Used to add a reaction to a STEMtell
router.post('/', (req, res) => {
   const query = `INSERT INTO "reaction_stemtell" ("stemtell_id", "user_id", "reaction_id")
                  VALUES ($1, $2, $3)`
   pool.query(query, [req.body.stemtell_id, req.user.id, req.body.reaction_id])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log("Error posting reaction in reaction.router.js:", error);
      res.sendStatus(500);
   });
});


// DELETE /api/reaction/reaction/:id
// Used to delete a user's reaction to STEMtell
router.delete("/reaction/:id", (req,res) => {
   const query = `DELETE FROM "reaction_stemtell" WHERE "user_id" = $1 AND "stemtell_id" = $2`;
   pool.query(query, [req.user.id, req.params.id])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log("Error deleting user reaction in reaction.router.js:", error);
      res.sendStatus(500);
   });
});


module.exports = router;