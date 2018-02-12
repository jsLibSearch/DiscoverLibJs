// Collaborative filtering

/**
 * 
 *  
 * 
 */
const repo_name = process.argv[3];
const pkgs = process.argv.slice(4);
const f = process.argv[2];

const path = require('path');
const writePkg = require('write-pkg');
const readPkg = require('read-pkg');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const fs = require('fs');


const p = './packages/package.json';
const dirname = './packages';


function b64Endcode(str) {
    return nacl.util.encodeBase64(str);
}

function readFile() {

    const content = fs.readFileSync(`${p}`, 'utf8');
    const e = b64Endcode(content);
    return e;
    
}


function writeFile(repo_name, params) { 

    let dependencies = {}

    for (let i = 0; i < params.length; i++) {
        dependencies[params[i]] = '*'; // <-------- npm upadate --save
    }

    writePkg(dirname, { name: repo_name, version: "1.0.0", private: true, dependencies: dependencies });
}


if (f === 'read') readFile();
if (f === 'write' && pkgs) writeFile(repo_name, pkgs);

module.exports = {
    readFile,
    writeFile,
}


// const t = process.argv[2];

// (async function recommend(params) {

//     try {

//         // +1 +2 +3 +4
//         // it checks every project that have this item = 20
//         // get all items that appear in all 20 projects
//         // if mangoose appears more then other items recommend it as a 1st 
//         console.log(params);
//     } catch(e) {

//         console.log(e);

//     }
    
// })(t);
