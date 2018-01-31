import axios from 'axios';
const dev = true;
const apiURL = dev ? 'http://localhost:5000/' : 'http://localhost:5000/';
export const GET_PACKAGES = 'GET_PACKAGES';
export const GET_PACKAGE = 'GET_PACKAGE';

export const getPackages = () => {
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
