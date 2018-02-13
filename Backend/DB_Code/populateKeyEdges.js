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
const KeyEdge = require('./KeyEdge.js');
mongoose.connect(`${process.env.MONGO_URI}`, null);

const bodyParser = require('body-parser');

const express = require('express');

async function createEdges() {
    try {
        const promises = [];
        const packages = await Package.find({})
        async function fillUp() {
            try {
                const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
                bar.start(packages.length - 1, 0)
                for (let i = 0; i < packages.length ; i++) {
                    bar.update(i + 1)
                    for (let j = i+1; j < packages.length; j++) {
                        let count = 0;
                        for (let q = 0; q < packages[i].keywords.length; q++) {
                            if (packages[j].keywords.indexOf(packages[i].keywords[q]) >= 0) {
                                count++
                            }
                        }
                        if (count <= 1) continue;
                        const newEdge = new KeyEdge({left: packages[i]._id, right: packages[j]._id, weight: count})
                        promises.push(newEdge);
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
        KeyEdge.insertMany(promises)
            .then(() => {
                console.log('Its done');
            });

    } catch (err) {
        console.log(err);
    }
}
createEdges();