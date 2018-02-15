const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const _progress =  require('cli-progress');

const routes = require('./routes/routes');

const server = express();
const PORT = 8080;

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));
if (process.env.NODE_ENV === 'production') {
    server.use(express.static('../Frontend/build'));
}
server.use(bodyParser.json());
routes(server);

server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});