import axios from 'axios';
const dev = true;
const apiURL = dev ? 'http://localhost:5000/' : 'http://localhost:5000/';
export const GET_PACKAGES = 'GET_PACKAGES';
export const GET_PACKAGE = 'GET_PACKAGE';
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';

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

export const saveAccessToken = (code) => {

    return (distpatch) => {
        
        axios
            .post('http://localhost:5000/code', { code })
                .then((response) => {
                    distpatch({
                        type: SAVE_ACCESS_TOKEN,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
    }

}
