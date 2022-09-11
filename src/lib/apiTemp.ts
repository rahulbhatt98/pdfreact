import axios from 'axios';
// import Auth from './auth';

// if (!process.env.NEXT_PUBLIC_API_URL) {
//     throw 'NEXT_PUBLIC_API_URL has not been exported';
// }
const token = localStorage.getItem("user")? localStorage.getItem("user") : "";
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const apiTemp = axios.create({
    //baseURL: `http://44.193.54.227:8000`,
    // Replace below with temp local Api to test
    //baseURL: `http://localhost:53071`,
    //baseURL: `http://52.91.70.74`,
    baseURL: `http://54.83.51.240`,
    //baseURL: `http://localhost:50936`,
    // timeout: 100000000,
    headers: {
        'Content-type': 'application/json',
        // 'Authorization': `Token ${token}`
    }
});

// api.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("user")? localStorage.getItem("user"):""
//     // if (token) {
//     //     api.config.headers.Authorization = `Token ${token}`;
//     // }
//     return config;
// });

export default apiTemp;

if (global.window) {
    (window as any).apiTemp = apiTemp;
}
