module.exports = (sequelize, Sequelize) => {
    const Merek = sequelize.define("merek_mobil", {
        id_merek_mobil: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
          },
          nm_merek: {
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
      tableName: 'merek_mobil',
      timestamps: false,
    });
  
    return Merek;
  };