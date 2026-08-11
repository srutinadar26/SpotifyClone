const albumModel = require("../models/album.model");


// Create Album
async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Album title is required"
            });
        }

        const album = await albumModel.create({
            title,
            musics: musics || [],
            artist: req.user.id
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

    } catch (error) {
        console.error("ERROR:", error);

        return res.status(500).json({
            message: "Failed to create album",
            error: error.message
        });
    }
}

// Get All Albums
async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel
            .find().select("uri title artist")
            .populate("artist", "username email")
            .populate("musics");

        return res.status(200).json({
            message: "Albums retrieved successfully",
            albums
        });

    } catch (error) {
        console.error("ERROR:", error);

        return res.status(500).json({
            message: "Failed to retrieve albums",
            error: error.message
        });
    }
}

async function getAlbumById(req, res) {
    try {
        const { id } = req.params;

        const album = await albumModel
            .findById(id)
            .populate("artist", "username email")
            .populate("musics");

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        return res.status(200).json({
            message: "Album retrieved successfully",
            album
        });

    } catch (error) {
        console.error("ERROR:", error);

        return res.status(500).json({
            message: "Failed to retrieve album",
            error: error.message
        });
    }
}

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbumById
};