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
var fs = require('fs');
const _progress =  require('cli-progress')
const mongoose = require("mongoose");
const cors = require('cors')
mongoose.connect(`${process.env.MONGO_URI}`, null);
const Package = require('./Package.js');

const bodyParser = require('body-parser');

const express = require('express');

async function createKeys() {
    try {
        const promises = [];
        const packages = await Package.find({})
        const keywords = {};
        async function fillUp() {
            try {
                const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
                bar.start(packages.length - 1, 0)
                for (let i = 0; i < packages.length ; i++) {
                    bar.update(i + 1)
                    for (let q = 0; q < packages[i].keywords.length; q++) {
                        if (keywords.hasOwnProperty(packages[i].keywords[q])) {
                            keywords[packages[i].keywords[q]] += 1;
                        } else {
                            keywords[packages[i].keywords[q]] = 1;
                        }
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
        fs.writeFileSync(`./keywords.json`, JSON.stringify(keywords), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The keyword file was saved!");
        });
    } catch (err) {
        console.log(err);
    }
}
createKeys();