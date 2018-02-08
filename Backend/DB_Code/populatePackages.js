const fs = require("fs");
const finalPackages ={};
let last = Number(process.argv[2])
console.log("last number for packages ...", last);
async function readPackages () {
  while (last >= 0) {
    const contents = await fs.readFileSync(`../../Frontend/src/custom/packages${last}.json`, "utf8");
    const savedPackages = JSON.parse(contents);
    savedPackages.forEach(pkg => {
        if (finalPackages.hasOwnProperty(pkg.name)) {
            finalPackages[pkg.name].freq += pkg.freq;
        } else finalPackages[pkg.name] = pkg;
    })
    last--;
  }
  return;
};
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect(`${process.env.MONGO_URI}`, null);

const Package = require("./Package.js");
const rows = [];
const populatePackages = () => {
  // TODO: implement this
  readPackages().then(() => {
    // const promises = Object.values(finalPackages).map(element => {
    //     return new Package(element).save();
    fs.writeFileSync("./finalPackagesish.json", JSON.stringify(finalPackages), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
  })
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
