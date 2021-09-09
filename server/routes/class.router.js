const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;


// GET api/class/
// Returns an array of class object: { class object model }
router.get('/', rejectUnauthenticated, (req, res) => {
   const query = `SELECT * FROM "class"
                  JOIN "user_class" ON "user_class".class_id = "class".id
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

// GET /api/class/details/:id
// Gets list of students in a particular class
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
   const classId= req.params.id;
   const query= `SELECT "user".name AS username, "user".profile_picture_url
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

// POST route to INSERT STUDENT INTO EXISTING CLASS. May need another for teacher to create class.
/**
 * POST route template
 */
router.post('/class', (req, res) => {
  // POST route code here
  const query = `
  INSERT INTO "user_class" ("class_id", "user_id")
  VALUES ($1, $2);`;
  pool.query(query)
  .then((results) => {
    console.log('ADDed student to class successful');
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(`Did not add student to class`, error);
    res.sendStatus(500);
  });
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

//PUT for updating class information such as title
router.put("/update", rejectUnauthenticated, (req,res) => {
   console.log(`What is being UPDATED:`, req.body.id);
   const query = `UPDATE "class" 
                  SET "name"=$1 , "archived" =$2
                  WHERE "id"=$3;`;
   pool
     .query(query, [
       req.body.name,
       req.body.archived ,
       req.body.id,
     ])
     .then((result) => {
       console.log("successfully updated class:", result);
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


module.exports = router;