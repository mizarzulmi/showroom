const { authJwt } = require("../middleware");
const controller = require("../controllers/merek.controller");
var router = require("express").Router();

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // router.get("/", controller.findAll);
    // router.get("/:id", controller.findOne);
    router.post("/create", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    // router.put("/:id", controller.update);
    // router.delete("/:id", controller.delete);

    app.use('/api/merek', router);
};