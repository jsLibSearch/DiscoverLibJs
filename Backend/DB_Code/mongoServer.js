const mongoose = require("mongoose");

const Package = require('./Package.js');
const Project = require('./Project.js');
mongoose.connect('mongodb://DOESNOTWORK');

const bodyParser = require('body-parser');

const express = require('express');



const STATUS_USER_ERROR = 422;

const server = express();

server.use(bodyParser.json());

server.get('/search-package/:term', (req, res) => {
    const { term } = req.params;
    Package.find({ name: {$regex : `.*${term}.*`} }, (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
        if (foundPackages.length < 1) {
            return res.status(STATUS_USER_ERROR)
                      .json({ error: 'no packages found'});
        } else {
           return res.json(foundPackages);
        }
    });
});

server.get('/all-packages', (req, res) => {
    Package.find({ }, (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
        if (foundPackages.length < 1) {
            return res.status(STATUS_USER_ERROR)
                      .json({ error: 'no packages found'});
        } else {
           return res.json(foundPackages);
        }
    });
});

server.get('/all-projects', (req, res) => {
    Project.find({ }, (err, foundProjects) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
        if (foundProjects.length < 1) {
            return res.status(STATUS_USER_ERROR)
                      .json({ error: 'no Projects found'});
        } else {
           return res.json(foundProjects);
        }
    });
});

server.listen(3000);
