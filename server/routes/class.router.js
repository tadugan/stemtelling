const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;


// GET api/class/
// Returns an array of class object: { class object model }
router.get('/', rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM "class"
                  JOIN "user_class" ON "user_class".class_code = "class".code
                  WHERE "user_class".user_id = $1
                  ORDER BY "archived", "name" ASC;`
   pool.query(query, [req.user.id])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting teacher's classes:", error);
      res.sendStatus(500);
   });
});


// GET /api/class/allclasses
// Used to check if the class a user is trying to join is valid in the database
router.get('/allclasses', rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM "class"`;
   pool.query(query)
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting all classes:", error);
      res.sendStatus(500);
   });
});

// GET /api/class/details/:id
// Gets list of students in a particular class
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const classId= req.params.id;
   const query= `SELECT "user".name AS username, "user".profile_picture_url
                 FROM "user"
                 JOIN "user_class" ON "user".id = "user_class".user_id
                 JOIN "class" on "class".code = "user_class".class_code
                 WHERE  "user".authority = 'student'
                 AND "user_class".class_code = $1
                 ORDER BY username ASC;`;
   pool.query(query, [classId])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log('Error getting studentList', error);
      res.sendStatus(500);
   });
});


// GET /api/class/userclasses
// Gets a list of classes a student is in
router.get('/userclasses', rejectUnauthenticated, async (req, res) => {
   try {
      let sendBackObj = [];
      const query = `SELECT * FROM "user_class" WHERE "user_id" = $1`;
      const queryText = `SELECT * FROM "class" WHERE "code" = $1 AND "archived" = $2`
      const myClasses = await pool.query(query, [req.query.user]);
      for (let x of myClasses.rows) {
         const classObj = await pool.query(queryText, [x.class_code, "Active"]);
         sendBackObj.push(classObj.rows[0]);
      }
      res.send(sendBackObj);
   }
   catch(error) {
      console.log(`Error getting user classes`, error);
      res.sendStatus(500);
   };
});

// TODO: Setup class creation! 

// POST route to INSERT STUDENT INTO EXISTING CLASS. May need another for teacher to create class.
/**
 * POST route template
 */
// router.post('/newclass', rejectUnauthenticated, (req, res) => {
  // POST route code here
//   console.log(req.body);
//   const query = `
//   INERT INTO "class" ("name")
//   VALUES ($1);
//   `;
//   pool.query(query, [req.body.name])
//   .then((results) => {
//     console.log('Created new class');
//     res.sendStatus(201);
//   })
//   .catch((error) => {
//     console.log(`Could not create new class`, error);
//     res.sendStatus(500);
//   });
// });

router.post('/', rejectUnauthenticated, (req, res) => {
   (async () => {
     const client = await pool.connect();
     try {
         await client.query('BEGIN');
         //Function that generates random number
         await client.query( `
         CREATE OR REPLACE FUNCTION random_between(low INT, high INT)
         RETURNS INT AS
         $$
         BEGIN
         RETURN floor(random()* (high-low +1) + low);
         END;
         $$ language 'plpgsql' STRICT;
         `);
         
         // INSERT new value into the class table
         const name = req.body.name;
         const newClassCode = await client.query(
            `INSERT INTO "class" ("code", "name")
            VALUES (CONCAT(random_between(1,1000000))::INT, $1)
            RETURNING code
            `, [name]
         );
         // await client.query(newClassCode, [classCode, name]);
         await client.query(`INSERT INTO "user_class" ("user_id", "role", "class_code")
                             VALUES ($1, $2, $3)`, [req.user.id, req.user.authority, newClassCode.rows[0].code])
         await client.query('COMMIT');
         res.send(newClassCode);
     } catch (err) {
         await client.query('ROLLBACK');
         throw err;
     } finally {
       client.release();
     }
   })().catch(e => console.error(e.stack))
 });

/**
 * POST for adding to new student to class
 */
router.post('/joinclass', rejectUnauthenticated, async (req, res) => {
   const userId = req.user.id;
   const userRole = req.user.authority;
   const client = await pool.connect();
   try {
      await client.query('BEGIN');
      const queryTextJoinClass = `INSERT INTO "user_class" ("user_id", "role", "class_code")
                                  VALUES ($1, $2, $3)`;
      await client.query(queryTextJoinClass, [userId, userRole, req.body.class_code]);
      await client.query('COMMIT');
   }
   catch (error) {
      await client.query('ROLLBACK');
      throw error;
   }
   finally {
      client.release();
   };
});

//PUT for updating class information such as title
router.put("/update", rejectUnauthenticated, (req,res) => {
   const query = `UPDATE "class" 
                  SET "name"= $1, "archived" = $2
                  WHERE "code"= $3;`;
   pool
     .query(query, [
       req.body.name,
       req.body.archived,
       req.body.code,
     ])
     .then((result) => {
       res.sendStatus(201);
     })
     .catch((error) => {
       console.log("error updating class", error);
       res.sendStatus(500);
     });
})

// DELETE /api/class/details/:id
// Removes students from a class
router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
   const query = `DELETE FROM user_class WHERE "user_id" = $1;`;  
   pool.query(query, [req.params.id])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log(`Error deleting student from class:`, error);
      res.sendStatus(500);
   });
});

router.delete('/leaveclass', rejectUnauthenticated, (req, res) => {
   const query = `DELETE FROM "user_class" WHERE "user_id" = $1 AND "class_code" = $2`;
   pool.query(query, [req.user.id, req.query.class_code])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log(`Error deleting student from class:`, error);
      res.sendStatus(500);
   });
});


module.exports = router;