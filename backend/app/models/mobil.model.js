module.exports = (sequelize, Sequelize) => {
  const Mobil = sequelize.define("mobil", {
    id_mobil: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    id_merek_mobil: {
      type: Sequelize.UUID,
      allowNull: false
    },
    id_penjual: {
      type: Sequelize.UUID,
      allowNull: false
    },
    model: {
      allowNull: false,
      type: Sequelize.STRING
    },
    transmisi: {
      allowNull: false,
      type: Sequelize.STRING
    },
    no_rangka: {
      allowNull: false,
      type: Sequelize.STRING
    },
    no_mesin: {
      allowNull: false,
      type: Sequelize.STRING
    },
    warna: {
      allowNull: false,
      type: Sequelize.STRING
    },
    tahun: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    no_plat: {
      allowNull: false,
      type: Sequelize.STRING
    },
    harga: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    ket: {
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
    tableName: 'mobil',
    timestamps: false,
  });

  return Mobil;
};