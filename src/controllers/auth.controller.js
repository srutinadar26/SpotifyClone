const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if username or email already exists
        const existingUser = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Store JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Find user by username OR email
        const user = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        // User not found
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Wrong password
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Store JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};