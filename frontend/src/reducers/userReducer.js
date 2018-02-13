import { CHECK_USER_AUTH, USER_LOGGED_IN, SET_USER_STATUS_LOADING, ADD_CART } from '../actions';

const INITIAL_STATE = { user: {}, status: 'unauthorized', error: null }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case CHECK_USER_AUTH:
            if (!action.payload.error) return { user: action.payload.username, status: 'authenticated', error: null };
            else return { user: {}, status: 'unauthorized', error: action.payload.error };
        case SET_USER_STATUS_LOADING:
            return Object.assign({}, state, {
                status: 'loading'
            });
        case USER_LOGGED_IN:
            return { user: action.payload, status: 'authenticated', error: null };
        case ADD_CART:
            console.log(action.payload)
            const newUserState = Object.assign({}, state.user, {
                carts: [ ...state.user.carts, action.payload]
            });
            return Object.assign({}, state, {
                user: newUserState
            });
        default:
            return state;
    }

}