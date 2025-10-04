'use client'

import {useEffect} from "react";

export default function TripCard({id}: {id: number}) {

    useEffect(() => {
        // get info about trip
    }, [])

    return (
        <div className="trip-card-container">
            <p>Name</p>
            <p>Image</p>
        </div>
    )
}