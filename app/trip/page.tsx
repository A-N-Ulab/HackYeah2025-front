'use client'

import DestinationsCard from "@/app/components/DestinationsCard"
import DraggableHorizontal from "@/app/components/DraggableHorizontal"
import Auth from "../hooks/Auth"
import {getCookie} from "@/app/utils/cookies"
import {useEffect, useState} from "react"
import {Destination} from "@/app/types/Destination"
import {getDestination} from "@/app/api/tripApi"

const destinations_test = [
    {
        "description": "Opis1",
        "id": 1,
        "name": "Test1",
        "photo_name": "test.png"
    },
    {
        "description": "Opis2",
        "id": 2,
        "name": "Test2",
        "photo_name": "test.png"
    },
    {
        "description": "Opis3",
        "id": 3,
        "name": "Test3",
        "photo_name": "test.png"
    },
    {
        "description": "Opis4",
        "id": 4,
        "name": "Test4",
        "photo_name": "test.png"
    }
]


export default function Trip() {
    const [tripId, setTripId] = useState<number>(-1)
    const [destinations, setDestinations] = useState<Destination[] | null>([])
    const [state, setState] = useState<string>("")
    const [currentDestinationId, setCurrentDestinationId] = useState<number>(-1)
    const [currentDestination, setCurrentDestination] = useState<Destination | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const [choices, setChoices] = useState<{id: number, choice: boolean}[]>([])

    const loadDestinations = async (id: number) => {
        setLoading(true)
        try {
            const resp = await getDestination(id)

            if (resp?.destinations?.length > 0) {
                setDestinations(resp.destinations)
                setCurrentDestination(resp.destinations[0])
                setCurrentDestinationId(0)
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

    const Swipe = (dir: boolean) => {
        if (!currentDestination || !destinations) return

        const newChoice = { id: currentDestination.id, choice: dir }
        const updatedChoices = [...choices, newChoice]
        setChoices(updatedChoices)

        const newId = currentDestinationId + 1

        if (newId >= destinations.length) {
            console.log("Wybory: ", updatedChoices)

            setChoices([])
            setCurrentDestination(null)
            setCurrentDestinationId(-1)

            setLoading(true)
            // Wysyłać stare dane i nowe dane dostać
            // .finally(() => setLoading(false))

            return
        }

        setCurrentDestinationId(newId)
        setCurrentDestination(destinations[newId])
    }

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
                </div>
            </div>
        </Auth>
    )
}
