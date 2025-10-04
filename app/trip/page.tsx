'use client'

import TripCard from "@/app/components/TripCard";
import DraggableHorizontal from "@/app/components/DraggableHorizontal";
import Auth from "../hooks/Auth";
import {getCookie} from "@/app/utils/cookies";
import {useEffect, useState} from "react";


export default function Trip() {
    const [tripId, setTripId] = useState<number>(-1)

    useEffect(() => {
        if (getCookie("tripId"))
            setTripId(Number(getCookie("tripId")))
    }, [])

    const SwipeUp = () => {
        console.log("swiped up")
    }

    const SwipeLeft = () => {
        console.log("swiped left")
    }

    const SwipeRight = () => {
        console.log("swiped right")
    }

    return (
        <Auth>
            <div className="w-full h-full">
                <div className="container">
                    <DraggableHorizontal
                        onDrag={(x, y) => {}}
                        onSwipe={(dir) => {
                            if (dir === "up") {
                                SwipeUp()
                            } else if (dir === 1) {
                                SwipeRight()
                            } else if (dir === -1) {
                                SwipeLeft()
                            }
                        }}
                        onCancel={() => console.log("snap back — not a swipe")}
                    >
                        <TripCard key={tripId} id={tripId} />
                    </DraggableHorizontal>
                </div>
            </div>
        </Auth>
    )
}
