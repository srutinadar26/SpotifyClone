const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
    try {
        console.log("1. Request received");

        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        console.log("2. Token found");

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("3. JWT verified:", decoded);

        // Only artists can upload music
        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You do not have permission to upload music"
            });
        }

        console.log("4. Artist authorized");

        // Get title from request
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        // Check if music file exists
        if (!req.file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        console.log("5. File received:", req.file.originalname);
        console.log("6. File size:", req.file.size);

        // Upload music to ImageKit
        console.log("7. Starting ImageKit upload...");

        const uri = await uploadFile(req.file);

        console.log("8. ImageKit upload completed");
        console.log("Music URL:", uri);

        // Save music in MongoDB
        const music = await musicModel.create({
            uri: uri,
            title: title,
            artist: decoded.id
        });

        console.log("9. Music saved to MongoDB");

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (error) {
        console.error("ERROR:", error);

        // JWT errors
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        return res.status(500).json({
            message: "Failed to create music",
            error: error.message
        });
    }
}

async function getAllMusics(req, res){
    try{
        const musics = await musicModel.find().select("title artist").populate("artist", "username email");
        return res.status(200).json({
            message: "Musics retrieved successfully",
            musics: musics
        });
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            message: "Failed to retrieve musics",
            error: error.message
        });
    }
}
async function getMusicById(req, res){
    try{
        const musicId = req.params.id;
        const music = await musicModel.findById(musicId).populate("artist", "username email");
        return res.status(200).json({
            message: "Music retrieved successfully",
            music: music
        });
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            message: "Failed to retrieve music",
            error: error.message
        });
    }
}

module.exports = {
    createMusic,
    getAllMusics,
    getMusicById
};

//populate - sends all the details about the artist not just the id