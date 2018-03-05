const mongoose = require("mongoose");
const _progress =  require('cli-progress');
const didyoumean = require('didyoumean')
const fs = require('fs');

const path = require('path');

mongoose.connect(`${process.env.MONGO_URI}`, null);
const Package = require('../DB_Code/Package');
const Project = require('../DB_Code/Project.js');
const Edge = require('../DB_Code/Edge.js');
const KeyEdge = require('../DB_Code/KeyEdge.js');
const User = require('../DB_Code/User.js');
const Cart = require('../DB_Code/Cart.js');
const STATUS_USER_ERROR = 422;


const postUser = (req, res) => {
    const { info } = req.body;
    const newUser = new User(info);
    newUser.save().then((user) => {
        return res.json(user);
    }).catch(err => res.status(STATUS_USER_ERROR).json(err));
}

const searchPackage = (req, res) => {

    const filePath = path.join(__dirname, 'keywords.json');
    const contents = fs.readFileSync(filePath, "utf8");
    const keywords = JSON.parse(contents);
    
    const filePath2 = path.join(__dirname, 'finalPackagesish.json');
    const contents2 = fs.readFileSync(filePath2, "utf8");
    const packagesFile = JSON.parse(contents2);

    let { term, term2 } = req.params;
    term = term.toLowerCase();
    const matchedKeyTerm = didyoumean(term, Object.keys(keywords));
    const matchedPackageTerm = didyoumean(term, Object.keys(packagesFile));
    let arr = [];
    Package.find({ $query: { name: {$regex : `.*${matchedPackageTerm}.*`}}, $sort: { freq : -1 }  }, { name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 },  (err, foundPackages) => {
        if (err) {
            return res.status(STATUS_USER_ERROR).json(err);
        }
            Package.find({ $query: { keywords: {$regex : `.*${matchedKeyTerm}.*`} }, $sort: { freq : -1 }}, { name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }, (err, foundKeys) => {
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
                    if (term2 === 'some') return res.json(removeDuplicates(arr).sort((a,b) => b.freq - a.freq).slice(0, 100));
                    else return res.json(removeDuplicates(arr).sort((a,b) => b.freq - a.freq));
            })
        
    });

}

