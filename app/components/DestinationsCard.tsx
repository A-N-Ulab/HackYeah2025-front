'use client'

import {useEffect} from "react";
import {Destination} from "@/app/types/Destination";
import TripImage from "./TripImage";

export default function DestinationsCard({destination}: {destination: Destination}) {


    return (
        <div className="trip-card-container">
            <div className="card-header"><p className="trip-title">{destination.name}</p></div>
            
            <div className="trip-image">
                <TripImage destination={destination} />
            </div>
        </div>
    )
}