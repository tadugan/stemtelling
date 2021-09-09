const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// GET /api/reaction
// Handles getting all reactions 
router.get("/", (req, res) => {
  const query = `SELECT *
                 FROM "reaction"
                 `;
  pool.query(query)
  .then(results => {
     res.send(results.rows);
  })
  .catch(error => {
     console.log("Error getting stemReactions:", error);
     res.sendStatus(500);
  });
});

// GET /api/reaction/:id
// Handles getting reactions for a specific STEMtell
router.get("/:id", (req, res) => {
  const stemtellId= req.params.id;
  const query = `SELECT *
                 FROM "reaction_stemtell"
                 JOIN "reaction" ON "reaction_stemtell".reaction_id = "reaction".id
                 WHERE "reaction_stemtell".stemtell_id = $1;
                 `;
  pool.query(query, [stemtellId])
  .then(results => {
     res.send(results.rows);
  })
  .catch(error => {
     console.log("Error getting stemReactions:", error);
     res.sendStatus(500);
  });
});
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
