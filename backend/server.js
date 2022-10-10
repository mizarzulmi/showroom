const express = require("express");
const cors = require("cors");

const app = express();

process.env.TZ = 'Etc/Asia';
// console.log(new Date().toString())

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


// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to SISMOB."
    });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/merek.routes')(app);
require('./app/routes/mobil.routes')(app);
require('./app/routes/pemesanan.routes')(app);
