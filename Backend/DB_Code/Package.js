const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;



const PackageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    freq: Number,
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    }],
    keywords: [ String ],
    homepage: String
});
/*
*/
 
module.exports = mongoose.model('Packages', PackageSchema);