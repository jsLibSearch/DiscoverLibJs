import { SAVE_ACCESS_TOKEN } from '../actions';

export default (data = {}, action) => {
    switch (action.type) {
        case SAVE_ACCESS_TOKEN:
            return data = action.payload;
        default:
            return data;
    }
}