import axios from 'axios';
import testPackages from '../custom/dummy_data.json';
const dev = false;
const apiURL = dev ? 'http://localhost:5000/' : 'http://localhost:5000/';
const dbURL = dev ? 'http://localhost:8080/' : 'http://localhost:8080/'
export const GET_PACKAGES = 'GET_PACKAGES';
export const GET_PACKAGE = 'GET_PACKAGE';
export const GET_SEARCH = 'GET_SEARCH';
export const NEW_SEARCH = 'NEW_SEARCH';
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';

export const getPackages = (query) => {
    if (dev) {
        const promise = testPackages;
        return {
            type: 'GET_PACKAGES',
            payload: promise
        };
    }
    return (dispatch) => {
        axios.get(`${dbURL}search-package/${query}`, {
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

