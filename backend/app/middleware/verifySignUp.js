const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const User_role = db.user_role;

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
    });

    next();
};

// checkRolesExisted = (req, res, next) => {
//     User_role.findOne({
//         where: {
//             id_pengguna: req.body.id_pengguna,
//             id_peran: req.body.id_peran
//         }
//     }).then(user => {
//         if (user) {
//             res.status(400).send({
//                 message: "Failed! id_peran is already in use!"
//             });
//             return;
//         }
//     });

//     next();
// };

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;