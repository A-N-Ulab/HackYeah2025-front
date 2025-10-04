'use client'

import {useState, useEffect} from "react";
import {Trip} from "@/app/types/Trip";

export default function Trips() {
    const [trips, setTrips] = useState<Trip[]>([])

    useEffect(() => {
        const GetAllTrips = async () => {
            // Pobieranie wszystkich tripów użytkownika
        }

        GetAllTrips()
    }, [])

    return (
        <div>
            Trip list
        </div>
    );
}
