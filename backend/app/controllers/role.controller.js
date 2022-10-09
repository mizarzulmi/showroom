const db = require("../models");
var log = require('../config/winston');
const Role = db.role;

const Op = db.Sequelize.Op;


exports.store = (req, res) => {
    // Validate request
    if (!req.body.id_peran) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const role = {
        id_peran: req.body.id_peran,
        nm_peran: req.body.nm_peran
    };

    Role.create(role)
        .then(data => {
            res.send({
                message: "Create successfully",
                data: data
            });
        })
        .catch(err => {
            log.error(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Peran."
            });
        });
};