const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;


// GET api/class/
// Returns an array of class object: { class object model }
router.get('/', rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM "class"
                  JOIN "user_class" ON "user_class".class_id = "class".id
                  WHERE "user_class".user_id = $1`
   pool.query(query, [req.user.id])
   .then(results => {
      res.send(results.rows);
   })
   .catch(error => {
      console.log("Error getting teacher's classes:", error);
      res.sendStatus(500);
   });
});

// GET /api/class/details/:id
// Gets list of students in a particular class
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const classId= req.params.id;
   const query= `SELECT "user".name AS username, "user".profile_picture_url, "user_class".user_id
                 FROM "user"
                 JOIN "user_class" ON "user".id = "user_class".user_id
                 JOIN "class" on "class".id = "user_class".class_id
                 WHERE  "user".authority = 'student'
                 AND "user_class".class_id = $1
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


// TODO: Setup class creation! 
// POST route to create NEW Class
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
   console.log(req.body);
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
         const classCode = req.body.classCode;
         const name = req.body.name;
         const newClassCode = await client.query(
            `INSERT INTO "class" ("code", "name")
            VALUES (CONCAT(random_between(1000,10000))::INT, $1)
            
            `, [name]
         );
         // await client.query(newClassCode, [classCode, name]);

         await client.query('COMMIT');
         res.send(newClassCode);
         console.log(newClassCode);    
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
 router.post('/profile', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.authority;

  (async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const queryTextJoinClass = `
        INSERT INTO "user_class" ("user_id", "role", "class_id")
        VALUES ($1, $2, $3)
        `;

            await client.query(queryTextJoinClass, [userId, userRole, req.body.class_id]);

        await client.query('COMMIT');
        
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack))
});

// TODO: Setup class edit? PUT

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


module.exports = router;