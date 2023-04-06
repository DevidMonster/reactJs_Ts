import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
})
//127.0.0.1
instance.interceptors.request.use((config: any) => {
    // Do something with request config
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')!)}`;
    return config;
})


export default instance