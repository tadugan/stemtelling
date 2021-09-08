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
    const queryText = `
    
    `;

});

/**
 * POST
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
