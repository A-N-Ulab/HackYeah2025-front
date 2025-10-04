import {axiosInstance} from "@/app/api/axiosInstance";


export const getAllTrips = async () => {
    const response = await axiosInstance.post('/trips', {

    })
    return response.data ? response.data : null
}
