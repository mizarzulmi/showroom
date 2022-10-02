const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.id_pengguna).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
        });
    });
};

isAtasan = (req, res, next) => {
    User.findByPk(req.id_pengguna).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "atasan") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Atasan Role!"
            });
            return;
        });
    });
};


// isAtasanOrAdmin = (req, res, next) => {
//     User.findByPk(req.id_pengguna).then(user => {
//         user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "atasan") {
//                     next();
//                     return;
//                 }

//                 if (roles[i].name === "admin") {
//                     next();
//                     return;
//                 }
//             }

//             res.status(403).send({
//                 message: "Require Atasan or Admin Role!"
//             });
//         });
//     });
// };

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAtasan: isAtasan
};
module.exports = authJwt;