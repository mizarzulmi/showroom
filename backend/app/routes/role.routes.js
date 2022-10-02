
const controller = require("../controllers/role.controller");

module.exports = function(app) {

  app.post("/api/role/store", controller.store);
};