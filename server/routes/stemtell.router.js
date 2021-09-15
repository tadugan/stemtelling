const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { response } = require("express");
const {cloudinary} = require('../modules/cloudinary');


// GET /api/stemtell
// Handles getting all STEMtells from database
router.get('/', rejectUnauthenticated, (req, res) => {
   const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                  FROM "stemtell"
                  JOIN "user" ON "stemtell".user_id = "user".id
                  JOIN "class" ON "stemtell".class_code = "class".code
                  ORDER BY "stemtell".unix DESC;`;
   pool.query(query)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting all STEMtells in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/stemtell/homefeed
// Handles getting all STEMtells for the users homepage
// Called on a homepage
// Returns an array of STEMtell objects: { username, author_id, stem_id, title, media_url, body_text, profile_picture_url, unix, class_name }
router.get('/homefeed', rejectUnauthenticated, (req, res) => {
   const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                  FROM "stemtell"
                  JOIN "user" ON "stemtell".user_id = "user".id
                  JOIN "class" ON "stemtell".class_code = "class".code
                  WHERE "stemtell".class_code IN (
                  SELECT "class_code"
                  FROM "user_class"
                  WHERE "user_class".user_id = $1
                  AND "stemtell".approved IS TRUE )
                  ORDER BY "stemtell".unix DESC;`;
   pool.query(query, [req.user.id])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user's class stemtells in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// GET api/stemtell/tags/:id
// Handles getting all tags for one STEMtell
// Called on an edit STEMtell page or a STEMtell details page
// Returns an array of STEMtag objects: { id, name, stem_field, type }
router.get('/tags/:id', rejectUnauthenticated, (req, res) => {
   const stemtellId = Number(req.params.id);
   const queryText = `SELECT "tag".id, "tag".name, "tag".stem_field, "tag".type
                      FROM "stemtell_tag"
                      JOIN "tag" ON "tag".id = "stemtell_tag".tag_id
                      WHERE "stemtell_tag".stemtell_id = $1;`;
   pool.query(queryText, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting existing tags in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// POST /api/stemtell/
// Handles posting a new STEMtell and its associated tags
// Called on a create STEMtell page
// Returns a 201 status
router.post('/', rejectUnauthenticated, async (req, res) => {
   const client = await pool.connect();
   const newStemtell = req.body.details;
   const imageData = req.body.image_data;
   const user = req.user;
   if (req.user.authority == 'teacher') {
      try {
         const imageResponse = await cloudinary.uploader.upload(imageData, {
            upload_preset: 'stemtell-content-image'
         });
         await client.query("BEGIN");
         const queryTextAddStemtell = `INSERT INTO "stemtell" ("class_code", "user_id", "title", "body_text", "media_url", "approved", "unix")
                                       VALUES ($1, $2, $3, $4, $5, $6, extract(epoch from now()))
                                       RETURNING id`;
         const response = await client.query(queryTextAddStemtell, [newStemtell.class_code, user.id, newStemtell.title, newStemtell.body_text, imageResponse.url, true]);
         const stemtellId = response.rows[0].id;
         const queryTextAddTag = `INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
                                  VALUES ($1, $2) `;
         for (let id of newStemtell.tag_ids) {
            await client.query(queryTextAddTag, [id, stemtellId]);
         };
         await client.query("COMMIT");
         res.sendStatus(201);
      }
      catch (error) {
         await client.query("ROLLBACK");
         throw error;
      }
      finally {
         client.release();
      };
   }
   else {
      try {
         const imageResponse = await cloudinary.uploader.upload(imageData, {
            upload_preset: 'stemtell-content-image'
         });
         await client.query("BEGIN");
         const queryTextAddStemtell = `INSERT INTO "stemtell" ("class_code", "user_id", "title", "body_text", "media_url", "unix")
                                       VALUES ($1, $2, $3, $4, $5, extract(epoch from now()))
                                       RETURNING id`;
         const response = await client.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, imageResponse.url]);
         const stemtellId = response.rows[0].id;
         const queryTextAddTag = `INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
                                  VALUES ($1, $2) `;
         for (let id of newStemtell.tag_ids) {
            await client.query(queryTextAddTag, [id, stemtellId]);
         };
         await client.query("COMMIT");
         res.sendStatus(201);
      }
      catch (error) {
         await client.query("ROLLBACK");
         throw error;
      }
      finally {
         client.release();
      };
   };
});


// PUT /api/stemtell/save
// Handles updating information for a specific STEMtell that has been edited
// Called on an edit STEMtell page
// Returns a 201 status
router.put('/save', rejectUnauthenticated, async (req, res) => {
   console.log(req.body);
   const newStemtell = req.body.details;
   const user = req.user;
   const imageData = req.body.image_data;
   const stemtellId = req.body.details.id;
   const client = await pool.connect();
      try {
         await client.query("BEGIN");
         const queryTextAddStemtell = `UPDATE "stemtell" SET "class_code" = $1, "user_id" = $2, "title" = $3, "body_text" = $4 WHERE "id" = $5`;
         const response = await client.query(queryTextAddStemtell, [newStemtell.class_code, user.id, newStemtell.title, newStemtell.body_text, stemtellId,]);
         const queryTextDeleteExistingTags = `DELETE FROM "stemtell_tag" WHERE stemtell_id = $1;`;
         await client.query(queryTextDeleteExistingTags, [stemtellId]);
         const queryTextAddTag = `INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
                                  VALUES ($1, $2)`;
         for (let id of newStemtell.tag_ids) {
            await client.query(queryTextAddTag, [id, stemtellId]);
         };
         await client.query("COMMIT");
         res.sendStatus(201);
      }
      catch (error) {
         await client.query("ROLLBACK");
         throw error;
      }
      finally {
         client.release();
   };
});


// GET /api/stemtell/userstemtells
// Handles getting all stemtells associated with a specific user ID
// Called on a profile page
// Returns an array of STEMtell objects: { id, class_code, user_id, title, body_text, media_url, unix, approved }
router.get('/userstemtells', rejectUnauthenticated, (req, res) => {
   const profilePageID = req.query.profileID;
   const qText = `SELECT * FROM "stemtell" WHERE "user_id" = $1 AND "approved" IS TRUE`;
   pool.query(qText, [profilePageID])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user STEMtells in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/mystemtells
// Used to get a specific user's STEMtells
// Called on a my profile page
// Returns an array of STEMtell objects: { id, class_code, user_id, title, body_text, media_url, unix, approved }
router.get('/mystemtells', rejectUnauthenticated, (req, res) => {
   const profilePageID = req.query.profileID;
   const query = `SELECT * FROM "stemtell" WHERE "user_id" = $1`;
   pool.query(query, [profilePageID])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user STEMtells in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/stemtell/getstemtell
// Handles getting a specific STEMtell from a specific user
// Called on a myprofile page
// Returns a STEMtell object: {}
router.get('/getstemtell', rejectUnauthenticated, (req, res) => {
   const stemtellID = req.query.stemtellID;
   const user = req.user.id;
   const query = `SELECT * FROM "stemtell" WHERE "id" = $1 AND "user_id" = $2`;
   pool.query(query, [stemtellID, user])
   .then(results => {
      console.log(results.rows)
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting STEMtell to edit in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// GET /api/stemtell/details/:id
// Handles getting all details associated with a specific STEMtell
// Called on a STEMtell details page
// Returns a STEMtell object: { name, author_id, id, title, media_url, body_text, profile_picture_url, unix, class_name }
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const stemtellId = req.params.id;
   const query = `SELECT "user".name , "user".id as author_id, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                  FROM "stemtell"
                  JOIN "user" ON "stemtell".user_id = "user".id
                  JOIN "class" ON "stemtell".class_code = "class".code
                  WHERE "stemtell".id = $1`;
   pool.query(query, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting all STEMdetails in stemtell.router.js:", error);
      res.sendStatus(500);
   });
});


// PUT /api/stemtell/status
// Handles updating the status of a STEMtell with Teacher Feedback Form
// Called on a review STEMtells page
// Returns nothing
router.put('/status', rejectUnauthenticated, (req, res) => {
   const status = req.body;
   const query = `UPDATE "stemtell" SET "approved" = $1 WHERE "id" = $2;`;
   pool.query(query, [status.status, status.id])
   .then(res => {
      res.data;
   })
   .catch(error => {
      console.log("Error updating STEMtell status in stemtell.router.js:", error);
   });
});


// DELETE /api/stemtell/delete/:id
// Handles deleting a specific STEMtell
// Called on a my profile page
// Returns a 201 status
router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
   const client = await pool.connect();
   const stemID = req.params.id;
   const userID = req.user.id;
   const tagQuery = `DELETE FROM "stemtell_tag" WHERE "stemtell_id" = $1`;
   const reactionQuery = `DELETE FROM "reaction_stemtell" WHERE "stemtell_id" = $1`;
   const stemtellQuery = `DELETE FROM "stemtell" WHERE "id" = $1 AND "user_id" = $2`;
   try {
      await pool.query(tagQuery, [stemID]);
      await pool.query(reactionQuery, [stemID]);
      pool.query(stemtellQuery, [stemID, userID])
      .then(() => {
         res.sendStatus(201);
      })
      .catch(error => {
         console.log("Error deleting STEMtell in stemtell.router.js:", error);
         res.sendStatus(500);
      });
   }
   catch (error) {
      await client.query("ROLLBACK");
      throw error;
   }
   finally {
      client.release();
};
});


module.exports = router;