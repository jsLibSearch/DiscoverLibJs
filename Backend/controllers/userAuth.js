// this route authorize user 
const axios = require('axios');
const jwt = require('jsonwebtoken');
// user database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGO_URI}`, null);

const User = require('../DB_Code/User');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// const URLGET = `https://github.com/login/oauth/authorize`; // <----

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

    async function getUserCredentials() {
        try {
            let str = '';
            const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
            response.data.replace(/(access_token=)(\w+)/g, (match, capture1, capture2) => {
                str = capture2;
            });
            if (str) {
                const response2 = await axios.get(`https://api.github.com/user?access_token=${str}`);

                const [login, id, url, name] = await Promise.all([response2.data.login, response2.data.id, response2.data.url, response2.data.name]);

                // saving user to DB
                const DBresponse = await User.find({ github_id: id }).populate()
                
                if (DBresponse.length < 1) {
                    const newUser = new User({ login_name: login, github_id: id, url: url, github_name: name });
                    console.log(newUser)
                    newUser.save()
                        .exec()
                        .populate()
                        .then((user) => {
                            generateToken(login, id, url, name).then((token)=> {
                                res.json({
                                    username: login,
                                    accessToken: str,
                                    jwt: token,
                                    github_id: id,
                                    _id: user._id,
                                    carts: user.carts,
                                    github_name: user.github_name
                                });
                            });
                            console.log('---> success: account created <---');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }

                // JWT token
                const token = await generateToken(login, id, url, name);

                res.json({
                    username: login,
                    accessToken: str,
                    jwt: token,
                    github_id: id,
                    carts: DBresponse[0].carts,
                    _id: DBresponse[0]._id,
                    github_name: DBresponse[0].github_name
                });
            }

        } catch(err) {
            console.log('err');
        }
        
    }
    getUserCredentials();
}

const checkUserAuth = (req, res) => {

    const { jwtToken, github_id } = req.body;
    console.log(github_id);
    User.find({ github_id: github_id })
        .then((response) => {
            const result = response[0];
            jwt.verify(jwtToken, process.env.JWT_SECRET, (e, user) => {
                if (e) throw e;
                if (user.id === Number(result.github_id) && user.login === result.login_name) {
                    res.json({
                        username: result.login_name
                    });
                }
            })
        })
        .catch((err) => {
            res.json({
                error: 'something went wrong!'
            });
            console.log(err);
        })
}


module.exports = {
    sendAuthURL,
    getAccessToken,
    checkUserAuth,
}