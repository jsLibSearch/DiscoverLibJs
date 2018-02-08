const fs = require("fs");


let current = Number(process.argv[2])
console.log("current number for projects ...", current);

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}`, null);
const Package = require('./Package.js');
const Dependency = require('./Dependency.js');
const Project = require('./Project.js');

async function readData() {
    async function readProjects() {
            const contents = await fs.readFileSync(`../../Frontend/src/custom/projects${current}.json`, "utf8");
            return JSON.parse(contents);
    };
    const data = await readProjects()
    const final = await data.map(row => {
        
        if (row.length < 1) return;
        const project = new Project({processed: false})
        project.save()
        .then(() => {
            row.forEach((element) => {
                Package.findOne({name: element})
                .then((pack) => {
                    if (pack) {
                        project.children.push(pack._id);
                        project.save()
                        .then(() => {
                            pack.parents.push(project._id);
                            pack.save()
                            return pack.id;
                            // package = pack;
                            // const dep = new Dependency({parent: project._id, child: package._id})
                            // promises.push(dep.save());
                            // flag = true;
                        })
                        .catch(err => console.log(err));
                    } else {
                          
                    }
                })
                .catch(err => console.log(err));            
            })
        })
        .catch(err => console.log(err));         
        
    });

    console.log("done")
};
readData();