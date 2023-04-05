import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
})

instance.interceptors.request.use((config: any) => {
    // Do something with request config
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')!)}`;
    return config;
})


export default instance