const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    name: {
        type: String
    },
    git_url: String,
    login: String,
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    }]
});
/*
*/

module.exports = mongoose.model('Projects', ProjectSchema);
