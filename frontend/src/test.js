const axios = require('axios');
var fs = require('fs');
// axios.get('http://registry.npmjs.org/axios')
//       .then((response) => {
//         console.log(response.data.description)
//       })
//       .catch((err) => {
//         console.log(err)
//       });


const iter = Number(process.argv[2]);
console.log('Iteration number:', iter);
const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
]
let projectsHolder = [];
async function test() {
    try {
        async function getPs(page = 0, monthIndex, concatter) {
            try {
                console.log(page);
                const result = await axios.get(`http://localhost:8080/github-packages/${page}/${month[monthIndex]}`);
                const a = await result.data;
                return concatter.concat(a);
            } catch (err) {
                console.log(err);
            }
        }
        
        getPs(0, iter, []).then((b)=> {
            return getPs(1, iter, b)
            }).then((b)=> {
            return getPs(2, iter, b)
            }).then((b)=> {
            return getPs(3, iter, b)
            }).then((b)=> {
            return getPs(4, iter, b)
            }).then((b)=> {
            return getPs(5, iter, b)
            }).then((b)=> {
            return getPs(6, iter, b)
            }).then((b)=> {
            return getPs(7, iter, b)
            }).then((b)=> {
            return getPs(8, iter, b)
            }).then((b)=> {
            return getPs(9, iter, b)
            }).then((b)=> {
            const projects = b
            fs.writeFileSync(`./custom/projects${iter}.json`, JSON.stringify(projects), function(err) {
                if(err) {
                    return console.log(err);
                }
            })
            let count = 0
            const fillPackages = () => {
                const packages = {};
                for (let i = 0; i < projects.length; i++) {
                    for (let x = 0; x < projects[i].children.length; x++) {
                        const freq = !packages[projects[i].children[x]] ? 1 : packages[projects[i].children[x]].freq + 1;
                        packages[projects[i].children[x]] = { name: projects[i].children[x], description: '', freq: freq }
                        count++
                    }
                }
                return packages;
            }
            return fillPackages()
        }).then((pkgs) => {
            // console.log(await packages);
            const packages2 = pkgs
            setTimeout(() => {
                fs.writeFileSync(`./custom/packages${iter}.json`, JSON.stringify(packages2), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                
                    console.log("The package file was saved!");
                });
                console.log("The package file was saved!");
            }, 5000); 
        })



        //     async function getDetails(packs) {
        //         try {
        //             console.log(Object.keys(packs).length)
        //             let keys = Object.keys(packs);
        //             for (let i = 0; i < keys.length; i++) {
        //                 let package = packs[keys[i]];
        //                 const response = await axios.get(`http://registry.npmjs.org/${package.name}`)
        //                 if (response.status === 404) {
        //                     continue;
        //                 }
        //                 packs[keys[i]].description = response.data.description;
        //                 packs[keys[i]].keywords    = response.data.keywords;
        //                 packs[keys[i]].homepage    = response.data.homepage;
        //             }
        //             return packs
        //         } catch (err) {
        //             console.log('this error')
        //         };
        //     }

        //     // return 
        //     getDetails(packages2).then((pkgs2) => {
        //         const packages = pkgs2;
        //         setTimeout(() => {
        //             fs.writeFileSync(`./custom/packages${iter}.json`, JSON.stringify(packages), function(err) {
        //                 if(err) {
        //                     return console.log(err);
        //                 }
                    
        //                 console.log("The package file was saved!");
        //             });
        //             console.log("The package file was saved!");
        //         }, 5000); 
        //     }).catch((err) => {
        //         console.log('everything is fucked', err)
        //     });
        // })
    } catch (err) {
        console.log(err, 'error');
    }
}



test();


