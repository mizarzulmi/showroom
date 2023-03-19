const { authJwt } = require("../middleware");
const controller = require("../controllers/dokumen.controller");
var router = require("express").Router();

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.getListFiles);
    router.post("/upload", [authJwt.verifyToken, authJwt.isAdmin], controller.upload);
    router.get("/:name", [authJwt.verifyToken, authJwt.isAdmin], controller.download);

    app.use('/api/dokumen', router);
};