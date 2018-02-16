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


function readFile() {

    const content = fs.readFileSync(`${p}`, 'utf8');
    const e = nacl.util.encodeBase64(content);
    fs.unlink(`${p}`, (err) => {
        console.log(err);
    });
    return e;
}


function writeFile(repo_name, params) { 

    let dependencies = {};

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


