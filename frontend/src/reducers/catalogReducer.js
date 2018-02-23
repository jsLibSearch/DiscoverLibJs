import { GET_CATALOG } from '../actions';

export default (data = {}, action) => {

    switch (action.type) {
        case GET_CATALOG: 
            return data = { data: action.payload, ready: true };
        default:
            return data;
    }

}