import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import cartReducer from './cart_reducer';
import recReducer from './rec_reducer.js'


const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    cart: cartReducer,
    recState: recReducer
})

export default rootReducer;