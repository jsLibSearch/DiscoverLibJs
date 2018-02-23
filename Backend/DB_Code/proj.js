const fs = require("fs");


let current = Number(process.argv[2])
console.log("current number for projects ...", current);

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}`, null);
const Package = require('./Package.js');
const Dependency = require('./Dependency.js');
const Project = require('./Project.js');
const pkgs = {};



async function readData(packages) {
    async function readProjects() {
            const contents = await fs.readFileSync(`./projectdata/projects${current}.json`, "utf8");
            return JSON.parse(contents);
    };
    const data = await readProjects();
    const projectPromises = [];
    const final = await data.map(row => {
        if (row.children.length < 1) return [];
        const project = new Project({name: row.name, git_url: row.git_url, login: row.login})
        projectPromises.push(project.save());
        return row.children;
    });

    Promise.all(projectPromises).then((allProjects) => {
        console.log('projects initially saved')
        const promises = [];
        allProjects.forEach((project, i) => {
            let row = final[i]
            row.forEach((element) => {
                const pack = packages[element];                   
                if (pack) {
                    project.children.push(pack._id);
                    pack.parents.push(project._id);
                }
            })
            promises.push(project.save())
        })
        const keys = Object.keys(packages);
        keys.forEach((key) => {
            promises.push((packages[key].save()))
        })
        return promises
    }).then((proms) => {
        Promise.all(proms).then(() => {
            console.log('promises have been resolved I hope.')
        })
    })
}

Package.find({}).then((packs) => {
    packs.forEach((p) => {
        pkgs[p.name] = p
    })
    return pkgs
}).then((ps) => {
    readData(ps)
})

