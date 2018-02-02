import { combineReducers } from 'redux';
import packageReducer from './packages';
import accessTokenSaver from './accessToken';


const rootReducer = combineReducers({
    packages: packageReducer,
    accessToken: accessTokenSaver,
})

export default rootReducer;