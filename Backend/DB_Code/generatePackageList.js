
const fs = require("fs");


let current = Number(process.argv[2])
console.log("current number for projects ...", current);

const pkgs = {};
let counter = 0;
let flag = false;

while (counter <= current) {
    const contents = fs.readFileSync(`./projectdata/packages${counter}.json`, "utf8");
    const packs = JSON.parse(contents);
    Object.keys(packs).forEach((key, i) => {
        if (!pkgs.hasOwnProperty(key)) pkgs[key] = packs[key] 
        else pkgs[key].freq += packs[key].freq;
        if (counter === current && Object.keys(packs).length === i + 1) {
            flag = true;
        }
    })
    counter++;
}

const refreshIntervalId = setInterval(() => {
    if (flag) {
        fs.writeFileSync(`./week3Packages.json`, JSON.stringify(pkgs), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The package file was saved!");
        });
        clearInterval(refreshIntervalId);        
    }
}, 10000);

/* later */
