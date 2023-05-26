const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    userId: {
        type: String,
        // required: [true, "Please add a user id"],
    },
    file: {
        data: Buffer,
        contentType: String,
        filename: String
        // required: [true, "Please add a file"],
    }
});

module.exports = mongoose.model("File", fileSchema, "files");