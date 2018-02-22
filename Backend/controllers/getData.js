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
    const monthText = [
        `2018-${month}-01..2018-${month}-31`,
        `2017-${month}-01..2017-${month}-28`,
        `2017-${month}-01..2017-${month}-31`,
        `2017-${month}-01..2017-${month}-30`,
        `2017-${month}-01..2017-${month}-31`,
        `2017-${month}-01..2017-${month}-30`,
        `2017-${month}-01..2017-${month}-31`,
        `2017-${month}-01..2017-${month}-31`,
        `2017-${month}-01..2017-${month}-30`,
        `2017-${month}-01..2017-${month}-31`,
        `2017-${month}-01..2017-${month}-30`,
        `2017-${month}-01..2017-${month}-31`
    ]

    const created = monthText[Number(month) - 1];
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
                    const git_url = obj.svn_url;
                    const login = obj.owner.login;
                    let project = {
                        name: name,
                        git_url: git_url,
                        login: login,
                        children: []
                    };
                    
                    const response2 = await axios.get(`https://raw.githubusercontent.com/${login}/${name}/master/package.json`, {
                        validateStatus: function (status) {
                            return status < 500; // Reject only if the status code is greater than or equal to 500
                        }
                    });
                    if (response2) {
                        if (response2.data.dependencies) project.children = project.children.concat(Object.keys(response2.data.dependencies));
                        if (response2.data.devDependencies) project.children = project.children.concat(Object.keys(response2.data.devDependencies));
                        if (project.children.length > 0) {
                            arr.push(project);
                        }
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