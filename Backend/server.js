const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const mongoose = require("mongoose");
const _progress =  require('cli-progress');
const expressJWT = require('express-jwt');

const routes = require('./routes/routes');

const server = express();
const PORT = 8080;

const origin = dev ? "http://localhost:3000" : "https://javascriptlibrarydiscovery.com";
const secret = process.env.JWT_SECRET;

const corsOptions = {
    "origin": origin,
    "credentials": true
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
}));

routes(server);

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('../Frontend/build'));
}
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});