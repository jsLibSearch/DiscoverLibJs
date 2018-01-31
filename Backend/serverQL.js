const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const GithubGraphQLApi = require('node-github-graphql');
const githubQL = new GithubGraphQLApi({
  token: process.env.GITHUB_TOKEN,
});

const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });

github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

server = express();

const PORT = 5050;

server.use(bodyParser.json());

const URL = 'https://api.github.com/graphql';
const mediaType = "application/vnd.github.v3.raw+json";


server.get('/', (req, res) => {


    /**
     * 
     * in case we will need this 
     * 
        stargazers {
            totalCount
        }
        forks {
            totalCount
        }
        updatedAt

     */

    const arr = [];
    githubQL.query(`
        query($queryString: String!) {
            search(query: $queryString, type: REPOSITORY, first: 10) {
                repositoryCount
                edges {
                    node {
                        ... on Repository {
                            name
                            owner {
                                login
                            }
                        }
                    }
                }
            }
        }
    
    `, { 
        "queryString": "language:javascript stars:>1000" 
    })

    .then((response) => {
        let a = response.data.search.edges;
        for (let obj of a) {
            let s = [];
            const login = obj.node.owner.login;
            const name = obj.node.name;

            axios
                .get(`https://raw.githubusercontent.com/${login}/${name}/master/package.json`)

                    .then((response) => {
                        
                        if (response.data.dependencies) s = s.concat(Object.keys(response.data.dependencies));
                        if (response.data.devDependencies) s = s.concat(Object.keys(response.data.devDependencies));

                        console.log(s);

                    })
                    .catch((err) => {
                        console.log('Not Found' , '--------->', login, name);
                    })

        }
        res.json(arr);
    })
    .catch((err) => {
        res.json('error');
        console.log(err);
    })
        

})


server.get('/limit', (req, res) => {

    github.misc.getRateLimit({})
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => {
            res.json(err);
        });
        

})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});