const db = require("../models");
var log = require('../config/winston');
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');


const FileDokumen = db.file_dok;
const FileMobil = db.file_mobil;
const FilePemesanan= db.file_pemesanan;
const Mobil = db.mobil;
const Role = db.role;
const Op = db.Sequelize.Op;
const Conn = db.sequelize;

// //list dokumen mobil
// exports.findAll = async (req, res, next) => {
//     try {
//         let sql = `
//             SELECT
//                 psn.id_pemesanan,
//                 psn.status_pembelian,
//                 psn.harga_pembelian,
//                 psn.wkt_pembelian,
//                 mbl.id_mobil,
//                 mbl.model,
//                 mbl.transmisi,
//                 mbl.no_rangka,
//                 mbl.no_mesin,
//                 mbl.warna,
//                 mbl.tahun,
//                 mbl.no_plat,
//                 mbl.harga,
//                 mbl.create_date AS wkt_tambah_mobil,
//                 pembeli.nama_lengkap AS nm_pembeli,
//                 pembeli.tlpn_hp,
//                 pembeli.create_date AS wkt_tambah_pembeli
//             FROM
//                 pemesanan AS psn
//                 LEFT JOIN mobil AS mbl ON mbl.id_mobil = psn.id_mobil
//                 AND mbl.soft_delete = 0
//                 LEFT JOIN merek_mobil AS mrk ON mrk.id_merek_mobil = mbl.id_merek_mobil
//                 AND mrk.soft_delete = 0
//                 LEFT JOIN profil_pengguna AS pembeli ON pembeli.id_profil = psn.id_pembeli
//                 AND pembeli.soft_delete = 0
//             WHERE
//                 psn.soft_delete = 0`;

//         const [results] = await Conn.query(sql);

//         res.status(200).send({
//             message: "Get list pesanan successfully!",
//             data: results
//         });
//     } catch (error) {
//         log.error(error)
//         res.status(400).send({
//             message: error.message || "Some error occurred while retrieving pesanan."
//         });
//         next();
//     }

// };

// //detail dokumen mobil
// exports.findOne = async (req, res, next) => {
//     const id_pemesanan = req.query.id_pemesanan;
//     try {
//         let sql = `
//             SELECT
//                 psn.id_pemesanan,
//                 psn.status_pembelian,
//                 psn.harga_pembelian,
//                 psn.ket AS ket_pesan,
//                 psn.wkt_pembelian,
//                 mbl.id_mobil,
//                 mbl.model,
//                 mbl.transmisi,
//                 mbl.no_rangka,
//                 mbl.no_mesin,
//                 mbl.warna,
//                 mbl.tahun,
//                 mbl.no_plat,
//                 mbl.harga,
//                 mbl.ket AS ket_mobil,
//                 mbl.create_date AS wkt_tambah_mobil,
//                 pembeli.nama_lengkap AS nm_pembeli,
//                 pembeli.jk,
//                 pembeli.tmpt_lahir,
//                 pembeli.tgl_lahir,
//                 pembeli.email,
//                 pembeli.tlpn_hp,
//                 pembeli.alamat,
//                 pembeli.nik,
//                 pembeli.create_date AS wkt_tambah_pembeli
//             FROM
//                 pemesanan AS psn
//                 LEFT JOIN mobil AS mbl ON mbl.id_mobil = psn.id_mobil
//                 AND mbl.soft_delete = 0
//                 LEFT JOIN merek_mobil AS mrk ON mrk.id_merek_mobil = mbl.id_merek_mobil
//                 AND mrk.soft_delete = 0
//                 LEFT JOIN profil_pengguna AS pembeli ON pembeli.id_profil = psn.id_pembeli
//                 AND pembeli.soft_delete = 0
//             WHERE
//                 psn.soft_delete = 0
//                 AND psn.id_pemesanan = '` + id_pemesanan + `'`;

//         const [results] = await Conn.query(sql);

//         if (results && results.length > 0) {
//             res.status(200).send({
//                 message: "Get detail pesanan successfully!",
//                 data: results
//             });
//         } else {
//             res.status(200).send({
//                 message: `Cannot find Pesanan with id_pemesanan=${id_pemesanan}. Maybe Pesanan was not found or req.body is empty!`,
//                 data: results
//             });
//         }
//     } catch (error) {
//         log.error(error)
//         res.status(400).send({
//             message: error.message || "Some error occurred while retrieving pesanan."
//         });
//         next();
//     }

// };

//buat dokumen mobil
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama_lengkap && !req.body.jk && !req.body.tlpn_hp && !req.body.alamat && !req.body.nik && !req.body.status_pembelian && !req.body.harga_pembelian) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //cek mobil
    Mobil.findOne({
        where: {
            id_mobil: req.body.id_mobil,
            soft_delete: 0,
        }
    }).then(cek_mobil => {
        if (!cek_mobil) {
            res.status(400).send({
                message: "Failed! Mobil is not found!"
            });
            return;
        } else {
            //cek pesanan
            Pemesanan.findOne({
                where: {
                    id_mobil: req.body.id_mobil,
                    soft_delete: 0,
                }
            }).then(cek_pesanan => {
                if (cek_pesanan) {
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
                        //cek username pembeli
                        User.findOne({
                            where: {
                                username: req.body.tlpn_hp,
                                soft_delete: 0,
                            }
                        }).then(pengguna => {
                            if (pengguna) {
                                res.status(400).send({
                                    message: "Failed! Pengguna is already exists!"
                                });
                                return;
                            } else {
                                User.create(createValuesDaftar)
                                    .then(user => {
                                        user.setPerans([52])
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
                                                            }).catch(err => {
                                                                log.error(err)
                                                                res.status(400).send({
                                                                    message: err.message || "Some error occurred while creating."
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
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        return res.send(`Error when trying: ${error}`);
                    }
                }
            });
        }
    });
}

// //update dokumen mobil
// exports.update = (req, res) => {

//     const updateValues = {
//         id_pemesanan: req.body.id_pemesanan,
//         id_mobil: req.body.id_mobil,
//         status_pembelian: req.body.status_pembelian,
//         harga_pembelian: req.body.harga_pembelian,
//         ket: req.body.ket,
//         wkt_pembelian: req.body.wkt_pembelian,
//         last_update: new Date()
//     };

//     Pemesanan.update(updateValues, {
//             where: {
//                 id_pemesanan: updateValues.id_pemesanan,
//                 soft_delete: 0
//             }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Pesanan was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Pesanan with id_pemesanan=${updateValues.id_pemesanan}. Maybe Pesanan was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             log.error(err)
//             res.status(500).send({
//                 message: "Error updating Pesanan with id_pemesanan=" + updateValues.id_pemesanan
//             });
//         });
// };

// //delete dokumen mobil
// exports.delete = (req, res) => {
//     const updateValues = {
//         id_pemesanan: req.body.id_pemesanan,
//         last_update: new Date(),
//         soft_delete: 1
//     }

//     Pemesanan.update(updateValues, {
//             where: {
//                 id_pemesanan: updateValues.id_pemesanan,
//                 soft_delete: 0
//             }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Pesanan was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Pesanan with id_pemesanan=${updateValues.id_pemesanan}. Maybe Pesanan was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             log.error(err)
//             res.status(500).send({
//                 message: "Could not delete Pesanan with id_pemesanan=" + updateValues.id_pemesanan
//             });
//         });
// };