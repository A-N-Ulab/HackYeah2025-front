'use client';

import React from "react"
import { text } from "stream/consumers"
import { useRouter } from "next/navigation";
import {useState, useEffect} from "react"
import {Trip} from "@/app/types/Trip"
import Auth from "@/app/hooks/Auth"
import {getAllTrips} from "@/app/api/tripApi"
import {createTrip} from "@/app/api/tripApi"
import {setCookie} from "@/app/utils/cookies"

export function MenuButton({text,menus}:{text:string,menus:string}) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(menus)} className="btn-menu">{text}</button>
    )

}

export function SwipeGoButton({swipe, and, Go}:{swipe:string, and:string, Go:string}) {
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
                setCookie("tripId", resp.id.toString())
                setModalOpen(false)
                router.push("/trip")

            }
        }

    return (
        <div>
            <button onClick={openModal} className="swipe-go-btn"><span className="swipe">{swipe}</span><span className="and">{and}</span><span className="go">{Go}</span></button>
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
    )
}

export function InfoButton({text}:{text:any}) {
    const router = useRouter()
    return (
        <button onClick={() => router.push("/info")} className="info-btn">{text}</button>
    )

}