const db = require("../models");
var log = require('../config/winston');
const Merek = db.merek;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Merek.findAll({
            where: {
                soft_delete: 0
            }
        })
        .then(data => {
            res.status(200).send({
                message: "Get merek successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

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
            nm_merek: req.body.nm_merek,
            soft_delete: 0,
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

exports.update = (req, res) => {

    const updateValues = {
        id_merek_mobil: req.body.id_merek_mobil,
        nm_merek: req.body.nm_merek,
        last_update: new Date()
    }

    Merek.update(updateValues, {
            where: {
                id_merek_mobil: updateValues.id_merek_mobil,
                soft_delete: 0
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Merek was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Merek with id=${updateValues.id_merek_mobil}. Maybe Merek was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            log.error(err)
            res.status(500).send({
                message: "Error updating Merek with id=" + updateValues.id_merek_mobil
            });
        });
};

exports.delete = (req, res) => {
    const updateValues = {
        id_merek_mobil: req.body.id_merek_mobil,
        last_update: new Date(),
        soft_delete: 1
    }

    Merek.update(updateValues, {
            where: {
                id_merek_mobil: updateValues.id_merek_mobil,
                soft_delete: 0
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Merek was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Merek with id_merek=${updateValues.id_merek_mobil}. Maybe Merek was not found!`
                });
            }
        })
        .catch(err => {
            log.error(err)
            res.status(500).send({
                message: "Could not delete Merek with id_merek=" + updateValues.id_merek_mobil
            });
        });
};