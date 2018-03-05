const axios = require('axios');
const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const fs = require('fs');
const path = require('path');
const writePkg = require('write-pkg');
const readPkg = require('read-pkg');

const helpers = require('../foo');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = `http://localhost:3000/user`;

github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

const createRepo = (req, res) => {

    const { repo_name, description, accessToken, arrOfPckgs } = req.body;

    async function thatDoesEveryThing(params) {
        
        try {
            // Creates Repo
            const result = await axios.post(`https://api.github.com/user/repos?access_token=${accessToken}`, {
                name: repo_name,
                description: description,
                private: false,
                auto_init: true,
            });

            // Creates package.json
            if (result.data) {

                let dependencies = {};

                for (let i = 0; i < arrOfPckgs.length; i++) {
                    dependencies[arrOfPckgs[i]] = '*'; // <-------- npm update --save
                }

                const p = path.join(__dirname, 'package.json');
                writePkg(p, { name: repo_name, version: "1.0.0", dependencies: dependencies }).then(() => {

                    const [ owner, repo ] = [ result.data.owner.login, result.data.name ];
                    const pkgPath = 'package.json';
                    const message = 'Hello World!';

                    fs.readFile(p, 'utf8', (err, data) => {
                        if (err) throw err;
                        const content = nacl.util.encodeBase64(data);


                        
                        axios
                            .put(`https://api.github.com/repos/${owner}/${repo}/contents/${pkgPath}`, 
                                { content: content, message: message },
                                { headers: { Authorization: `token ${accessToken}` }}
                            )
                                .then((r) => {
                                    res.json(result.data.clone_url);
                                })
                                .catch((e) => {
                                    console.log(e);
                                })
                        // res.json(result.data.clone_url);   // <--------- for localhost usage     
                    });
                    
                })
                .catch((err) => {
                    console.log(err);
                })

            } 
            
        } catch (e) {
            console.log(e);
        }
    }


    thatDoesEveryThing();

}

module.exports = {

    createRepo,

}

 // axios.post(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, { 

                    //         params: {
                    //             content: content,
                    //             message: message
                    //         }

                    // } )
                    //     .then((response) => {
                    //         console.log('123');
                    //         res.json(result.data.clone_url);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     })

                    // github.repos.createFile({ owner, repo, path, message, content })
                    //     .then((response) => {
                    //         console.log(response)
                    //         res.json(result.data.clone_url);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     })

