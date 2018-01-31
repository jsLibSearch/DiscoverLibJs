const dummyData = require('./dummyData.json');

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
rows.forEach(row => {
    const project = new Project
    
    const promises = savedPosts.map((element) => {
        return new Post(element).save();
      });
      return Promise.all(promises);
})