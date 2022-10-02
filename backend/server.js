const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// model
// const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });


// function initial() {
//     Role.create({
//         id_peran: 1,
//         name: "pengguna"
//     });

//     Role.create({
//         id_peran: 2,
//         name: "admin"
//     });

//     Role.create({
//         id_peran: 3,
//         name: "atasan"
//     });
// }


// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to SISMOB."
    });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/role.routes')(app);
