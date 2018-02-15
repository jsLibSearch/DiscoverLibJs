import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import userReducer from './userReducer';
import cartReducer from './cart_reducer';
import recReducer from './rec_reducer.js';
import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    recState: recReducer,
    userStatusReducer: userReducer,
    cart: cartReducer,
    catalog: catalogReducer,
})

export default rootReducer;