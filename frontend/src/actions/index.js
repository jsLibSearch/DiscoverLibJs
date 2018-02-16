import axios from 'axios';
export const dev = true;
const apiURL = !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/';
const DB_URL = !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/';

export const GET_PACKAGES = 'GET_PACKAGES';
export const LOADING = 'LOADING';
export const GET_PACKAGE = 'GET_PACKAGE';

export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';
export const CHECK_USER_AUTH = 'CHECK_USER_AUTH';
export const SET_USER_LOG_STATUS = 'SET_USER_LOG_STATUS';
export const SET_USER_STATUS_LOADING = 'SET_USER_STATUS_LOADING';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const LOAD_CARTS = 'LOAD_CARTS';
export const SET_USER_CARTS_LOADING = 'SET_USER_CARTS_LOADING';

export const ADD_CART = 'ADD_CART';

export const GET_SEARCH = 'GET_SEARCH'; // useless?
export const NEW_SEARCH = 'NEW_SEARCH'; // useless?

export const GET_CART = 'GET_CART';
export const NEW_ITEM = 'NEW_ITEM';
export const SET_AS_SAVED_CART = 'SET_AS_SAVED_CART';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_CART_NAME = 'SET_CART_NAME';
export const CLEAR_CART = 'CLEAR_CART';

export const SEARCH_REC = 'SEARCH_REC';
export const LOADING_RECS = 'LOADING_RECS';
export const GET_RECS = 'GET_RECS';

export const GET_CATALOG = 'GET_CATALOG';

export const clearCart = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CART'
        })
    }
}

export const loadCarts = (github_id) => {
    return (dispatch) => {
        dispatch(setLoadingTo('SET_USER_CARTS'));
        axios.get(`${DB_URL}user-carts/${github_id}`, {
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then((response) => {
                dispatch({
                    type: 'LOAD_CARTS',
                    payload: response.data
                });
            })
            .catch(() => {
                dispatch({
                    type: 'LOAD_CARTS',
                    payload: []
                });
            });
    }
}


const setStatusLoading = () => {
    return {
            type: 'LOADING'
    }
}

const setLoadingTo = (dataToLoad) => {
    return {
            type: `${dataToLoad}_LOADING`
    }
}


export const getPackages = (query) => {
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
        dispatch(setLoadingTo('SET_USER_STATUS'))
        axios
            .post(`${apiURL}code`, { code })
                .then((response) => {
                    console.log(response.data)
                    dispatch({
                        type: SAVE_ACCESS_TOKEN,
                        payload: response.data.accessToken,
                    });
                    dispatch({
                        type: USER_LOGGED_IN,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
    }

}

export const logOutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOG_OUT_USER
        })
    }
}

export const makeServerCalls = (jwtToken, github_id) => {

    return (dispatch) => {
        dispatch(setLoadingTo('SET_USER_STATUS'))
        axios
            .post(`${apiURL}check-auth`, { jwtToken, github_id })
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
    const promise = axios.get(`${DB_URL}cart/${i}`);
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

export const addCartToUser = (cart, user, name) => {
    const ids = cart.map(pkg => pkg._id);
    // { cart, user, name }
    // { github_id, github_name } = user;
    return (dispatch) => {
        axios.post(`${DB_URL}save-cart`, { cart: ids, user: user, name: name },{
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then((response) => {
                dispatch({
                    type: 'ADD_CART',
                    payload: response.data
                });
                axios.get(`${DB_URL}cart/${response.data._id}`,{
                    validateStatus: function (status) {
                        return status < 500; // Reject only if the status code is greater than or equal to 500
                    }
                })
                    .then((res) => {
                        dispatch({
                            type: 'SET_AS_SAVED_CART',
                            name: res.data.name,
                            _id: res.data._id,
                            packages: res.data.cart
                        });
                    }).catch((err)=>{
                        console.log(err)
                    })
            })
            .catch(() => {
                dispatch({
                    type: 'ADD_CART',
                    payload: []
                });
            });
    }
}

export const setAsSavedCart = (name, _id, cart) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_AS_SAVED_CART',
            name: name,
            _id: _id,
            packages: cart
        });
    }
}

export const getCatalog = () => {

    return (dispatch) => {
       
        axios.get(`${apiURL}get-all-catalog`)
            .then((result) => {
                dispatch({
                    type: 'GET_CATALOG',
                    payload: result.data
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }
}


export const setCartName = (name, _id = null) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CART_NAME',
            name: name,
            _id: _id
        })
    }
}
