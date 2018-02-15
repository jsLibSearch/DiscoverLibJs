const mongoose = require('mongoose');

const User = require("./User.js");

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;

const Schema = mongoose.Schema;



const CartSchema = new Schema({
    name: String,
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Packages'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});
/*
*/
 
module.exports = mongoose.model('Carts', CartSchema);