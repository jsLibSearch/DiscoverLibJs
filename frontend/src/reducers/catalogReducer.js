import { GET_CATALOG, CLEAR_CATALOG } from '../actions';

export default (data = {}, action) => {

    switch (action.type) {
        case GET_CATALOG: 
            return data = { data: action.payload, ready: true };
        case CLEAR_CATALOG:
            return {}
        default:
            return data;
    }

}