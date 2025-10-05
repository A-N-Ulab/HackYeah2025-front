import {axiosInstance} from "@/app/api/axiosInstance";
import {getCookie, deleteCookie} from "@/app/utils/cookies";


export const getAllTrips = async () => {
    const response = await axiosInstance.post('/trips', {
        "token": getCookie("Token")
    })
    return response.data || null
}

export const getDestinations = async (tripId: number) => {
    const response = await axiosInstance.post('/destinations', {
        "token": getCookie("Token"),
        "trip_id": tripId
    }).catch(error => {
        console.log(error)
    })
    
    return response?.data || null
}

export const createTrip = async (name: string, description: string) => {
    const response = await axiosInstance.post('/new_trip', {
        "token": getCookie("Token"),
        "name": name,
        "description": description
    })

    return response.data || null
}

export const sendChoice = async (tripId: number, destinationId: number, choice: boolean) => {
    const response = await axiosInstance.post("/choice", {
        "token": getCookie("Token"),
        "trip_id": tripId,
        "destination_id": destinationId,
        "choice": choice,
    })

    return response.data || null
}

export const deleteTripInDB = async (tripId: number) => {
    const response = await axiosInstance.post("/delete_trip", {
        "token": getCookie("Token"),
        "id": tripId,
    })

    return response.data || null
}