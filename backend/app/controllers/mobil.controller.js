const db = require("../models");
var log = require('../config/winston');
const Mobil = db.mobil;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

exports.findAll = (req, res) => {
    Mobil.findAll()
        .then(data => {
            res.status(200).send({
                message: "Get mobil successfully!",
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
    if (!req.body.model && !req.body.model && !req.body.transmisi && !req.body.no_rangka && !req.body.warna && !req.body.tahun && !req.body.no_plat && !req.body.harga) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Mobil.findOne({
        where: {
            no_rangka: req.body.no_rangka,
            soft_delete: 0,
        }
    }).then(mobil => {
        if (mobil) {
            res.status(400).send({
                message: "Failed! Mobil is already exist!"
            });
            return;
        } else {
            const createValues = {
                id_mobil: uuidv4(),
                id_merek_mobil: req.body.id_merek_mobil,
                id_penjual: req.body.id_penjual,
                model: req.body.model,
                transmisi: req.body.transmisi,
                no_rangka: req.body.no_rangka,
                no_mesin: req.body.no_mesin,
                warna: req.body.warna,
                tahun: req.body.tahun,
                no_plat: req.body.no_plat,
                harga: req.body.harga,
                ket: req.body.ket                
            };

            Mobil.create(createValues)
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
        id_mobil: req.body.id_mobil,
        id_merek_mobil: req.body.id_merek_mobil,
        id_penjual: req.body.id_penjual,
        model: req.body.model,
        transmisi: req.body.transmisi,
        no_rangka: req.body.no_rangka,
        no_mesin: req.body.no_mesin,
        warna: req.body.warna,
        tahun: req.body.tahun,
        no_plat: req.body.no_plat,
        harga: req.body.harga,
        ket: req.body.ket,
        last_update: new Date()            
    };

    Mobil.update(updateValues, {
            where: {
                id_mobil: updateValues.id_mobil,
                soft_delete: 0
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mobil was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Mobil with id_mobil=${updateValues.id_mobil}. Maybe Mobil was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            log.error(err)
            res.status(500).send({
                message: "Error updating Mobil with id_mobil=" + updateValues.id_mobil
            });
        });
};

exports.delete = (req, res) => {
    const updateValues = {
        id_mobil: req.body.id_mobil,
        last_update: new Date(),
        soft_delete: 1
    }

    Mobil.update(updateValues, {
            where: {
                id_mobil: updateValues.id_mobil,
                soft_delete: 0
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mobil was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Mobil with id_mobil=${updateValues.id_mobil}. Maybe Mobil was not found!`
                });
            }
        })
        .catch(err => {
            log.error(err)
            res.status(500).send({
                message: "Could not delete Mobil with id_mobil=" + updateValues.id_mobil
            });
        });
};