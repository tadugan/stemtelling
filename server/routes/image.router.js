const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const {cloudinary} = require('../modules/cloudinary');


// POST /api/image
// Handles posting an image to Cloudinary
router.post('/', rejectUnauthenticated, async (req, res) => {
   try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
         upload_preset: 'stemtell-content-image'
      });
      res.send(uploadedResponse.url);
   }
   catch(error) {
      console.log('Error in image router:', error);
      res.sendStatus(500);
   };
});


module.exports = router;