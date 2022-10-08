module.exports = (sequelize, Sequelize) => {
    const User_role = sequelize.define("role_pengguna", {
        id_role_pengguna  : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        id_peran : {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_pengguna : {
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
        }
    }, {
        tableName: 'role_pengguna',
        timestamps: false,
    });

    return User_role;
};