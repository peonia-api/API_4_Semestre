const multer = require("multer");


const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,  "../server/uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname.split(' ').join(''))
    }
});

const upload = multer({ storage });

module.exports = upload;