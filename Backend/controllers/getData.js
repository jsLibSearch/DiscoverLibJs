// this controller is getting data from GitHub
const axios = require('axios');
const GitHubApi = require('github');
const github = new GitHubApi({ debug: true });
const mongoose = require('mongoose');

github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
});

const getPackages = (req, res) => {

    const  _page = req.params.page;
    const month = req.params.month;
    //>=YYYY-MM-DD
    const created = `2017-${month}-01..2017-${month}-28`
    const q = `language:javascript created:${created}`;
    const sort = 'stars';
    const order = 'desc';
    const page = _page;
    const per_page = 100;
    const arr = [];

    async function getPs() {
        try {
            const result = await github.search.repos({ q, sort, order, page, per_page });
            const a = await result.data.items;
            if (a) {
                for (let obj of a) {
                   
                    const name = obj.name;
                    const login = obj.owner.login;
                    let s = [];
                    
                    const response2 = await axios.get(`https://raw.githubusercontent.com/${login}/${name}/master/package.json`, {
                        validateStatus: function (status) {
                            return status < 500; // Reject only if the status code is greater than or equal to 500
                        }
                    });
                    if (response2) {
                        if (response2.data.dependencies) s = s.concat(Object.keys(response2.data.dependencies));
                        if (response2.data.devDependencies) s = s.concat(Object.keys(response2.data.devDependencies));
                        arr.push(s);
                    }
                }  
            }
            res.json(arr);
            
        } catch (err) {
            console.log(err);
        }
    }
    getPs();
}


const checkLimitRate = (req, res) => {

    github.misc.getRateLimit({})
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        res.json(err);
    })
}


module.exports = {
    getPackages,
    checkLimitRate,
}