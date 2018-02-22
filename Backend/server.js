const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const mongoose = require("mongoose");
const _progress =  require('cli-progress');

const routes = require('./routes/routes');

const server = express();
const PORT = 8080;
const dev = true;

const corsOptions = dev ?
{
    "origin": "http://localhost:3000",
    "credentials": true
}:{
    "origin": "https://javascriptlibrarydiscovery.com",
    "credentials": true
};

server.use(cors(corsOptions));
if (process.env.NODE_ENV === 'production') {
    server.use(express.static('../Frontend/build'));
}
server.use(bodyParser.json());
server.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
}));

routes(server);

server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});