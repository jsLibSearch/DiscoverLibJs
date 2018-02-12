import axios from 'axios';
import testPackages from '../custom/dummy_data.json';
const dev = false;
const apiURL = dev ? 'http://localhost:5000/' : 'http://localhost:5000/';
const DB_URL = dev ? 'http://localhost:8080/' : 'http://localhost:8080/'

export const GET_PACKAGES = 'GET_PACKAGES';
export const LOADING = 'LOADING';
export const GET_PACKAGE = 'GET_PACKAGE';

export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';
export const CHECK_USER_AUTH = 'CHECK_USER_AUTH';
export const SET_USER_LOG_STATUS = 'SET_USER_LOG_STATUS';

export const GET_SEARCH = 'GET_SEARCH'; // useless?
export const NEW_SEARCH = 'NEW_SEARCH'; // useless?

export const GET_CART = 'GET_CART';
export const NEW_ITEM = 'NEW_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const SEARCH_REC = 'SEARCH_REC';
export const LOADING_RECS = 'LOADING_RECS';
export const GET_RECS = 'GET_RECS';

const setStatusLoading = () => {
    return {
            type: 'LOADING'
    }
}


export const getPackages = (query) => {
    if (dev) {
        const promise = testPackages;
        return {
            type: 'GET_PACKAGES',
            payload: promise
        };
    }
    return (dispatch) => {
        dispatch(setStatusLoading())
        axios.get(`${DB_URL}search-package/${query}`, {
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then((response) => {
                dispatch({
                    type: 'GET_PACKAGES',
                    payload: response.data
                });
            })
            .catch(() => {
                dispatch({
                    type: 'GET_PACKAGES',
                    payload: []
                });
            });
    }
    
};

export const getPackage = (i) => {
    const promise = axios.get(`${apiURL}/package/${i}`);
    return {
        type: 'GET_PACKAGE',
        payload: promise
    };
};

export const clearAccessToken = () => {

    return {
        type: CLEAR_ACCESS_TOKEN,
        payload: {},
    }

}

export const getSearch = (searchQuery) => {
    return {
        type: 'GET_SEARCH'
    };
};

export const newSearch = (searchQuery) => {
    return {
        type: 'NEW_SEARCH',
        text: searchQuery
    };
};

// here we have user's github auth token, jwt token and his github username
export const saveAccessToken = (code) => {

    return (dispatch) => {
        
        axios
            .post('http://localhost:5000/code', { code })
                .then((response) => {
                    dispatch({
                        type: SAVE_ACCESS_TOKEN,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
    }

}

export const makeServerCalls = (jwtToken, github_id) => {

    return (dispatch) => {

        axios
            .post('http://localhost:5000/check-auth', { jwtToken, github_id })
                .then((response) => {
                    //console.log(response.data);
                    dispatch({
                        type: CHECK_USER_AUTH,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
    }
}

export const getCart = (i) => {
    const promise = axios.get(`${DB_URL}/cart/${i}`);
    return {
        type: 'GET_CART',
        payload: promise
    };
};

export const newItem = (i) => {
    return {
        type: 'NEW_ITEM',
        item: i
    };
};

export const deleteItem = (item) => {
    return {
        type: 'DELETE_ITEM',
        item: item
    };
};


const setRecStatusLoading = () => {
    return {
            type: 'LOADING_RECS'
    }
};

export const getRecs = (cart) => {
    const ids = cart.map(pkg => pkg._id);
    return (dispatch) => {
        dispatch(setRecStatusLoading())
        axios.post(`${DB_URL}rec`, { cart: ids },{
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then((response) => {
                dispatch({
                    type: 'GET_RECS',
                    payload: response.data
                });
            })
            .catch(() => {
                dispatch({
                    type: 'GET_RECS',
                    payload: []
                });
            });
    }
    
};

export const searchRec = (cart, query) => {
    const ids = cart.map(pkg => pkg._id);
    return (dispatch) => {
        dispatch(setRecStatusLoading())
        axios.post(`${DB_URL}rec/${query}`, { cart: ids },{
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then((response) => {
                dispatch({
                    type: 'SEARCH_REC',
                    payload: response.data
                });
            })
            .catch(() => {
                dispatch({
                    type: 'SEARCH_REC',
                    payload: []
                });
            });
    }
    
};
