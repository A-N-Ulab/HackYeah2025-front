'use client'

import {store} from "@/app/api/store";
import {useEffect} from "react";
import TripCard from "@/app/components/TripCard";


export default function Trip() {
    const storage = store()

    useEffect(() => {
        if (storage.tripId == -1) {

        }
    })

    return (
        <div className="w-full h-full">
            <div className="container">
                <TripCard key={storage.tripId} id={storage.tripId} />
            </div>
        </div>
    )
}
