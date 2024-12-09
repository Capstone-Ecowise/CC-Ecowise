const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only images (JPEG, PNG) are allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

module.exports = upload;
