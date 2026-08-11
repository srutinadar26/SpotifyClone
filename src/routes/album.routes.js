const express = require("express");
const router = express.Router();

const albumController = require("../controllers/album.controller");
const { authArtist } = require("../middleWare/auth.middleware");


// Create Album
router.post(
    "/album",
    authArtist,
    albumController.createAlbum
);


// Get All Albums
router.get(
    "/albums",
    albumController.getAllAlbums
);


// Get One Album
router.get(
    "/albums/:id",
    albumController.getAlbumById
);

module.exports = router;