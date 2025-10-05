'use client'

import {useEffect} from "react";
import {Destination} from "@/app/types/Destination";
import TripImage from "./TripImage";

export default function DestinationsCard({destination}: {destination: Destination}) {


    return (
        <div className="trip-card-container">
            
            <div className="card-content">
                <div className="card-header"><h1 className="trip-title">{destination.name}</h1></div>
                <TripImage destination={destination} />
                <div className="trip-description">
                    <p>{destination.description}</p>
                </div>
            </div>
        </div>
    )
}