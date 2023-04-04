import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
})

instance.interceptors.request.use((config: any) => {
    // Do something with request config
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})


export default instance