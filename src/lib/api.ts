import Axios from 'axios';

export const api = Axios.create({
    baseURL: "https://clear-equations-api-production.up.railway.app",
    withCredentials: true
})