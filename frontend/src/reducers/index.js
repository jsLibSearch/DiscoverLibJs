import { GET_PACKAGES, GET_PACKAGE } from '../actions';

const packageReducer = (packages = [], action) => {
    switch(action.type) {
        case GET_PACKAGES:
            return action.payload.data;
        case GET_PACKAGE:
            return action.payload.data;
        default:
            return packages;
    }
};


export default packageReducer;