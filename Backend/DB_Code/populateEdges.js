/*
precompute: 
for each package:
    for each other package:
        for each project:
            average the differences in preferences for each project

        React   axios   mongoose    express
Project1  1       0         1           0
Project2  1       1         0           0  
Project3  0       1         1           0
Project4  1       1         1           1


            React   axios   mongoose    express
React       -
axios       2/4     -       
mongoose    2/4     2/4     -
express     1/4     1/4     1/4         -
*/
const _progress =  require('cli-progress')
const mongoose = require("mongoose");
const cors = require('cors')
const Package = require('./Package.js');
const Project = require('./Project.js');
const Edge = require('./Edge.js');
mongoose.connect(`${process.env.MONGO_URI}`, null);

const bodyParser = require('body-parser');

const express = require('express');

async function createEdges() {
    try {
        const promises = [];
        const hash = {};
        const packages = await Package.find({})
        const projects = await Project.find({})
        async function fillUp() {
            try {
                const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
                for (let m = 0; m < projects.length; m++) {
                    hash[projects[m]._id] = {}
                    for (let z = 0; z < projects[m].children.length; z++) {
                        hash[projects[m]._id][projects[m].children[z]] = true;
                    }
                }
                bar.start(4000, 0)
                for (let i = 0; i < 4000; i++) {
                    bar.update(i)
                    for (let j = i + 1; j < 4000; j++) {
                        let count = 0;
                        for (let q = 0; q < packages[i].parents.length; q++) {
                            if (hash[packages[i].parents[q]].hasOwnProperty(packages[j]._id)) {
                                count++
                            }
                        }
                        const average = count/529;
                        if (average === 0) continue;
                        const newEdge = new Edge({left: packages[i]._id, right: packages[j]._id, weight: average})
                        promises.push(newEdge.save());
                    }
                }
                bar.stop();
                console.log('starting promises...')
                return;
            } catch (err) {
                console.log(err);
            }
        }
        if (packages) fillUp();
        return Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}
createEdges();