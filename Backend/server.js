const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const _progress =  require('cli-progress');

const routes = require('./routes/routes');

const server = express();
const PORT = 8080;

const dev = true;
const origin = dev ? "http://localhost:3000" : "https://javascriptlibrarydiscovery.com";

const corsOptions = {
    "origin": origin,
    "credentials": true
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
routes(server);

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('../Frontend/build'));
}

server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});