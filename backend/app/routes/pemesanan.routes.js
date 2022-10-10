const { authJwt } = require("../middleware");
const controller = require("../controllers/pemesanan.controller");
var router = require("express").Router();

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
    // router.get("/:id", controller.findOne);
    router.post("/create", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    // router.put("/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
    // router.delete("/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

    app.use('/api/pemesanan', router);
};