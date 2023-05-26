const express = require("express");
const multer = require("multer");
const { uploadFile, getFiles } = require("../controllers/fileController");

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


filerouter.post("/upload", upload.single("file"), uploadFile);
filerouter.get("/", getFiles);

module.exports = filerouter;