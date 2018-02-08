const mongoose = require("mongoose");
const cors = require('cors')
const Package = require('./Package.js');
const Project = require('./Project.js');
const Edge = require('./Edge.js');
mongoose.connect(`${process.env.MONGO_URI}`, null);

const bodyParser = require('body-parser');

const express = require('express');

const STATUS_USER_ERROR = 422;
const PORT = 8080;

const server = express();

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

server.get('/search-package/:term', (req, res) => {
    const { term } = req.params;
    let arr = [];
    Package.find({ name: {$regex : `.*${term}.*`} }, (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
            Package.find({ keywords: {$regex : `.*${term}.*`} }, (err, foundKeys) => {
                if (err) {
                    return res.status(STATUS_USER_ERROR).json(err);
                }
                    arr = foundPackages.concat(foundKeys);
                    const removeDuplicates = (a) => {
                        const seen = {};
                        return a.filter((item) => {
                            return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
                        });
                    }
                    res.json(removeDuplicates(arr));
            })
        
    });
});

server.get('/all-packages', (req, res) => {
    Package.find({ }, (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
        if (foundPackages.length < 1) {
            return res.status(STATUS_USER_ERROR)
                      .json({ error: 'no packages found'});
        } else {
           return res.json(foundPackages);
        }
    });
});

server.get('/all-projects', (req, res) => {
    Project.find({ }, (err, foundProjects) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
        if (foundProjects.length < 1) {
            return res.status(STATUS_USER_ERROR)
                      .json({ error: 'no Projects found'});
        } else {
           return res.json(foundProjects);
        }
    });
});


/*

LEFT                        right
children not in cart  AND   cart packages    OR vice versa

children.forEach((child) => {
    Edge.find({$or: { $and { left: child, right: cart}}, { $and { right: child, left: cart}}})
}).then
child: [edges]
edges {} left: child right:react weight: .5}, .5 + .3 + .2 + .1 = 12/15 
child2:  13/15
child3: 2/15
child4: 1/15

each child is a candidate package
child with highest average, is highest recommendation

*/
server.post('/rec', (req, res) => {
    const { cart } = req.body;
    Project.find({ children: { $in: cart } })
        .then((proj) => {
            let children = {};
            proj.forEach((p) => {
                p.children.forEach(child => {
                    children[child] = 0;
                })
            })
            cart.forEach((cartid, i) => {
                if (children.hasOwnProperty(cartid)) {
                    delete children[cartid];
                    console.log("deleted ... ", cartid);
                }
            })
            const keyCounter = () => {
                Object.keys(children).forEach((child) => {
                    Edge.find({$or: [ { left: child, right: {$in: cart}}, { right: child , left: {$in: cart}}]})
                    .then((edges) => {
                        edges.forEach(edge => {
                            children[child] += edge.weight;
                        })
                        // if (edges.length > 0) {
                        //     children[child] /= Object.keys(children).length;
                        // }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
            }
            const promise = new Promise((resolve, reject) => {
                keyCounter();
                console.log("hellow");
                resolve();
            });
            promise.then(() => {
                // const keysSorted =  Object.keys(children).sort(function(a,b){return children[a]-children[b]})
                Package.find({_id: { $in: Object.keys(children)}})
                .then(pkgs => {
                    let sortedPkgs =  pkgs.sort(function(a,b){return children[a._id]-children[b._id]})
                    sortedPkgs = sortedPkgs.filter(a => children[a._id] > 0);
                    console.log(sortedPkgs.slice(sortedPkgs.length - 8));
                    return res.json(sortedPkgs.reverse());
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

server.listen(PORT, () => { 
    console.log(`---> MongoDB server is running on port ${PORT} <---`) 
});
