const path = require('path');
const writePkg = require('write-pkg');
const readPkg = require('read-pkg');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const fs = require('fs');

const repo_name = process.argv[3];
const pkgs = process.argv.slice(4);
const f = process.argv[2];

const p = './packages/package.json';
const dirname = './packages';


async function writeFile(repo_name, params) { 

    try {
        let dependencies = {};

        for (let i = 0; i < params.length; i++) {
            dependencies[params[i]] = '*'; // <-------- npm upadate --save
        }
    
        writePkg.sync(dirname, { name: repo_name, version: "1.0.0", private: true, dependencies: dependencies });
    } catch(e) {
        console.log(e);
    }
}

async function readFile() {

    try {

        fs.readFile(`${p}`, 'utf8', (err, data) => {
            if (err) throw err;
            const c = nacl.util.encodeBase64(data);
            return c;
        });

    } catch(err) {
        console.log(err);
    }
}


if (f === 'read') readFile();
if (f === 'write' && pkgs) writeFile(repo_name, pkgs);

module.exports = {
    writeFile,
    readFile,
}


