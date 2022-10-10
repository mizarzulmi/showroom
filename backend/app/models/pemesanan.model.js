module.exports = (sequelize, Sequelize) => {
    const Pemesanan = sequelize.define("pemesanan", {
        id_pemesanan: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        id_mobil: {
            type: Sequelize.UUID,
            allowNull: false
        },
        id_pembeli: {
            type: Sequelize.UUID,
            allowNull: false
        },
        status_pembelian: {
            allowNull: false,
            type: Sequelize.STRING
        },
        harga_pembelian: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        ket: {
            allowNull: true,
            type: Sequelize.STRING,
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

    return Pemesanan;
};