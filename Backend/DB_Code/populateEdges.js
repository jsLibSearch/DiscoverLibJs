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
        const packages = await Package.find({})
        async function fillUp() {
            try {
                for (let i = 0; i < packages.length; i++) {
                    console.log(i);
                    for (let j = i + 1; j < packages.length; j++) {
                        let count = 0;
                        // for (let m = 0; m < projects.length; m++) {
                        //     //in example, react and axios
                        //     let left = false;
                        //     let right = false;
                            
                            // let parents = packages[i].parents.map((elem) => {
                            //     if (packages[j].parents.indexOf(elem) >= 0) return elem;
                            // })
                            // const projects = await Project.find({ _id: {$in: [...parents] }})
                            // console.log(projects);
                            const projects = await Project.find({ children: { $all: [ packages[i]._id , packages[j]._id ] } })
                            // for (let x = 0; x < projects[m].children.length; x++) {
                            //     if (projects[m].children[x] === packages[i]._id) {
                            //         left = true;
                            //     } else if (projects[m].children[x] === packages[j]._id) {
                            //         right = true;
                            //     }
                            //     if (left && right) {
                            //         count++;
                            //         break;
                            //     }
                            // }
                            count = projects.length;
                            
                        // }
                        
                        const average = count/529;
                        const newEdge = new Edge({left: packages[i]._id, right: packages[j]._id, weight: average})
                        promises.push(newEdge.save());
                    }
                }
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