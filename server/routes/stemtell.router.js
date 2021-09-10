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
                  JOIN "class" ON "stemtell".class_id = "class".id
                  ORDER BY "stemtell".unix DESC;`;
   pool.query(query)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting all STEMtells:", error);
      res.sendStatus(500);
   });
});

// GET /api/stemtell/homefeed
// Handles getting all STEMtells for the users homepage
router.get('/homefeed', rejectUnauthenticated, (req, res) => {
   const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                  FROM "stemtell"
                  JOIN "user" ON "stemtell".user_id = "user".id
                  JOIN "class" ON "stemtell".class_id = "class".id
                  WHERE "stemtell".class_id IN (
                  SELECT "class_id"
                  FROM "user_class"
                  WHERE "user_class".user_id = $1
                  AND "stemtell".approved IS TRUE )
                  ORDER BY "stemtell".unix DESC;`;
   pool.query(query, [req.user.id])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user's class stemtells:", error);
      res.sendStatus(500);
   });
});

//  GET api/stemtell/tags/:id
//  Handles getting all tags for one STEMtell
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
      console.log("Error getting existing tags:", error);
      res.sendStatus(500);
   });
});

// POST /api/stemtell/
// Handles posting a new STEMtell and its associated tags
router.post('/', rejectUnauthenticated, (req, res) => {
   const newStemtell = req.body.details;
   const imageData = req.body.image_data;
   const user = req.user;
   if (req.user.authority == 'teacher') {
      (async () => {
         const client = await pool.connect();
         try {
            const imageResponse = await cloudinary.uploader.upload(imageData, {
               upload_preset: 'stemtell-content-image'
            })
            await client.query("BEGIN");
            const queryTextAddStemtell = `INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "approved", "unix")
                                          VALUES ($1, $2, $3, $4, $5, $6, extract(epoch from now()))
                                          RETURNING id`;
            const response = await client.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, imageResponse.url, true]);
            const stemtellId = response.rows[0].id;
            const queryTextAddTag = `INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
                                     VALUES ($1, $2) `;
            for (let id of newStemtell.tag_ids) {
               await client.query(queryTextAddTag, [id, stemtellId]);
            };
            await client.query("COMMIT");
         }
         catch (error) {
            await client.query("ROLLBACK");
            throw error;
         }
         finally {
            client.release();
         }
      })().catch(error => console.error(error.stack));
   }
   else {
      (async () => {
         const client = await pool.connect();
         try {
            const imageResponse = await cloudinary.uploader.upload(imageData, {
               upload_preset: 'stemtell-content-image'
            })
   
            await client.query("BEGIN");
            const queryTextAddStemtell = `INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "unix")
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
         }
         catch (error) {
            await client.query("ROLLBACK");
            throw error;
         }
         finally {
            client.release();
         }
      })().catch(error => console.error(error.stack));
   }
});

// PUT /api/stemtell/save
// Handles updating information for a specific STEMtell that has been edited
router.put('/save', rejectUnauthenticated, (req, res) => {
   const newStemtell = req.body.details;
   const user = req.user;
   const imageData = req.body.image_data;
   const stemtellId = req.body.details.id;
   (async () => {
      const client = await pool.connect();
      try {
         const imageResponse = await cloudinary.uploader.upload(imageData, {
            upload_preset: 'stemtell-content-image'
         })
         await client.query("BEGIN");
         const queryTextAddStemtell = `UPDATE "stemtell" SET "class_id" = $1, "user_id" = $2, "title" = $3, "body_text" = $4, "media_url" = $5 WHERE "id" = $6`;
         const response = await client.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, imageResponse.url, stemtellId,]);
         const queryTextDeleteExistingTags = `DELETE FROM "stemtell_tag" WHERE stemtell_id = $1;`;
         await client.query(queryTextDeleteExistingTags, [stemtellId]);
         const queryTextAddTag = `INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
                                  VALUES ($1, $2)`;
         for (let id of newStemtell.tag_ids) {
            await client.query(queryTextAddTag, [id, stemtellId]);
         };
         await client.query("COMMIT");
      }
      catch (error) {
         await client.query("ROLLBACK");
         throw err;
      }
      finally {
         client.release();
      }
   })().catch(error => console.error(error.stack));
});

// GET /api/stemtell/userstemtells
// Handles getting all stemtells associated with a specific user ID
router.get('/userstemtells', rejectUnauthenticated, (req, res) => {
   const profilePageID = req.query.profileID;
   const qText = `SELECT * FROM "stemtell" WHERE "user_id" = $1 AND "approved" IS TRUE`;
   pool.query(qText, [profilePageID])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user STEMtells:", error);
      res.sendStatus(500);
   });
});

router.get('/mystemtells', rejectUnauthenticated, (req, res) => {
   const profilePageID = req.query.profileID;
   const qText = `SELECT * FROM "stemtell" WHERE "user_id" = $1`;
   pool.query(qText, [profilePageID])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting user STEMtells:", error);
      res.sendStatus(500);
   });
});

// GET /api/stemtell/getstemtell
// Handles getting a specific STEMtell from a specific user
router.get('/getstemtell', rejectUnauthenticated, (req, res) => {
   const stemtellID = req.query.stemtellID;
   const user = req.user.id;
   const query = `SELECT * FROM "stemtell" WHERE "id" = $1 AND "user_id" = $2`;
   pool.query(query, [stemtellID, user])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting STEMtell to edit:", error);
      res.sendStatus(500);
   });
});

// GET /api/stemtell/details/:id
// Handles getting all details associated with a specific STEMtell
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const stemtellId = req.params.id;
   const query = `SELECT "user".name , "user".id as author_id, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".unix, "class".name AS class_name
                  FROM "stemtell"
                  JOIN "user" ON "stemtell".user_id = "user".id
                  JOIN "class" ON "stemtell".class_id = "class".id
                  WHERE "stemtell".id = $1`;
   pool.query(query, [stemtellId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting all STEMdetails:", error);
      res.sendStatus(500);
   });
});

// PUT /api/stemtell/status
// Handles updating the status of a STEMtell with Teacher Feedback Form
router.put('/status', rejectUnauthenticated, (req, res) => {
  const status = req.body;
  const query = `
  UPDATE "stemtell"
  SET "approved" = $1
  WHERE "id" = $2;`;
  pool
    .query(query, [status.status, status.id]) //FIGURE THIS OUT
    .then((res) => {
      res.data
    })
    .catch((err) => {
      console.log("error updating STEMtell status", err);
    })
});

// DELETE /api/stemtell/delete/:id
// Handles deleting a specific STEMtell
router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
   const stemID = req.params.id;
   const userID = req.user.id;
   const tagQuery = `DELETE FROM "stemtell_tag" WHERE "stemtell_id" = $1`;
   const reactionQuery = `DELETE FROM "reaction_stemtell" WHERE "stemtell_id" = $1`;
   const stemtellQuery = `DELETE FROM "stemtell" WHERE "id" = $1 AND "user_id" = $2`;
   await pool.query(tagQuery, [stemID]);
   await pool.query(reactionQuery, [stemID]);
   pool.query(stemtellQuery, [stemID, userID])
   .then(() => {
      res.sendStatus(200);
   })
   .catch(error => {
      console.log("Error deleting STEMtell:", error);
      res.sendStatus(500);
   });
});

module.exports = router;