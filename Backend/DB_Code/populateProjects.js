const dummyData = require('./dummyData.json');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}`, null);
const Package = require('./Package.js');
const Dependency = require('./Dependency.js');
const Project = require('./Project.js');

const rows = [];
console.log(dummyData.length)
dummyData.forEach((project) => {
    const row = [];
    if (project.dependencies) Object.keys(project.dependencies).forEach(item => {
        row.push(item);
    })
    if (project.devDependencies) Object.keys(project.devDependencies).forEach(item => {
        row.push(item);
    })
    rows.push(row);
})

rows.forEach(row => {
    console.log("hellow")
    const project = new Project({processed: false})
    console.log(project);
    project.save()
    .then(() => {
        console.log("never got here?")
        row.forEach((element) => {
            Package.findOne({name: element})
            .then((pack) => {
                console.log("pack", pack)
                if (pack) {
                    console.log("skipped")
                    project.children.push(pack._id);
                    project.save()
                    .then(() => {
                        pack.parents.push(project._id);
                        pack.save()
                        // package = pack;
                        // const dep = new Dependency({parent: project._id, child: package._id})
                        // promises.push(dep.save());
                        // flag = true;
                    })
                    .catch(err => console.log(err));
                } else {
                      
                }
                setTimeout(() => console.log("hi"), 300)
            })
            .catch(err => console.log(err));            
        })
    })
    .catch(err => console.log(err));         
    setTimeout(() => console.log("hi"), 3000)
    
})
console.log("done")