const mongoose = require('mongoose');
const Cart = require("./Cart.js");
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    login_name: {
        type: String,
        required: true,
        unique: true
    },
    github_id: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    github_name: {
        type: String,
        required: true,
        unique: true
    },
    carts: [{
        type: Schema.Types.ObjectId,
        ref: 'Carts'
    }]
});
/*
*/

module.exports = mongoose.model('Users', UserSchema);