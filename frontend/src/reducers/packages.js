import { GET_PACKAGES, GET_PACKAGE, NEW_SEARCH } from '../actions';
// const dev = false;

const packageReducer = (state = { query: '', packages: [] }, action) => {
    switch(action.type) {
        case GET_PACKAGES:
            const removeDuplicates = (a) => {
                const seen = {};
                return a.filter((item) => {
                    return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
                });
            }

            return Object.assign({}, state, {
                packages: removeDuplicates(action.payload)
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