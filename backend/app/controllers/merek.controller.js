const db = require("../models");
var log = require('../config/winston');
const Merek = db.merek;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nm_merek) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Merek.findOne({
        where: {
            nm_merek: req.body.nm_merek
        }
    }).then(merek => {
        if (merek) {
            res.status(400).send({
                message: "Failed! Merek is already in use!"
            });
            return;
        } else {
            const merek = {
                nm_merek: req.body.nm_merek
            };

            Merek.create(merek)
                .then(data => {
                    res.status(200).send({
                        message: "Create successfully!",
                        data: data
                    });
                }).catch(err => {
                    log.error(err)
                    res.status(400).send({
                        message: err.message || "Some error occurred while creating."
                    });
                });
        }
    });
}