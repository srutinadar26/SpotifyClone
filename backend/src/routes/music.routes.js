const express = require("express");
const router = express.Router();

const musicController = require("../controllers/music.controller");

const {
    authArtist
} = require("../middleWare/auth.middleware");

const upload = require("../middleWare/multer.middleware");


// Upload Music
router.post(
    "/upload",
    authArtist,
    upload.single("music"),
    musicController.createMusic
);

module.exports = router;