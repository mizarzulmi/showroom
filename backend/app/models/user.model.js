module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("pengguna", {
    id_pengguna: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
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
      defaultValue: 1,
    }
  }, {
    tableName: 'pengguna',
    timestamps: false,
  });

  return User;
};