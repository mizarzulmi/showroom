const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    timezone: "+07:00",
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user_role = require("../models/user_role.model.js")(sequelize, Sequelize);
db.profil_pengguna = require("../models/profil_pengguna.model.js")(sequelize, Sequelize);
db.merek = require("../models/merek.model.js")(sequelize, Sequelize);
db.mobil = require("../models/mobil.model.js")(sequelize, Sequelize);
db.pemesanan = require("../models/pemesanan.model.js")(sequelize, Sequelize);

// db.user.hasMany(db.user_role, { as: "user_role" });
// db.user_role.belongsTo(db.user, {
//   foreignKey: "id_pengguna",
//   as: "user",
// });

db.role.belongsToMany(db.user, {
  through: "role_pengguna",
  foreignKey: "id_peran",
  otherKey: "id_pengguna"
});

db.user.belongsToMany(db.role, {
  through: "role_pengguna",
  foreignKey: "id_pengguna",
  otherKey: "id_peran"
});


db.ROLES = ["pengguna", "admin", "atasan"];

module.exports = db;

