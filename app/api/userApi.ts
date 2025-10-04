import { axiosInstance } from "@/app/api/axiosInstance"

export const loginUserQuery = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', { username, password })

        if (response.data.token) {
            return response.data
        } else {
            return { error: "Something went wrong" }
        }
    } catch (error) {
        return { error: "Wrong username or password" }
    }
}
