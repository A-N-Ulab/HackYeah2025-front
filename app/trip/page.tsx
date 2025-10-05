'use client'

import DestinationsCard from "@/app/components/DestinationsCard"
import DraggableHorizontal from "@/app/components/DraggableHorizontal"
import Auth from "../hooks/Auth"
import {getCookie} from "@/app/utils/cookies"
import {useEffect, useState} from "react"
import {Destination} from "@/app/types/Destination"
import {getDestinations, sendChoice} from "@/app/api/tripApi"


export default function Trip() {
    const [tripId, setTripId] = useState<number>(-1)
    const [destinations, setDestinations] = useState<Destination[] | null>([])
    const [state, setState] = useState<string>("")
    const [currentDestinationIdx, setCurrentDestinationIdx] = useState<number>(-1)
    const [currentDestination, setCurrentDestination] = useState<Destination | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadDestinations = async (tripId: number) => {
        setLoading(true)
        try {
            const resp = await getDestinations(tripId)

            if (resp?.destinations?.length > 0) {
                setDestinations(resp.destinations)
                setCurrentDestinationIdx(0)
                setCurrentDestination(resp.destinations[0])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const tripIdCookie = getCookie("tripId")
        if (!tripIdCookie) return

        const id = Number(tripIdCookie)
        setTripId(id)

        loadDestinations(id)
    }, [])

    const SwipeUp = () => {
        console.log("swiped up")
        
    }

    const Swipe = async (dir: boolean) => {
        if (!currentDestination || !destinations) return

        const resp = await sendChoice(tripId, currentDestination?.id || -1, dir)
        console.log(resp)

        if (currentDestinationIdx + 1 >= destinations.length) {
            setCurrentDestination(null)
            loadDestinations(tripId)
            return
        }else {
            // Still some destinations to show
            setCurrentDestinationIdx(currentDestinationIdx + 1)
            setCurrentDestination(destinations[currentDestinationIdx + 1])
        }
    }

    const onKeyDown = (event: any) => {
        switch(event.key) {
            case "ArrowLeft":
                Swipe(false);
                break;
            case "ArrowRight":
                Swipe(true);
                break;
            case "ArrowUp":
                SwipeUp();
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    })

    if (loading || !currentDestination)
        return <p>Loading...</p>

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
                                Swipe(true)
                            } else if (dir === -1) {
                                Swipe(false)
                            }
                        }}
                        onCancel={() => console.log("snap back — not a swipe")}
                    >
                        <DestinationsCard key={currentDestination.id} destination={currentDestination} />
                    </DraggableHorizontal>
                    <div className="bottomContainer">
                    </div>
                </div>
            </div>
        </Auth>
    )
}
