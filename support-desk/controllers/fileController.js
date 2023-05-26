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
            _id: file._id,
            userId: file.userId,
            fileName: file.file.filename
        });
    } else {
        res.status(400);
        throw new Error("invalid file");
    }
}
);


const getFiles = asyncHandler(async (req, res) => {

    const files = await File.find({});

    if (files) {
        res.json({
            files: files
        });
    } else {
        res.status(400);
        throw new Error("Couldn't retrive the files");
    }

});



module.exports = {
    uploadFile,
    getFiles
};





