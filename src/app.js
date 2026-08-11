const express = require("express");

const app = express();

const musicRoutes = require("./routes/music.routes");
const albumRoutes = require("./routes/album.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api/music", musicRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;