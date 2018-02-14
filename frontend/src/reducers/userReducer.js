import { CHECK_USER_AUTH, USER_LOGGED_IN, SET_USER_STATUS_LOADING, ADD_CART, LOG_OUT_USER, LOAD_CARTS, SET_USER_CARTS_LOADING } from '../actions';

const INITIAL_STATE = { user: { carts: [] }, status: 'unauthorized', error: null, loadingCarts: false }

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case CHECK_USER_AUTH:
            if (!action.payload.error) return { user: action.payload.username, status: 'authenticated', error: null, loadingCarts: false };
            else return { user: {}, status: 'unauthorized', error: action.payload.error };
        case SET_USER_STATUS_LOADING:
            return Object.assign({}, state, {
                status: 'loading'
            });
        case USER_LOGGED_IN:
            return { user: action.payload, status: 'authenticated', error: null };
        case LOG_OUT_USER:
            return INITIAL_STATE;
        case LOAD_CARTS:
            const newUserCarts = Object.assign({}, state.user, {
                carts: action.payload
            });
            return Object.assign({}, state, {
                loadingCarts: false,
                user: newUserCarts
            });
        case SET_USER_CARTS_LOADING:
            return Object.assign({}, state, {
                loadingCarts: true
            });
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