import axios from 'axios';
import testPackages from '../custom/dummy_data.json';
export const dev = true;
const apiURL = dev ? 'http://localhost:5000/' : 'http://localhost:5000/';
export const GET_PACKAGES = 'GET_PACKAGES';
export const GET_PACKAGE = 'GET_PACKAGE';
export const GET_SEARCH = 'GET_SEARCH';
export const NEW_SEARCH = 'NEW_SEARCH';

export const getPackages = () => {
    if (dev) {
        const promise = testPackages;
        return {
            type: 'GET_PACKAGES',
            payload: promise
        };
    }
    const promise = axios.get(`${apiURL}/packages/`);
    return {
        type: 'GET_PACKAGES',
        payload: promise
    };
};

export const getPackage = (i) => {
    const promise = axios.get(`${apiURL}/package/${i}`);
    return {
        type: 'GET_PACKAGE',
        payload: promise
    };
};

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