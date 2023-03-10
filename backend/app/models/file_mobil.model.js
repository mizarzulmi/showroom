module.exports = (sequelize, Sequelize) => {
    const FileMobil = sequelize.define("dok_mobil", {
    id_dok_mobil: {
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
      tableName: 'dok_mobil',
      timestamps: false,
    });
  
    return FileMobil;
  };