const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;


const KeyEdgeSchema = new Schema({
    left: {
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    },
    right: {
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    },
    weight: Number
});
/*
*/

module.exports = mongoose.model('KeyEdges', KeyEdgeSchema);
