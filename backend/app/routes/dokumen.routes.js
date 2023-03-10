const { authJwt } = require("../middleware");
const controller = require("../controllers/dokumen.controller");
var router = require("express").Router();

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage,
}).fields([{
    name: 'image_1',
    maxCount: 1
},{
    name: 'image_2',
    maxCount: 1
},{
    name: 'image_3',
    maxCount: 1
}]);

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
    // router.get("/detail", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);
    router.post("/create", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    // router.put("/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
    // router.delete("/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

    app.use('/api/dokumen/mobil', router);
};