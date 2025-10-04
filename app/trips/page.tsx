'use client'

import {useState, useEffect} from "react";
import {Trip} from "@/app/types/Trip";
import Auth from "@/app/hooks/Auth";

export default function Trips() {
    const [trips, setTrips] = useState<Trip[]>([])

    useEffect(() => {
        const GetAllTrips = async () => {
            // Pobieranie wszystkich tripów użytkownika
        }

        GetAllTrips()
    }, [])

    return (
        <Auth>
            Trip list
        </Auth>
    );
}
