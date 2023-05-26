const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/fileController");

const filerouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads/");
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});




filerouter.post("/", upload.single("file"), uploadFile);

module.exports = filerouter;