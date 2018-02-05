import { GET_PACKAGES, GET_PACKAGE, NEW_SEARCH, GET_SEARCH } from '../actions';
import axios from 'axios';
const dev = false;

const packageReducer = (state = { query: '', packages: [] }, action) => {
    switch(action.type) {
        case GET_PACKAGES:
            console.log(action.payload.data)
            if (dev) {
                return Object.assign({}, state, {
                    packages: action.payload
                });
            }
            return Object.assign({}, state, {
                packages: action.payload
            });
        case GET_PACKAGE:
            return action.payload.data;
        case NEW_SEARCH:
            return Object.assign({}, state, {
                query: action.text
            })
        default:
            return state;
    }
};


export default packageReducer;