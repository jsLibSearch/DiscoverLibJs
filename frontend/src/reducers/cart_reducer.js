import { GET_CART, NEW_ITEM, DELETE_ITEM } from '../actions';
// import axios from 'axios';
const dev = false;

const cartReducer = (state = [], action) => {
    switch(action.type) {
        case GET_CART:
            console.log(action.payload.data)
            if (dev) {
                return Object.assign({}, state, {
                    packages: action.payload
                });
            }
            return Object.assign({}, state, {
                packages: action.payload
            });
        case DELETE_ITEM:
            const newCart = state.filter(item => item.name !== action.item.name);
            return newCart
        case NEW_ITEM:
            return state.concat(action.item);
        default:
            return state;
    }
};


export default cartReducer;