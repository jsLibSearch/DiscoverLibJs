const axios = require('axios');
const GitHubApi = require('github');
const gb = new GitHubApi({ debug: true, requestMedia: 'application/vnd.github.VERSION.html+json' });
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const Package = require('../DB_Code/Package');
const Project = require('../DB_Code/Project.js');
const Edge = require('../DB_Code/Edge.js');

gb.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

const mediaType = 'application/vnd.github.VERSION.html+json';

const getReadme = (req, res) => {

    const { repoName } = req.body;

    async function getContent(params) {

        try {

            // const response = await axios.get( `https://api.github.com/search/repositories?q=language:javascript%20${repoName}%20in:name`, {
            //     headers: { Authorization: process.env.GITHUB_TOKEN }
            // } );

            const q = `${repoName} in:name sort:stars`; //language:javascript 
            const response = await gb.search.repos({ q })
            


            if (response.data) {
                
                const [ owner, repo ] = [ response.data.items[0].owner.login, response.data.items[0].name ];
                
                const response2 = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
                    headers: { Accept: mediaType, Authorization: process.env.GITHUB_TOKEN }
                });

                // const response2 = await gb.repos.getContent({ owner, repo, path: `README.md` })
    
                if (response2.data) {
                    // const data = nacl.util.decodeUTF8(response2.data.content);
                    res.json(response2.data);
                }
            }


        } catch(e) {
            console.log(e);
        }
        //const q = `language:javascript ${repoName} in:name`;

    }
    getContent();
}


const getRecommendations = (req, res) => {

    const { pkgName } = req.body;

    if (req.body.length === 1) {
        cart = req.body[0];
    }

    Package.findOne({ name: `${pkgName}` }).select({ name: true, freq: true }).exec()
        .then((result) => {
            console.log(typeof result.id);
            const cart = result.id;
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
                            Package.find({_id: { $in: keysSliced}}).select({ name: true, freq: true }).sort({ "freq": -1 }).exec()
                            .then(pkgs => {
                                const sortedPkgs =  pkgs.sort(function(a,b){return children[b._id]-children[a._id]})
                                //console.log(children[sortedPkgs[0]._id], children[sortedPkgs[sortedPkgs.length - 1]._id])
                                let top5 = [];
                                for (let i = 0; i < 5; i++) {
                                    top5.push(sortedPkgs[i].name)
                                }
                                res.json({ top5 });
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
            res.json(err);
        })

}


module.exports = {

    getReadme,
    getRecommendations,

}