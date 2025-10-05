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
                <a href="/" className="hamburger-menu">
                    <img src="/icons/UpArrow.png" alt="Menu" />
                </a>
                <div className="trips-header" style={{alignItems: 'center', justifyContent: 'space-between', display: 'flex', width: '100%'}}>
                    <h2 className="trips-header m-auto">Zaplanuj podróż</h2>
                </div>
            </div>
        </Auth>
    )
}
