'use client'

import {useState, useEffect} from "react"
import {Trip} from "@/app/types/Trip"
import Auth from "@/app/hooks/Auth"
import {getAllTrips} from "@/app/api/tripApi"
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
                <div>
                    <button className="btn-new-trip" onClick={openModal}>New trip</button>
                </div>
                <div className="trips-header" style={{alignItems: 'center', justifyContent: 'space-between', display: 'flex', width: '100%'}}>
                    <h2 className="trips-header m-auto">Available Trips</h2>
                </div>

                {loading ? (
                    <p className="loading">Loading trips...</p>
                ) : trips.length === 0 ? (
                    <p className="no-trips">No trips found</p>
                ) : (
                    <div className="trips-container">
                        {trips.map((trip) => (
                            <div key={trip.id} className="trip-card" onClick={() => onClickTrip(trip.id)}>
                                <h2>{trip.name}</h2>
                                <p>{trip.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {modalOpen && (
                    <div className="modal-overlay" role="dialog" aria-modal="true">
                        <div className="modal">
                            <div className="modal-header">
                                <h3 className="modal-title">Create new trip</h3>
                                <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
                            </div>

                            <div className="modal-form">
                                <input
                                    className="modal-input"
                                    placeholder="Trip name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={80}
                                />
                                <textarea
                                    className="modal-textarea"
                                    placeholder="Short description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={600}
                                />

                                {error && <div className="modal-error">{error}</div>}

                                <div className="modal-actions">
                                    <button className="btn-ghost" onClick={closeModal} disabled={creating}>Cancel</button>
                                    <button className="btn-primary-modal" onClick={handleCreate} disabled={creating}>
                                        {creating ? "Creating..." : "Create"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Auth>
    )
}
