const mongoose = require('mongoose');

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
    }
});
/*
*/
 
module.exports = mongoose.model('Users', UserSchema);