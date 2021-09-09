const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const {cloudinary} = require('../modules/cloudinary');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'stemtell-content-image'
        })
        console.log(uploadedResponse);
        res.json({msg: "Uploaded and image"});
    } catch (error) {
        console.log('error:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
