module.exports = (sequelize, Sequelize) => {
    const FileDokumen = sequelize.define("file_dok", {
      id_dok: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      nm_dok: {
        allowNull: false,
        type: Sequelize.STRING
      },
      file_dok: {
        allowNull: false,
        type: Sequelize.BLOB
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      media_type: {
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
      tableName: 'file_dok',
      timestamps: false,
    });
  
    return FileDokumen;
  };