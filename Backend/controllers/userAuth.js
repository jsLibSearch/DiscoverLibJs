// this route authorize user 
const axios = require('axios');
const jwt = require('jsonwebtoken');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// const URLGET = `https://github.com/login/oauth/authorize`; 
// const URLPOST = `https://github.com/login/oauth/access_token`;
// const redirect_uri = `https://localhost:3000/callback`;

// helper function
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

const sendAuthURL = (req, res) => {

    res.json(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo%20user`);

}


const getAccessToken = (req, res) => {

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

                const [login, id, url, name] = await Promise.all([response2.data.login, response2.data.id, response2.data.url, response2.data.name]);

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
}


module.exports = {
    sendAuthURL,
    getAccessToken,
}