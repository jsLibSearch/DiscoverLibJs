const axios = require('axios');
const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

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
    helpers.writeFile(repo_name, arrOfPckgs);

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
                const [ owner, repo ] = [ result.data.owner.login, result.data.name ];
                const path = 'package.json';
                const message = 'Hello World!';
                const content = helpers.readFile();
                if ( owner, repo, path, message, content ) {
                    const response = await github.repos.createFile({ owner, repo, path, message, content });
                }
            }

            if (result.data) {
                res.json(result.data.clone_url);
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

