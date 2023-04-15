const multer = require("multer");


const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //originalname
    }
});

const upload = multer({ storage });

module.exports = upload;