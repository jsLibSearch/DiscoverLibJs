import { GET_PACKAGES, GET_PACKAGE, NEW_SEARCH, GET_SEARCH } from '../actions';
const dev = true;

const packageReducer = (state = { query: '', packages: [] }, action) => {
    switch(action.type) {
        case GET_PACKAGES:
            if (dev) {
                return Object.assign({}, state, {
                    packages: action.payload
                });
            }
            return Object.assign({}, state, {
                packages: action.payload.data
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