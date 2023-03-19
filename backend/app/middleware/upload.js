const util = require("util");
const multer = require("multer");
var slugify = require("slugify");

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/images");
  },
  filename: (req, file, cb) => {
    const name = slugify(file.originalname, { lower: true });
    cb(null, `${new Date().getTime()}-${name}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images : png/jpeg.", false);
  }
};

let uploadFile = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
