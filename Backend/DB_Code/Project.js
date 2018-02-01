const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    processed: Boolean,
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    }]
});
/*
*/

module.exports = mongoose.model('Projects', ProjectSchema);
