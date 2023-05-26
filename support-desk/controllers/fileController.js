const asyncHandler = require('express-async-handler');
const fs = require('fs');

const File = require("../models/fileModels");


const uploadFile = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    const { filename, path, mimetype } = req.file;

    // Read file data from disk
    const fileData = fs.readFileSync(path);

    const file = await File.create({
        userId: userId,
        file: {
            data: fileData,
            contentType: mimetype,
            filename: filename,
        }
        // file: {
        //     data: fileData
        // }
    });

    // Remove the temporary file from disk
    fs.unlinkSync(path);

    if (file) {
        res.json({
            userId: file.userId,
            fileName: file.file.filename
        });
    } else {
        res.status(400);
        throw new Error("invalid file");
    }
}
);

module.exports = {
    uploadFile
};





