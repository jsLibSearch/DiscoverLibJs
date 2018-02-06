import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import cartReducer from './cart_reducer';


const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    cart: cartReducer
})

export default rootReducer;