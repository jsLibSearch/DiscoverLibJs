const fs = require("fs");
let savedPackages = null;
const readPackages = () => {
  if (!savedPackages) {
    const contents = fs.readFileSync("../../Frontend/src/custom/dummy_data.json", "utf8");
    savedPackages = JSON.parse(contents);
  }
  return savedPackages;
};
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect(`${process.env.MONGO_URI}`, null);

const Package = require("./Package.js");
const rows = [];
const populatePackages = () => {
  // TODO: implement this
  readPackages();
  const promises = Object.values(savedPackages).map(element => {
    return new Package(element).save();
  });
  console.log("done");
  return Promise.all(promises);
};
populatePackages();
console.log("done2");

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
