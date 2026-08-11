const ImageKit = require("@imagekit/nodejs");
const { Readable } = require("stream");

console.log(
    "ImageKit private key loaded:",
    !!process.env.IMAGEKIT_PRIVATE_KEY
);

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file) {
    try {
        console.log("ImageKit: Upload starting...");
        console.log("ImageKit: File size:", file.size);

        const fileStream = Readable.from(file.buffer);

        const result = await ImageKitClient.files.upload({
            file: fileStream,
            fileName: "music_" + Date.now() + ".mp3",
            useUniqueFileName: true,
            folder: "spotify/music"
        });

        console.log("ImageKit: Upload successful!");

        return result.url;

    } catch (error) {
        console.error("ImageKit upload failed:", error);
        throw error;
    }
}

module.exports = {
    uploadFile
};