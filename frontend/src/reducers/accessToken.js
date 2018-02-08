import { SAVE_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN } from '../actions';

export default (data = {}, action) => {
    switch (action.type) {
        case SAVE_ACCESS_TOKEN:
            return action.payload;
        case CLEAR_ACCESS_TOKEN:
            return action.payload;
        default:
            return data;
    }
}