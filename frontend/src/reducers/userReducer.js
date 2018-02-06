import { CHECK_USER_AUTH } from '../actions';

const INITIAL_STATE = { user: null, status: null, error: null }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case CHECK_USER_AUTH:
            if (!action.payload.error) return { user: action.payload.username, status: 'authenticated', error: null };
            else return { user: null, status: 'unauthorized', error: action.payload.error };
        default:
            
            return INITIAL_STATE;
    }

}