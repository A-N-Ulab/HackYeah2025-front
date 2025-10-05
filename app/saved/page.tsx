'use client'

import {useState, useEffect} from "react"
import {Trip} from "@/app/types/Trip"
import Auth from "@/app/hooks/Auth"
import {getAllTrips, deleteTripInDB} from "@/app/api/tripApi"
import {createTrip} from "@/app/api/tripApi"
import {useRouter} from "next/navigation"
import {setCookie} from "@/app/utils/cookies"

export default function Trips() {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [creating, setCreating] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const GetAllTrips = async () => {
        setLoading(true)
        try {
            const resp = await getAllTrips()
            console.log("getAllTrips resp:", resp)
            if (resp?.trips?.length > 0) {
                setTrips(resp.trips)
            } else {
                setTrips([])
            }
        } catch (err) {
            console.error(err)
            setTrips([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        GetAllTrips()
    }, [])

    const onClickTrip = async (id: number) => {
        setCookie("tripId", id.toString())
        router.push('/trip')
    }

    const onDeleteTrip = async (id: number) => {
        await deleteTripInDB(id)
        GetAllTrips()
    }

    const openModal = () => {
        setError(null)
        setName("")
        setDescription("")
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleCreate = async () => {
        const resp = await createTrip(name, description)
        if (resp.id) {
            setModalOpen(false)
            GetAllTrips()
        }
    }

    return (
        <Auth>
            <div className="trips-root">
                <a href="/" className="hamburger-menu">
                    <img src="/icons/UpArrow.png" alt="Menu" />
                </a>
                {/* <div>
                    <button className="btn-new-trip" onClick={openModal}>New trip</button>
                </div> */}
                <div className="trips-header" style={{alignItems: 'center', justifyContent: 'space-between', display: 'flex', width: '100%'}}>
                    <h2 className="trips-header m-auto">Zapisane miejsca</h2>
                </div>

                {loading ? (
                    <p className="loading">Ładowanie miejsc...</p>
                ) : trips.length === 0 ? (
                    <p className="no-trips">Nie znaleziono miejsc</p>
                ) : (
                    <div className="trips-container">
                        {trips.map((trip) => (
                            <div key={trip.id} className="trip-card">
                                <div className="trip-name-description-wrapper" onClick={() => onClickTrip(trip.id)}>
                                    <h2>{trip.name}</h2>
                                    <p>{trip.description}</p>
                                </div>
                                <div className="delete-trip-btn" onClick={() => onDeleteTrip(trip.id)}>
                                    <img src="/icons/Trash.png"></img>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Auth>
    )
}
