const express = require("express");
const videoRoute = require('./video.router');

const router = express.Router();

router.use('/videos', videoRoute);

module.exports = router;