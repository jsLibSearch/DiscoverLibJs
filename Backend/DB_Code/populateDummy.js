const dummyData = require('./dummyData.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/js-discovery', { useMongoClient: true });

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
console.log(rows);
/*
rows.forEach(row => {
    console.log("hellow")
    const project = new Project({processed: false})
    console.log(project);
    project.save()
    .then(() => {
        console.log("never got here?")
        row.forEach((element) => {
            let package, flag = false;
            Package.find({name: element})
            .then((pack) => {
                console.log("pack", pack)
                if (pack.length > 0) {
                    console.log("skipped")
                    project.children.push(pack[0]);
                    project.save()
                    .then(() => {
                        pack[0].parents.push(project);
                        pack[0].save()
                        // package = pack;
                        // const dep = new Dependency({parent: project._id, child: package._id})
                        // promises.push(dep.save());
                        // flag = true;
                    })
                    .catch(err => console.log(err));
                } else {
                    package = new Package({name: element})
                    package.parents.push(project);
                    package.save()
                    .then(() => {
                        // const dep = new Dependency({parent: project, child: package})
                        // promises.push(dep.save());
                        project.children.push(package);
                        project.save();
                    })
                    .catch(err => console.log(err));                    
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
return Promise.all(promises);
*/