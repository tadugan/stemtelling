const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const {cloudinary} = require('../modules/cloudinary');

/**
 * GET
 */
router.get('/', (req, res) => {
  // GET
});

/**
 * POST
 * POST a new image to Cloudinary
 * Returns array holding image url
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'stemtell-content-image'
        })
        res.send(uploadedResponse.url);
    } catch (error) {
        console.log('error in image router:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
