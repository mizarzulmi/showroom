module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("peran", {
    id_peran: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nm_peran: {
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
    tableName: 'peran',
    timestamps: false,
  });

  return Role;
};