const db = require("../models");
var log = require('../config/winston');
const { v4: uuidv4 } = require('uuid');

const Pemesanan = db.pemesanan;
const User = db.user;
const Profil = db.profil_pengguna;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Pemesanan.findAll()
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
    if (!req.body.nama_lengkap && !req.body.jk && !req.body.tlpn_hp && !req.body.alamat && !req.body.nik && !req.body.status_pembelian && !req.body.harga_pembelian) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Pemesanan.findOne({
        where: {
            id_mobil: req.body.id_mobil,
            soft_delete: 0,
        }
    }).then(mobil => {
        if (mobil) {
            res.status(400).send({
                message: "Failed! Mobil is already sold!"
            });
            return;
        } else {
            const id_pengguna = uuidv4();
            const id_profil = uuidv4();
            const createValuesDaftar = {
                id_pengguna: id_pengguna,
                username: req.body.tlpn_hp,
                password: bcrypt.hashSync(req.body.tlpn_hp, 8)
            };

            const createValuesProfil = {
                id_profil: id_profil,
                id_pengguna: id_pengguna,
                nama_lengkap: req.body.nama_lengkap,
                jk: req.body.jk,
                tmpt_lahir: req.body.tmpt_lahir,
                tgl_lahir: req.body.tgl_lahir,
                email: req.body.email,
                tlpn_hp: req.body.tlpn_hp,
                alamat: req.body.alamat,
                nik: req.body.nik
            };

            const createValuesPemesanan = {
                id_pemesanan: uuidv4(),
                id_mobil: req.body.id_mobil,
                id_pembeli: id_profil,
                status_pembelian: req.body.status_pembelian,
                harga_pembelian: req.body.harga_pembelian,
                ket: req.body.ket,
                wkt_pembelian: req.body.wkt_pembelian
            };

            try {

                User.create(createValuesDaftar)
                    .then(user => {
                        user.setPerans([1])
                            .then(role => {
                                console.log(role);
                                Profil.create(createValuesProfil)
                                    .then(profil => {
                                        console.log(profil);
                                        Pemesanan.create(createValuesPemesanan)
                                            .then(pemesanan => {
                                                res.status(200).send({
                                                    message: "Create successfully!",
                                                    data: pemesanan
                                                });
                                            });
                                    });
                            });

                    }).catch(err => {
                        log.error(err)
                        res.status(400).send({
                            message: err.message || "Some error occurred while creating."
                        });
                    });

            } catch (error) {
                console.log(error);
                return res.send(`Error when trying upload images: ${error}`);
            }
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

    Pemesanan.update(updateValues, {
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

    Pemesanan.update(updateValues, {
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