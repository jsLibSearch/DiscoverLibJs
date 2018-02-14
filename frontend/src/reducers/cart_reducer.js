import { GET_CART, NEW_ITEM, DELETE_ITEM } from '../actions';
// import axios from 'axios';
const dev = false;

const cartReducer = (state = { packages: [], name: 'Untitled Project'}, action) => {
    switch(action.type) {
        case GET_CART:
            console.log(action.payload.data)
            if (dev) {
                
            }
            return Object.assign({}, state, {
                packages: action.payload
            });
        case DELETE_ITEM:
            const newPacks = state.packages.filter(item => item.name !== action.item.name);
            return Object.assign({}, state, {
                packages: newPacks
            });
        case NEW_ITEM:
            return  Object.assign({}, state, {
                    packages: state.packages.concat(action.item)
                });
        default:
            return state;
    }
};


export default cartReducer;