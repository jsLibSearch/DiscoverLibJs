const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const server = express();
const PORT = 5000;

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
routes(server);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});