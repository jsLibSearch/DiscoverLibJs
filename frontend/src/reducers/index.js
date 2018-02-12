import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import userReducer from './userReducer';
// import userLogStatus from './userLogStatus';
import cartReducer from './cart_reducer';
import recReducer from './rec_reducer.js'

const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    recState: recReducer,
    userStatusReducer: userReducer,
<<<<<<< HEAD
=======
    // logInStatus: userLogStatus,
>>>>>>> 0763b51141a34a490c93214d045b879bb4ec2ea4
    cart: cartReducer
})

export default rootReducer;