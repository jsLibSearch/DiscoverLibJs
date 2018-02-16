import { GET_CART, NEW_ITEM, DELETE_ITEM, SET_CART_NAME, CLEAR_CART, SET_AS_SAVED_CART } from '../actions';
// import axios from 'axios';

const cartReducer = (state = { packages: [], name: 'Untitled Project', _id: null}, action) => {
    switch(action.type) {
        case GET_CART:
            return Object.assign({}, state, {
                packages: action.payload.data.cart,
                name: action.payload.data.name
            });
        case DELETE_ITEM:
            const newPacks = state.packages.filter(item => item.name !== action.item.name);
            return Object.assign({}, state, {
                packages: newPacks
            });
        case NEW_ITEM:
            return Object.assign({}, state, {
                    packages: state.packages.concat(action.item)
                });
        case SET_AS_SAVED_CART:
            console.log(action)
            return Object.assign({}, state, {
                packages: action.packages,
                name: action.name,
                _id: action._id
            });
        case SET_CART_NAME:
            return Object.assign({}, state, {
                name: action.name,
                _id: action._id
            });
        case CLEAR_CART:
            return { packages: [], name: 'Untitled Project', _id: null }
        default:
            return state;
    }
};


export default cartReducer;