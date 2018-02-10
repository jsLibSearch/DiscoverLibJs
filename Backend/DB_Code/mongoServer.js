const mongoose = require("mongoose");
const cors = require('cors')
const _progress =  require('cli-progress')

const Package = require('./Package.js');
const Project = require('./Project.js');
const Edge = require('./Edge.js');
const User = require('./User.js');
const Cart = require('./Cart.js');
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
    Package.find({ $query: { name: {$regex : `.*${term}.*`}}, $sort: { freq : -1 }  }, (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
            Package.find({ $query: { keywords: {$regex : `.*${term}.*`} }, $sort: { freq : -1 }  }, (err, foundKeys) => {
                if (err) {
                    return res.status(STATUS_USER_ERROR).json(err);
                }
                    arr = foundPackages.concat(foundKeys);
                    const removeDuplicates = (a) => {
                        const seen = {};
                        return a.filter((item) => {
                            return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true)
                        });
                    }
                    res.json(removeDuplicates(arr).sort((a,b) => b.freq - a.freq));
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
    
    const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
    const { cart } = req.body;
    
    // Project.find({ children: { $in: cart } })
    //     .then(async (proj) => {
    //         const children = {};
    //         const some1 = await proj.map((p) => {
    //             p.children.forEach(child => {
    //                 children[child] = 0;
    //             })
    //         })
    //         console.log(Object.keys(children).length)
    //         const some2 = await cart.map((cartid, i) => {
    //             if (children.hasOwnProperty(cartid)) {
    //                 delete children[cartid];
    //                 console.log("deleted ... ", cartid);
    //             }
    //         })
    //         const keyCounter = () => {
                const children = {};
                Edge.find({$or: [ { right: {$in: cart}}, {  left: {$in: cart}}]}).sort({weight:-1})
                    .then((edges) => {
                        console.log(edges.length, "edges");              
                        edges.forEach((edge) => {
                            cart.indexOf(edge.left) === -1 ?
                            children.hasOwnProperty(edge.left) ? children[edge.left] += edge.weight :children[edge.left] = edge.weight :children.hasOwnProperty(edge.right) ? children[edge.right] += edge.weight :children[edge.right] = edge.weight
                        })
                        // if (edges.length > 0) {
                        //     children[child] /= Object.keys(children).length;
                        // }
                    })
                    .then(()=> {
                            console.log("children", Object.keys(children).length)
                            const keysSorted =  Object.keys(children).sort(function(a,b){return children[b]-children[a]})
                            const keysSliced = keysSorted.slice(0, 100).filter((x) => {
                                return cart.indexOf(x) < 0;
                            })
                            console.log(children[keysSliced[0]], children[keysSliced[keysSliced.length - 1]])
                            Package.find({_id: { $in: keysSliced}})
                            .then(pkgs => {
                                const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                                console.log(children[sortedPkgs[0]._id], children[sortedPkgs[sortedPkgs.length - 1]._id])
                                return res.json(sortedPkgs);
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            // }
            // const promise = new Promise((resolve, reject) => {
            //     keyCounter();
            //     console.log("hellow");
            //     resolve();
            // });
            // promise
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
            
        // const refreshIntervalId = setInterval(() => {
        //     if (Object.keys(children).length > 2) {
        //         keyCounter(); 
        //         clearInterval(refreshIntervalId)
        //     }
        //     console.log(Object.keys(children).length)
        // }, 300);
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
})

server.get('/user-carts/:github_id', (req, res) => {
    const { github_id } = req.params;
    User.findOne({ github_id })
    .then(foundUser => {
        if (!foundUser) {
            return res.status(STATUS_USER_ERROR).send({ error: " not a foundUser "})
        }
        Cart.find({user: foundUser._id})
        .then((carts) => {
            res.send(carts);
        })
        .catch((err) => {
            return res.status(STATUS_USER_ERROR).send(err);
        })
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    })
});

server.get('/cart/:cartid', (req, res) => {
    const {cartid} = req.params;
    Cart.findOne({_id: cartid})
    .then(cart => {
        if (!cart) {
            return res.status(STATUS_USER_ERROR).send({err: "no cart"})
        }
        return res.json(cart);
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    })
})


server.put('/edit-cart', (req, res) => {
    const { cartid, cart, name } = req.body;
    Package.find({_id: { $in: cart }})
    .then(pkgs => {
        const ids = pkgs.map(pkg => pkg._id);
        Cart.findOneAndUpdate({_id: cartid}, { $set: { cart: ids , name }}, {new: true})
        .then(cart => {
            if (!cart) {
                return res.status(STATUS_USER_ERROR).send({err: "no cart"})
            }
            return res.json(cart);
        })
        .catch((err) => {
            return res.status(STATUS_USER_ERROR).send(err);
        })
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    });

});

server.delete('/delete-cart', (req, res) => {
    const { cartid } = req.body;
    User.find({carts: cartid })
    .then(users => {
        users.forEach(user => {
            user.carts.splice(user.carts.indexOf(cartid), 1);
            user.save();
        })
        Cart.deleteOne({_id: cartid})
        .then(() => {
            return res.json({success: true});
        })
        .catch((err) => {
            return res.status(STATUS_USER_ERROR).send(err);
        })
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    });

});

server.post('/save-cart', (req, res) => {
    const { cart, user, name } = req.body;
    const { github_id, github_name } = user;
    Package.find({_id: { $in: cart }})
    .then(pkgs => {
        const ids = pkgs.map(pkg => pkg._id);
        User.findOne({ github_id, github_name})
        .then(foundUser => {
            if (!foundUser) {
                return res.status(STATUS_USER_ERROR).send({ error: " not a foundUser "})
            }
            const theCart = new Cart ( { cart: ids, user: foundUser._id, name});
            theCart.save()
            .then((savedCart) => {
                foundUser.carts.push(savedCart._id);
                foundUser.save()
                .then(() => {
                   return res.json(savedCart);
                })
                .catch((err) => {
                    return res.status(STATUS_USER_ERROR).send(err);
                })
            })
            .catch((err) => {
                return res.status(STATUS_USER_ERROR).send(err);
            })
        })
        .catch((err) => {
            return res.status(STATUS_USER_ERROR).send(err);
        })
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    })
})
server.listen(PORT, () => { 
    console.log(`---> MongoDB server is running on port ${PORT} <---`) 
});
