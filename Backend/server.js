const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

const mediaType = "application/vnd.github.v3.raw+json";
const PORT = 5000;

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));

const URLGET = `https://github.com/login/oauth/authorize`; 
const URLPOST = `https://github.com/login/oauth/access_token`;
const redirect_uri = `https://localhost:3000/callback`;

server.use(bodyParser.json());


function generateToken(login, id, url, name) {
    const obj = {
        login: login,
        id: id,
        url: url,
        name: name,
    }

    return token = jwt.sign(obj, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 
    });
}


server.get('/', (req, res) => {
    
    // our query parameters
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


server.get('/login', (req, res) => {

    res.json(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo%20user`);
        
});

server.post('/code', (req, res) => {
    const { code } = req.body;

    async function getUserCridentials(params) {
        try {
            let str = '';
            const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
            response.data.replace(/(access_token=)(\w+)/g, (match, capture1, capture2) => {
                str = capture2;
            });
            if (str) {
                const response2 = await axios.get(`https://api.github.com/user?access_token=${str}`);

                const [login, id, url, name] = await Promise.all([response2.data.login, response2.data.id, response2.data.url, response2.data.name])

                const token = await generateToken(login, id, url, name);

                res.json({
                    username: login,
                    accessToken: str,
                    jwt: token,
                })

            }

        } catch(err) {
            console.log(err);
        }
        
    }
    getUserCridentials();

});


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});