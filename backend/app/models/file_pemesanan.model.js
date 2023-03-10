module.exports = (sequelize, Sequelize) => {
    const FilePemesanan = sequelize.define("dok_pemesanan", {
        id_dok_pemesanan: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
        },
        id_dok: {
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
            defaultValue: 0,
        },
    }, {
        tableName: 'dok_pemesanan',
        timestamps: false,
    });

    return FilePemesanan;
};