const mongoose = require("mongoose");
const _progress =  require('cli-progress');

const Package = require('../DB_Code/Package');
const Project = require('../DB_Code/Project.js');
const Edge = require('../DB_Code/Edge.js');
const User = require('../DB_Code/User.js');
const Cart = require('../DB_Code/Cart.js');
mongoose.connect(`${process.env.MONGO_URI}`, null);



const postUser = (req, res) => {
    const { info } = req.body;
    const newUser = new User(info);
    newUser.save().then((user) => {
        return res.json(user);
    }).catch(err => res.status(STATUS_USER_ERROR).json(err));
}

const searchPackage = (req, res) => {

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

}

const searchWithRecs = (req, res) => {
    const { cart, term } = req.body;
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
                const keysSliced = keysSorted.slice(0, 300).filter((x) => {
                    return cart.indexOf(x) < 0;
                })
                console.log(children[keysSliced[0]], children[keysSliced[keysSliced.length - 1]])
                Package.find({_id: { $in: keysSliced}})
                .then(pkgs => {
                    const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                    console.log(children[sortedPkgs[0]._id], children[sortedPkgs[sortedPkgs.length - 1]._id])
                    Package.find({ $or: [{name: { $in: cart }}, {keywords: {$regex : `.*${term}.*`}}, { name: {$regex : `.*${term}.*`}} ]}).sort({freq: -1}).exec()
                    .then(packs => {
                        const final = [];
                        for (let i = 0, j = 0; i < packs.length, j < sortedPkgs.length; i++, j++) {
                            final.push(packs[i])
                            final.push(sortedPkgs[j])
                        }
                        res.json(final);
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}


const getAllPackages = (req, res) => {

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

}


const getAllProjects = (req, res) => {

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

}


const requestRecommendations = (req, res) => {

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
                            const keysSliced = keysSorted.slice(0, 300).filter((x) => {
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

}


const getUserCarts = (req, res) => {

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

}


const getCartByID = (req, res) => {

    const {cartid} = req.params;
    Cart.findOne({_id: cartid}).exec().populate('Package')
    .then(cart => {
        if (!cart) {
            return res.status(STATUS_USER_ERROR).send({err: "no cart"})
        }
        return res.json(cart);
    })
    .catch((err) => {
        return res.status(STATUS_USER_ERROR).send(err);
    })

}


const editCart = (req, res) => {

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

}


const deleteCart = (req, res) => {

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

}


const saveCart = (req, res) => {

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

}


module.exports = {

    searchPackage,
    getAllPackages,
    getAllProjects,
    requestRecommendations,
    getUserCarts,
    getCartByID,
    editCart,
    deleteCart,
    saveCart,
    postUser,
    searchWithRecs,

}