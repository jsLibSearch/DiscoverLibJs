import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import userReducer from './userReducer';
//import userLogStatus from './userLogStatus';
import cartReducer from './cart_reducer';

const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    userStatusReducer: userReducer,
    cart: cartReducer,
})

export default rootReducer;