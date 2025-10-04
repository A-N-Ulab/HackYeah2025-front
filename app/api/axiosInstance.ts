import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://hack-yeah-fastapi-mglkv.ondigitalocean.app",
    withCredentials: true,
})