const searchWithRecs = (req, res) => {
    let { cart, term } = req.body;
    term = term.toLowerCase();
    const children = {};
    Edge.find({$or: [ { right: {$in: cart}}, {  left: {$in: cart}}]}).sort({weight:-1}).exec()
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
                const keysSorted =  Object.keys(children).sort(function(a,b){return children[b]-children[a]})
                let keysSliced = keysSorted.filter((x) => {
                    return cart.indexOf(x) < 0;
                })
                Package.find({_id: { $in: keysSliced}, $or: [{keywords: {$regex : `.*${term}.*`}}, { name: {$regex : `.*${term}.*`}} ]}).select( { name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 } )
                .then(pkgs => {
                    const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                    Package.find({ $or: [{keywords: {$regex : `.*${term}.*`}}, { name: {$regex : `.*${term}.*`}} ]}).select( { name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 } ).sort({freq: -1}).exec()
                    .then(packs => {
                        const removeDuplicates = (a, b) => {
                            const seen = {};
                            const result = [];
                            a.slice(Math.floor(a.length/2, a.length)).forEach((item) => {
                                seen.hasOwnProperty(item.name) ? null : (seen[item.name] = true)
                            });
                            const filteredB = b.filter((item, i) => {
                                if (i < a.length / 2) return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true)
                                else return true;
                            });
                            const filteredA = a.filter((item) => {
                                if (i >= a.length / 2) return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true)
                                else return true;
                            });
                            result.push(filteredA)
                            result.push(filteredB)
                            return result
                        }
                        return res.json(removeDuplicates(sortedPkgs, packs));
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

const requestSimilarProjects = (req, res) => {
    
        const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
        const { cart, getAll } = req.body;
        let getAll2 = getAll
        if (getAll === undefined) getAll2 = false;
        
    
        let arr = cart.map(ele => new mongoose.Types.ObjectId(ele));
        const cartObj = {}
        cart.forEach((element) => {
            cartObj[element] = 0
        })
    
        const similarProj = {};
        Project.find({ children: { $in: arr }}).sort({weight:-1})
        .populate('children', 'name keywords freq homepage', Package ).exec()
            .then((projects) => {
                projects.forEach((project) => {
                    similarProj[project.name] = { data: project, count: 0};
                    project.children.forEach(child => {
                        if (cartObj.hasOwnProperty(child.id)) similarProj[project.name].count += 1;
                    })
                    // similarProj[project.name].count /= project.children;
                    similarProj[project.name].count += similarProj[project.name].count / project.children;
                })
            })
            .then(()=> {
                    const keysSorted =  Object.keys(similarProj).sort(function(a,b){return similarProj[b].count-similarProj[a].count})
                    let keysSliced = keysSorted.filter((x) => {
                        return cart.indexOf(x) < 0;
                    })
                    if (getAll2 === false) {
                        keysSliced = keysSliced.slice(0, 10)
                    }
                    return res.json(keysSliced.map(key => similarProj[key].data))
            })
            .catch((err) => {
                console.log(err)
            })
    }

const requestRecommendations = (req, res) => {

    const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
    const { cart, getAll } = req.body;
    let getAll2 = getAll
    if (getAll === undefined) getAll2 = false;
    

    let arr = cart.map(ele => new mongoose.Types.ObjectId(ele));
    const cartObj = {}
    cart.forEach((element) => {
        cartObj[element] = 0
    })

    const children = {};
    Edge.find({$or: [ { right: { $in: arr }}, {  left: { $in: arr } } ]}).sort({weight:-1})
        .then((edges) => {
            edges.forEach((edge) => {
                if (cartObj.hasOwnProperty(edge.left)) {
                    children.hasOwnProperty(edge.right) ? children[edge.right] += edge.weight : children[edge.right] = edge.weight
                } else {
                    children.hasOwnProperty(edge.left) ? children[edge.left] += edge.weight : children[edge.left] = edge.weight
                }
            })
        })
        .then(()=> {
                const keysSorted =  Object.keys(children).sort(function(a,b){return children[b]-children[a]})
                let keysSliced = keysSorted.filter((x) => {
                    return cart.indexOf(x) < 0;
                })
                if (getAll2 === false) {
                    keysSliced = keysSliced.slice(0, 10)
                }
                Package.find({_id: { $in: keysSliced}})
                .then(pkgs => {
                    const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                    return res.json(sortedPkgs);
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}


const requestKeyRecommendations = (req, res) => {  
    const bar = new _progress.Bar({}, _progress.Presets.shades_classic);
    const { cart } = req.body;
    const children = {};

    let arr = cart.map(ele => new mongoose.Types.ObjectId(ele));
    const cartObj = {}
    cart.forEach((element) => {
        cartObj[element] = 0
    })

    KeyEdge.find({$or: [ { right: {$in: arr}}, {  left: {$in: arr}}]}).sort({weight:-1})
        .then((edges) => {
            console.log(edges.length, "edges");  
            if (edges.length < 1) return res.json([]);           
            edges.forEach((edge) => {
                if (!cartObj.hasOwnProperty(edge.left)) {
                    children.hasOwnProperty(edge.left) ? children[edge.left] += edge.weight :children[edge.left] = edge.weight
                } else {
                    children.hasOwnProperty(edge.right) ? children[edge.right] += edge.weight :children[edge.right] = edge.weight                    
                }
            })
        })
        .then(()=> {
            if (Object.keys(children).length < 1) return null;
                console.log("children", Object.keys(children).length)
                const keysSorted =  Object.keys(children).sort(function(a,b){return children[b]-children[a]})
                const keysSliced = keysSorted.slice(0, 10).filter((x) => {
                    return cart.indexOf(x) < 0;
                })
                console.log(children[keysSliced[0]], children[keysSliced[keysSliced.length - 1]])
                Package.find({_id: { $in: keysSliced}})
                .then(pkgs => {
                    const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                    // console.log(children[sortedPkgs[0]._id], children[sortedPkgs[sortedPkgs.length - 1]._id])
                    return res.json(sortedPkgs);
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}
    
    
const getUserCarts = (req, res) => {

    const { github_id } = req.params;
    User.findOne({ github_id })
    .then(foundUser => {
        if (!foundUser) {
            return res.status(STATUS_USER_ERROR).send({ error: " not a foundUser "})
        }
        Cart.find({user: foundUser._id})
        .populate('cart', 'name keywords freq homepage', Package )
        .exec()
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
    Cart.findOne({_id: cartid})
        .populate('cart', 'name keywords freq homepage', Package)
        .exec()
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
    User.findOne({carts: cartid })
    .then(user => {
        if (!user) return res.status(STATUS_USER_ERROR).json({err: 'cart does not exist'})
        user.carts = user.carts.filter(c => c._id !== cartid);
        user.save()
            .then(() => {
                Cart.deleteOne({_id: cartid})
                    .then(() => {
                        return res.json({success: true});
                    })
                    .catch((err) => {
                        return res.status(STATUS_USER_ERROR).send(err);
                    })
            .catch((err) => {
                return res.status(STATUS_USER_ERROR).json(err)
            })
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
    requestSimilarProjects,
    getUserCarts,
    getCartByID,
    editCart,
    deleteCart,
    saveCart,
    postUser,
    searchWithRecs,
    requestKeyRecommendations,

}
