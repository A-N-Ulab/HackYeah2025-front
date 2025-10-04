import {axiosInstance} from "@/app/api/axiosInstance";


export const login = async ({username, password}: { username: string, password: string}) => {
    const response = await axiosInstance.post('/login', { username, password })
    return response.data ? response.data : null
}