'use client'

import {useEffect} from "react";
import {Destination} from "@/app/types/Destination";

export default function DestinationsCard({destination}: {destination: Destination}) {

    useEffect(() => {
        // console.log("dest: ", destination)
    }, [])

    if (!destination) return null

    return (
        <div className="trip-card-container">
            <p className="trip-title">{destination.name}</p>
            <div className="trip-image">
                Image
            </div>
        </div>
    )
}