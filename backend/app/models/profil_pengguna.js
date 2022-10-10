module.exports = (sequelize, Sequelize) => {
    const Profil = sequelize.define("profil_pengguna", {
        id_profil: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        id_pengguna: {
            type: Sequelize.UUID,
            allowNull: false
        },
        nama_lengkap: {
            allowNull: false,
            type: Sequelize.STRING
        },
        jk: {
            allowNull: false,
            type: Sequelize.STRING
        },
        tmpt_lahir: {
            allowNull: false,
            type: Sequelize.STRING
        },
        tgl_lahir: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        tlpn_hp: {
            allowNull: false,
            type: Sequelize.STRING
        },
        alamat: {
            allowNull: false,
            type: Sequelize.STRING
        },
        nik: {
            allowNull: false,
            type: Sequelize.STRING
        },
        create_date: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        last_update: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        soft_delete: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    }, {
        tableName: 'pemesanan',
        timestamps: false,
    });

    return Profil;
};