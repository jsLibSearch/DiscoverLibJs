import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';
import userReducer from './userReducer';
import userLogStatus from './userLogStatus';

const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
    userStatusReducer: userReducer,
    logInStatus: userLogStatus,
})

export default rootReducer;