const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const DependencySchema = new Schema({
    Parent: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    Child: {
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    }
});


/*
*/

module.exports = mongoose.model('Dependencies', DependencySchema);