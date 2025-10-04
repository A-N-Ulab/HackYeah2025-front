'use client'

import {store} from "@/app/api/store";
import {useEffect, useRef, useState} from "react";
import TripCard from "@/app/components/TripCard";
import DraggableHorizontal, {DraggableHandle} from "@/app/components/DraggableHorizontal";
import Auth from "../hooks/Auth";


export default function Trip() {
    const storage = store()

    useEffect(() => {
        if (storage.tripId == -1) {

        }
    })

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
                        <TripCard key={storage.tripId} id={storage.tripId} />
                    </DraggableHorizontal>
                </div>
            </div>
        </Auth>
    )
}
