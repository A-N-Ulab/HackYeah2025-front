import {axiosInstance} from "@/app/api/axiosInstance";
import {getCookie} from "@/app/utils/cookies";


export const getAllTrips = async () => {
    const response = await axiosInstance.post('/trips', {
        "token": getCookie("Token")
    })
    return response.data ? response.data : null
}

export const getDestination = async (tripId: number) => {
    const response = await axiosInstance.post('/destinations', {
        "token": getCookie("Token"),
        "trip_id": tripId
    })
    console.log(response)

    return response.data ? response.data : null
}

export const createTrip = async (name: string, description: string) => {
    const response = await axiosInstance.post('/new_trip', {
        "token": getCookie("Token"),
        "name": name,
        "description": description
    })

    return response.data ? response.data : null
}