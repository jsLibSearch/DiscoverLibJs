const axios = require('axios');
var fs = require('fs');
// axios.get('http://registry.npmjs.org/axios')
//       .then((response) => {
//         console.log(response.data.description)
//       })
//       .catch((err) => {
//         console.log(err)
//       });


const projects = [ [ 'art',
'async',
'babel-cli',
'babel-code-frame',
'babel-core',
'babel-eslint',
'babel-jest',
'babel-plugin-check-es2015-constants',
'babel-plugin-external-helpers',
'babel-plugin-syntax-trailing-function-commas',
'babel-plugin-transform-async-to-generator',
'babel-plugin-transform-class-properties',
'babel-plugin-transform-es2015-arrow-functions',
'babel-plugin-transform-es2015-block-scoped-functions',
'babel-plugin-transform-es2015-block-scoping',
'babel-plugin-transform-es2015-classes',
'babel-plugin-transform-es2015-computed-properties',
'babel-plugin-transform-es2015-destructuring',
'babel-plugin-transform-es2015-for-of',
'babel-plugin-transform-es2015-literals',
'babel-plugin-transform-es2015-modules-commonjs',
'babel-plugin-transform-es2015-object-super',
'babel-plugin-transform-es2015-parameters',
'babel-plugin-transform-es2015-shorthand-properties',
'babel-plugin-transform-es2015-spread',
'babel-plugin-transform-es2015-template-literals',
'babel-plugin-transform-es3-member-expression-literals',
'babel-plugin-transform-es3-property-literals',
'babel-plugin-transform-object-rest-spread',
'babel-plugin-transform-react-jsx-source',
'babel-plugin-transform-regenerator',
'babel-preset-react',
'babel-traverse',
'babylon',
'bundle-collapser',
'chalk',
'cli-table',
'coffee-script',
'core-js',
'coveralls',
'create-react-class',
'cross-env',
'danger',
'del',
'derequire',
'escape-string-regexp',
'eslint',
'eslint-config-fbjs',
'eslint-plugin-babel',
'eslint-plugin-flowtype',
'eslint-plugin-jest',
'eslint-plugin-react',
'eslint-plugin-react-internal',
'fbjs',
'fbjs-scripts',
'filesize',
'flow-bin',
'flow-coverage-report',
'git-branch',
'glob',
'glob-stream',
'gzip-js',
'gzip-size',
'jasmine-check',
'jest',
'jest-diff',
'merge-stream',
'minimatch',
'minimist',
'mkdirp',
'ncp',
'object-assign',
'platform',
'prettier',
'prop-types',
'random-seed',
'react-lifecycles-compat',
'rimraf',
'rollup',
'rollup-plugin-babel',
'rollup-plugin-closure-compiler-js',
'rollup-plugin-commonjs',
'rollup-plugin-node-resolve',
'rollup-plugin-prettier',
'rollup-plugin-replace',
'rollup-plugin-strip-banner',
'run-sequence',
'targz',
'through2',
'tmp',
'typescript',
'yargs' ],
[ 'bottleneckp',
'charset-parser',
'cheerio',
'iconv-lite',
'lodash',
'request',
'seenreq',
'type-is',
'chai',
'jsdom',
'mocha',
'mocha-testdata',
'sinon',
'whacko' ],
[ 'acorn',
'closure-compiler-stream',
'coveralls',
'glob',
'google-closure-compiler',
'gulp',
'gulp-file',
'gulp-util',
'istanbul',
'merge-stream',
'mkdirp',
'rimraf',
'sinon',
'through2',
'yargs' ],
[ 'babel-core',
'babel-loader',
'babel-preset-es2015',
'gulp',
'json-loader',
'raw-loader',
'webpack-stream' ],
[ 'grid-styled',
'palx',
'prop-types',
'recompose',
'styled-components',
'styled-system',
'tag-hoc',
'@storybook/addon-options',
'@storybook/react',
'ava',
'babel-cli',
'babel-core',
'babel-preset-env',
'babel-preset-react',
'babel-register',
'codecov',
'nyc',
'react',
'react-dom',
'react-test-renderer',
'react-x-ray',
'refunk' ] ]

const packages = {};
let count = 0

for (let i = 0; i < projects.length; i++) {
    for (let x = 0; x < projects[i].length; x++) {
        const freq = !packages[projects[i][x]] ? 1 : packages[projects[i][x]].freq + 1;
        packages[projects[i][x]] = { name: projects[i][x], description: '', freq: freq }
        count++
    }
}
console.log(count, Object.keys(packages).length)
let keys = Object.keys(packages);

for (let i = 0; i < keys.length; i++) {
    let package = packages[keys[i]];
    axios.get(`http://registry.npmjs.org/${package.name}`)
    .then((response) => {
        packages[keys[i]].description = response.data.description
    })
    .catch((err) => {
        console.log('err')
    });
}

setTimeout(() => {
    console.log('packages')
    
    fs.writeFile("./ayy", JSON.stringify(packages), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}, 10000)



