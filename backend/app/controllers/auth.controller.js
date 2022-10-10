const db = require("../models");
const config = require("../config/auth.config");
var log = require('../config/winston');
const { v4: uuidv4 } = require('uuid');

const User = db.user;
const Role = db.role;
const User_role = db.user_role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user_role } = require("../models");

exports.signup = (req, res) => {
  const id_pengguna = uuidv4();
  User.create({
      id_pengguna: id_pengguna,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nm_peran: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setPerans(roles).then(() => {
            res.status(201).send({
              message: "User registered successfully!",
              data: user
            });
          });
        });
      } else {
        // user role = 1 = pengguna
        user.setPerans([52]).then(() => {
          res.status(201).send({
            message: "User registered successfully!",
            data: user
          });
        });
      }
    })
    .catch(err => {
      log.error(err)
      res.status(400).send({
        message: "Failed! id_peran not found!"
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id_pengguna: user.id_pengguna
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getPerans().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nm_peran.toUpperCase());
        }
        res.status(200).send({
          message: "Login successfully!",
          data: ({
            id_pengguna: user.id_pengguna,
            username: user.username,
            roles: authorities,
            accessToken: token
          })
        });
      });
    })
    .catch(err => {
      log.error(err)
      res.status(500).send({
        message: err.message
      });
    });
};