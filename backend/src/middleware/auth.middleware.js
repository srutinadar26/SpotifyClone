const jwt = require("jsonwebtoken");

// Checks whether the user has a valid JWT
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next(); // Passes the request to the next middleware or route handler.

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


// Allows only artists
async function authArtist(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


// Allows only normal users
async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


module.exports = {
    authMiddleware,
    authArtist,
    authUser
};