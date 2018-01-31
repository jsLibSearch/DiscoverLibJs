const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const axios = require('axios');

const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });

github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

const mediaType = "application/vnd.github.v3.raw+json";
const PORT = 5000;

server.use(bodyParser.json());

server.get('/', (req, res) => {

    const q = 'language:javascript';
    const sort = 'stars';
    const order = 'desc';
    const page = 1;
    const per_page = 10;

    github.search.repos({q, sort, order, page, per_page })
        .then((response) => {

            const a = response.data.items;

            for (let obj of a) {
               
                const name = obj.name;
                const login = obj.owner.login;
                let s = [];

                axios
                    .get(`https://raw.githubusercontent.com/${login}/${name}/master/package.json`)

                        .then((response) => {

                            if (response.data.dependencies) s = s.concat(Object.keys(response.data.dependencies));
                            if (response.data.devDependencies) s = s.concat(Object.keys(response.data.devDependencies));

                            console.log(s);

                        })
                        .catch((err) => {
                            console.log('Not Found' , '--------->', login, name);
                        });

            }
            
        })
        .catch((err) => {
            console.log(err);
        })

        res.json('success');    
})

server.get('/limit', (req, res) => {
    
    github.misc.getRateLimit({})
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        res.json(err);
    })
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});